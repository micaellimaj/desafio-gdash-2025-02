from fastapi import APIRouter, Request, HTTPException
from typing import Dict, Any, List
from pydantic import BaseModel, Field
from datetime import datetime
import asyncio
from app.gemini import generate_weather_response

router = APIRouter(tags=["Dados Climáticos", "Chat com IA"])

weather_data_store: List[Dict[str, Any]] = []
data_lock = asyncio.Lock()

class WeatherData(BaseModel):
    city: str = Field(..., min_length=1, max_length=100, example="São Paulo", description="Nome da cidade para a previsão.")
    temperatureCelsius: float = Field(..., ge=-100, le=100, example=25.5, description="Temperatura em graus Celsius.")
    humidityPercent: int = Field(..., ge=0, le=100, example=70, description="Percentual de umidade no ar (0-100).")
    windSpeedMS: float = Field(..., ge=0, example=3.2, description="Velocidade do vento em metros por segundo.")
    conditionDescription: str = Field(..., min_length=1, max_length=200, example="Céu limpo com poucas nuvens.", description="Descrição da condição climática.")
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat(), example="2025-12-07T17:00:00.000000", description="Timestamp ISO 8601 da leitura.")

class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=500, example="Qual a temperatura mais alta registrada hoje?")

class ChatResponse(BaseModel):
    answer: str = Field(..., description="A resposta gerada pelo modelo de IA.")
    has_weather_data: bool = Field(..., description="Indica se havia dados climáticos disponíveis no cache para a IA usar.")
    data_count: int = Field(..., description="Número total de registros climáticos armazenados no momento da consulta.")


@router.post(
    "/ingest", 
    response_model=Dict[str, Any],
    summary="Receber Dados Climáticos Automáticos (Ingestão)",
    description="Endpoint interno para receber logs climáticos automáticos do worker-go. Os dados são armazenados em um cache de até 100 registros. Idealmente, este endpoint deve ser protegido por uma chave de API." 
)
async def ingest_weather(weather_data: WeatherData):
    try:
        async with data_lock:
            log_data = weather_data.dict()
            weather_data_store.append(log_data)
            
            if len(weather_data_store) > 100:
                weather_data_store.pop(0)
        
        print(f"✅ Dados recebidos automaticamente: {weather_data.city} - {weather_data.temperatureCelsius}°C")
        
        return {
            "status": "success",
            "message": "Dados recebidos e armazenados automaticamente",
            "stored_count": len(weather_data_store),
            "record": log_data
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post(
    "/chat", 
    response_model=ChatResponse,
    summary="Consulta de Chat sobre o Clima com IA",
    description="Permite que o usuário faça perguntas em linguagem natural sobre o clima. A IA utiliza os dados climáticos armazenados (via /ingest) como contexto para gerar respostas inteligentes."
)
async def weather_chat(request: ChatRequest):
    try:
        question = request.question.strip()
        
        if not question:
            raise HTTPException(status_code=400, detail="Pergunta é obrigatória")
        
        async with data_lock:
            available_data = weather_data_store.copy()
        
        has_data = len(available_data) > 0

        answer = generate_weather_response(question, available_data) 
        
        return ChatResponse(
            answer=answer,
            has_weather_data=has_data,
            data_count=len(available_data)
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro interno ao processar pergunta")

@router.get(
    "/weather/latest",
    summary="Obter Últimos Dados Climáticos (Cache)",
    description="Retorna os 10 registros climáticos mais recentes armazenados no cache, ordenados do mais antigo para o mais novo. Útil para monitoramento em tempo real."
)
async def get_latest_weather():
    async with data_lock:
        latest_data = weather_data_store.copy()
    
    return {
        "count": len(latest_data),
        "last_updated": latest_data[-1]["timestamp"] if latest_data else None,
        "data": latest_data[-10:] if latest_data else [] 
    }

@router.get(
    "/health",
    summary="Verificação de Saúde e Status do Serviço",
    description="Verifica o estado operacional da API e fornece detalhes sobre o cache de dados automáticos, incluindo o número de registros armazenados e o timestamp do último dado recebido."
)
async def health_check():
    async with data_lock:
        data_count = len(weather_data_store)
    
    return {
        "status": "healthy",
        "service": "AI Weather Service",
        "version": "1.0.0",
        "automatic_data": {
            "enabled": True,
            "stored_records": data_count,
            "last_received": weather_data_store[-1]["timestamp"] if data_count > 0 else None
        }
    }