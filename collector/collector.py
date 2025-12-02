import os
import time
import json
import requests
import redis
from datetime import datetime

REDIS_HOST = os.getenv('REDIS_HOST', 'localhost')
REDIS_PORT = int(os.getenv('REDIS_PORT', 6379))
WEATHER_API_KEY = os.getenv('WEATHER_API_KEY')
CITY_NAME = os.getenv('CITY_NAME', 'Toritama')
QUEUE_NAME = 'weather_data_queue'

WEATHER_URL = f"http://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&units=metric&appid={WEATHER_API_KEY}"

redis_client = None


def connect_to_redis(max_retries=10):
    global redis_client
    
    for i in range(max_retries):
        try:
            client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=False)
            client.ping()
            redis_client = client
            print("Conexão com Redis estabelecida com sucesso.")
            return True
        except Exception as e:
            if i < max_retries - 1:
                print(f"Tentativa {i+1}/{max_retries}: Erro ao conectar ao Redis: {e}. Aguardando 5 segundos...")
                time.sleep(5)
            else:
                print(f"ERRO FATAL: Falha ao conectar ao Redis após {max_retries} tentativas.")
                return False

    return False


def fetch_weather_data():
    print(f"\n--- {datetime.now().strftime('%H:%M:%S')} ---")
    print(f"Buscando dados para {CITY_NAME}...")
    try:
        response = requests.get(WEATHER_URL, timeout=10)
        response.raise_for_status()
        raw_data = response.json()
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar dados da API: {e}")
        return None

    normalized_data = {
        "city": CITY_NAME,
        "timestamp": raw_data.get('dt', int(time.time())), 
        "temperature_celsius": raw_data['main']['temp'],
        "humidity_percent": raw_data['main']['humidity'],
        "wind_speed_m_s": raw_data['wind']['speed'],
        "condition_description": raw_data['weather'][0]['description'],
        "rain_probability_percent": raw_data.get('pop', 0), 
    }
    
    return normalized_data

def send_to_redis(data: dict):
    if not data or redis_client is None:
        return
    try:
        json_payload = json.dumps(data)
        redis_client.rpush(QUEUE_NAME, json_payload)
        
        print(f"✅ Dados enviados com sucesso para a fila '{QUEUE_NAME}'.")
        print(f"   Payload (primeiros 100 chars): {json_payload[:100]}...")
    except Exception as e:
        print(f"ERRO ao enviar para o Redis: {e}")


def main():
    if not connect_to_redis():
        return
    while True:
        weather_data = fetch_weather_data()
        
        send_to_redis(weather_data)
        print(f"Aguardando 30 segundos para a próxima coleta...")
        time.sleep(30) 

if __name__ == '__main__':
    if not WEATHER_API_KEY or WEATHER_API_KEY == 'SUA_CHAVE_AQUI':
        print("ERRO: WEATHER_API_KEY não foi configurada ou está como placeholder. Abortando.")
    else:
        main()