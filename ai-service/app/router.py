from fastapi import APIRouter, Request, HTTPException
from typing import Dict, Any, List
from pydantic import BaseModel, Field
from datetime import datetime
import asyncio
from app.gemini import generate_weather_response

router = APIRouter()

# Armazenamento em memória para dados climáticos
weather_data_store: List[Dict[str, Any]] = []
data_lock = asyncio.Lock()

# Modelos Pydantic para validação (compatíveis com worker-go)
class WeatherData(BaseModel):
    city: str = Field(..., min_length=1, max_length=100)
    temperatureCelsius: float = Field(..., ge=-100, le=100)
    humidityPercent: int = Field(..., ge=0, le=100)
    windSpeedMS: float = Field(..., ge=0)
    conditionDescription: str = Field(..., min_length=1, max_length=200)
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())

class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=500)

class ChatResponse(BaseModel):
    answer: str
    has_weather_data: bool
    data_count: int

@router.post("/ingest", response_model=Dict[str, Any])
async def ingest_weather(weather_data: WeatherData):
    """
    Recebe dados do worker-go automaticamente.
    Não requer autenticação - chamado internamente pelo worker.
    """
    try:
        async with data_lock:
            # Adiciona dados ao armazenamento
            log_data = weather_data.dict()
            weather_data_store.append(log_data)
            
            # Mantém apenas os últimos 100 registros para evitar sobrecarga
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

@router.post("/chat", response_model=ChatResponse)
async def weather_chat(request: ChatRequest):
    """
    Processa perguntas usando dados já recebidos automaticamente.
    """
    try:
        question = request.question.strip()
        
        if not question:
            raise HTTPException(status_code=400, detail="Pergunta é obrigatória")
        
        # Obtém dados armazenados automaticamente
        async with data_lock:
            available_data = weather_data_store.copy()
        
        has_data = len(available_data) > 0
        
        # Gera resposta usando IA com contexto dos dados
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

@router.get("/weather/latest")
async def get_latest_weather():
    """Retorna os dados recebidos automaticamente."""
    async with data_lock:
        latest_data = weather_data_store.copy()
    
    return {
        "count": len(latest_data),
        "last_updated": latest_data[-1]["timestamp"] if latest_data else None,
        "data": latest_data[-10:] if latest_data else []  # Últimos 10 registros
    }

@router.get("/health")
async def health_check():
    """Verificação de saúde com status dos dados."""
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