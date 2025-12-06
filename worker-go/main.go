package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/go-redis/redis/v8"
)

type WeatherData struct {
	City                 string  `json:"city"`
	Timestamp            string  `json:"timestamp"`
	TemperatureCelsius   float64 `json:"temperature_celsius"`
	HumidityPercent      int     `json:"humidity_percent"`
	WindSpeedMS          float64 `json:"wind_speed_m_s"`
	ConditionDescription string  `json:"condition_description"`
}

type LoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	AccessToken string `json:"access_token"`
}

type NestJSPayload struct {
	City                 string  `json:"city"`
	Timestamp            string  `json:"timestamp"`
	TemperatureCelsius   float64 `json:"temperatureCelsius"`
	HumidityPercent      int     `json:"humidityPercent"`
	WindSpeedMS          float64 `json:"windSpeedMS"`
	ConditionDescription string  `json:"conditionDescription"`
}

const (
	QUEUE_NAME       = "weather_data_queue"
	MAX_RETRIES      = 3
	RETRY_DELAY      = 5 * time.Second
	API_TIMEOUT      = 10 * time.Second
	REDIS_BLOCK_TIME = 30 * time.Second
)

var ctx = context.Background()

var (
	apiBaseURL     string
	apiLoginURL    string
	adminEmail     string
	adminPassword  string
	authToken      string
	aiServiceURL   string // <- NOVO
	enableAISend   bool   // <- NOVO
)

func main() {
	redisHost := os.Getenv("REDIS_HOST")
	redisPort := os.Getenv("REDIS_PORT")
	fullAPIURL := os.Getenv("NESTJS_API_URL")
	adminEmail = os.Getenv("ADMIN_EMAIL")
	adminPassword = os.Getenv("ADMIN_PASSWORD")

	// NOVO — leitura opcional do serviço de IA
	aiServiceURL = os.Getenv("AI_SERVICE_URL")
	enableAISend = aiServiceURL != ""

	if fullAPIURL == "" || redisHost == "" || redisPort == "" || adminEmail == "" || adminPassword == "" {
		fmt.Println("Erro: Variáveis obrigatórias não configuradas.")
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
		fmt.Println("Erro ao obter token JWT.")
		os.Exit(1)
	}

	fmt.Println("Worker iniciado...")

	for {
		result, err := rdb.BLPop(ctx, REDIS_BLOCK_TIME, QUEUE_NAME).Result()
		if err == redis.Nil {
			continue
		}
		if err != nil {
			fmt.Printf("Erro ao consumir Redis: %v\n", err)
			time.Sleep(5 * time.Second)
			continue
		}

		weatherDataJSON := result[1]

		processMessage(weatherDataJSON, fullAPIURL)
	}
}

func processMessage(payload string, apiURL string) {
    fmt.Printf("\nRecebido: %s\n", payload)

    var data WeatherData
    if err := json.Unmarshal([]byte(payload), &data); err != nil {
        fmt.Printf("Erro ao parsear JSON recebido: %v\n", err)
        return
    }

    nestPayload := NestJSPayload(data)
    bodyBytes, err := json.Marshal(nestPayload)
    if err != nil {
        fmt.Printf("Erro ao serializar Nest payload: %v\n", err)
        return
    }

    fmt.Println("Enviando dados ao NestJS...")
    if err := sendWithRetry(func() error {
        return sendToNestJSAPI(string(bodyBytes), apiURL, authToken)
    }); err != nil {
        fmt.Printf("NestJS falhou após %d tentativas: %v\n", MAX_RETRIES, err)
    } else {
        fmt.Println("OK — enviado ao NestJS.")
    }

    if !enableAISend || aiServiceURL == "" {
        fmt.Println("AI Service desabilitado (AI_SERVICE_URL vazio).")
        return
    }

    fmt.Printf("Enviando dados ao AI-Service em %s...\n", aiServiceURL)
    if err := sendWithRetry(func() error {
        return sendToAIService(nestPayload)
    }); err != nil {
        fmt.Printf("AI-Service falhou após %d tentativas: %v\n", MAX_RETRIES, err)
    } else {
        fmt.Println("OK — enviado ao AI-Service.")
    }
}

func sendWithRetry(fn func() error) error {
    var lastErr error
    for attempt := 0; attempt < MAX_RETRIES; attempt++ {
        if err := fn(); err == nil {
            return nil
        } else {
            lastErr = err
            time.Sleep(RETRY_DELAY)
        }
    }
    return fmt.Errorf("último erro: %w", lastErr)
}


func loginAndGetToken() string {
	client := http.Client{Timeout: API_TIMEOUT}

	loginData := LoginPayload{Email: adminEmail, Password: adminPassword}
	jsonPayload, _ := json.Marshal(loginData)

	req, err := http.NewRequest("POST", apiLoginURL, bytes.NewBuffer(jsonPayload))
	if err != nil {
		return ""
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return ""
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return ""
	}

	var loginResp LoginResponse
	json.NewDecoder(resp.Body).Decode(&loginResp)

	return loginResp.AccessToken
}

func sendToNestJSAPI(jsonPayload string, url string, token string) error {
	client := http.Client{Timeout: API_TIMEOUT}
	req, err := http.NewRequest("POST", url, strings.NewReader(jsonPayload))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("ai-service retornou erro: %d — %s", resp.StatusCode, string(body))

	}

	return nil
}

//
// 🔥 NOVO — Função para enviar ao AI-Service
//
func sendToAIService(payload NestJSPayload) error {
	client := http.Client{Timeout: API_TIMEOUT}

	bodyBytes, _ := json.Marshal(payload)
	req, err := http.NewRequest("POST", aiServiceURL, bytes.NewBuffer(bodyBytes))

	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("AI-Service retornou erro: %d — %s", resp.StatusCode, string(body))
	}

	return nil
}
