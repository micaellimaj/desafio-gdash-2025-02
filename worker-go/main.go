package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/go-redis/redis/v8"
	"io"
)

type WeatherData struct {
	City                   string  `json:"city"`
	Timestamp              int64   `json:"timestamp"`
	TemperatureCelsius     float64 `json:"temperature_celsius"`
	HumidityPercent        int     `json:"humidity_percent"`
	WindSpeedMS            float64 `json:"wind_speed_m_s"`
	ConditionDescription   string  `json:"condition_description"`
	RainProbabilityPercent int     `json:"rain_probability_percent"`
}

type LoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	AccessToken string `json:"access_token"`
}

type NestJSPayload struct {
	City                   string  `json:"city"`
	Timestamp              int64   `json:"timestamp"`
	TemperatureCelsius     float64 `json:"temperatureCelsius"`
	HumidityPercent        int     `json:"humidityPercent"`
	WindSpeedMS            float64 `json:"windSpeedMS"`
	ConditionDescription   string  `json:"conditionDescription"`
	RainProbabilityPercent int     `json:"rainProbabilityPercent"`
}

const (
	QUEUE_NAME         = "weather_data_queue"
	MAX_RETRIES        = 3
	RETRY_DELAY        = 5 * time.Second
	API_TIMEOUT        = 10 * time.Second
	REDIS_BLOCK_TIME   = 30 * time.Second
)

var ctx = context.Background()

var (
	apiBaseURL    string
	apiLoginURL   string
	adminEmail    string
	adminPassword string
	authToken string
)

func main() {
	redisHost := os.Getenv("REDIS_HOST")
	redisPort := os.Getenv("REDIS_PORT")
	fullAPIURL := os.Getenv("NESTJS_API_URL")
	adminEmail = os.Getenv("ADMIN_EMAIL")
	adminPassword = os.Getenv("ADMIN_PASSWORD")

	if fullAPIURL == "" || redisHost == "" || redisPort == "" || adminEmail == "" || adminPassword == "" {
		fmt.Println("Erro: Variáveis de ambiente incompletas (REDIS_HOST, REDIS_PORT, NESTJS_API_URL, ADMIN_EMAIL, ADMIN_PASSWORD).")
		os.Exit(1)
	}

	apiBaseURL = strings.TrimSuffix(fullAPIURL, "/weather/logs")
	apiLoginURL = apiBaseURL + "/auth/login"

	rdb := redis.NewClient(&redis.Options{
		Addr: fmt.Sprintf("%s:%s", redisHost, redisPort),
	})

	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		fmt.Printf("Erro ao conectar ao Redis: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Conexão com Redis estabelecida.")

	fmt.Println("Tentando login na API NestJS...")
	authToken = loginAndGetToken()
	if authToken == "" {
		fmt.Println("💀 Erro FATAL: Não foi possível obter o token JWT. Verifique as credenciais e se a rota /auth/login está no ar.")
		os.Exit(1)
	}
	fmt.Println("✅ Login bem-sucedido. Token JWT obtido.")

	fmt.Println("Worker iniciando o consumo da fila...")

	for {
		result, err := rdb.BLPop(ctx, REDIS_BLOCK_TIME, QUEUE_NAME).Result()

		if err == redis.Nil {
			fmt.Printf("Aguardando novas mensagens na fila '%s'...\n", QUEUE_NAME)
			continue
		} else if err != nil {
			fmt.Printf("Erro ao consumir do Redis: %v. Tentando novamente em 5s.\n", err)
			time.Sleep(5 * time.Second)
			continue
		}

		weatherDataJSON := result[1]

		processMessage(weatherDataJSON, fullAPIURL)
	}
}

func processMessage(payload string, apiURL string) {
	fmt.Printf("\nRecebido do Redis: %s\n", payload)

	var data WeatherData
	err := json.Unmarshal([]byte(payload), &data)
	if err != nil {
		fmt.Printf("💀 FALHA: Erro ao deserializar JSON (dado corrompido): %v. Descartando.\n", err)
		return
	}

	fmt.Printf("Dados lidos: Cidade=%s, Temp=%.2f°C\n", data.City, data.TemperatureCelsius)

	nestData := NestJSPayload(data)

	newPayloadBytes, err := json.Marshal(nestData)
	if err != nil {
		fmt.Printf("💀 FALHA: Erro ao serializar JSON para NestJS: %v. Descartando.\n", err)
		return
	}
	newPayload := string(newPayloadBytes)

	fmt.Printf("Payload gerado para NestJS: %s\n", newPayload)

	var lastErr error
	for attempt := 0; attempt < MAX_RETRIES; attempt++ {
		err := sendToNestJSAPI(newPayload, apiURL, authToken)
		if err == nil {
			fmt.Println("✅ Sucesso: Dados enviados para a API NestJS.")
			return
		}

		lastErr = err
		fmt.Printf("❌ Erro no envio (Tentativa %d/%d): %v\n", attempt+1, MAX_RETRIES, err)
		if attempt < MAX_RETRIES-1 {
			time.Sleep(RETRY_DELAY)
		}
	}
	fmt.Printf("💀 FALHA FATAL: Mensagem descartada após %d tentativas. Último Erro: %v\n", MAX_RETRIES, lastErr)
}

func loginAndGetToken() string {
	client := http.Client{Timeout: API_TIMEOUT}

	loginData := LoginPayload{Email: adminEmail, Password: adminPassword}
	jsonPayload, _ := json.Marshal(loginData)

	req, err := http.NewRequest("POST", apiLoginURL, bytes.NewBuffer(jsonPayload))
	if err != nil {
		fmt.Printf("Erro ao criar requisição de login: %v\n", err)
		return ""
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("Erro de rede/conexão no login: %v\n", err)
		return ""
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		fmt.Printf("Erro de login. Status: %d. Verifique as credenciais ADMIN_EMAIL/ADMIN_PASSWORD.\n", resp.StatusCode)
		return ""
	}

	var loginResp LoginResponse
	err = json.NewDecoder(resp.Body).Decode(&loginResp)
	if err != nil {
		fmt.Printf("Erro ao decodificar resposta de login: %v\n", err)
		return ""
	}

	return loginResp.AccessToken
}

func sendToNestJSAPI(jsonPayload string, url string, token string) error {
	client := http.Client{Timeout: API_TIMEOUT}

	bodyReader := strings.NewReader(jsonPayload)

	req, err := http.NewRequest("POST", url, bodyReader)
	if err != nil {
		return fmt.Errorf("erro ao criar requisição: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

	resp, err := client.Do(req)

	if err != nil {
		return fmt.Errorf("erro de rede/conexão: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		bodyString := string(bodyBytes)

		return fmt.Errorf("API retornou status de erro: %d. Detalhes: %s", resp.StatusCode, bodyString)
	}

	return nil
}