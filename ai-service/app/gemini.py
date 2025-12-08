import google.generativeai as genai
import os
from typing import List, Dict, Any

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY não encontrada nas variáveis de ambiente")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.5-flash')

def generate_weather_response(question: str, weather_data: List[Dict[str, Any]] = None) -> str:
    """
    Gera resposta sobre clima usando dados recebidos automaticamente.
    """
    try:
        context = ""
        if weather_data and len(weather_data) > 0:
            latest = weather_data[-1] 
            context = f"""
                Dados climáticos disponíveis:
                - Cidade: {latest['city']}
                - Temperatura: {latest['temperatureCelsius']}°C
                - Umidade: {latest['humidityPercent']}%
                - Velocidade do vento: {latest['windSpeedMS']} m/s
                - Condição: {latest['conditionDescription']}
                - Atualizado em: {latest['timestamp']}
                """
        else:
            context = "Nenhum dado climático disponível no momento."
        
        prompt = f"""
Como especialista em meteorologia, responda à pergunta do usuário.

{context}

Pergunta: {question}

Responda de forma clara e útil. Se não houver dados suficientes, informe o usuário.
"""
        
        response = model.generate_content(prompt)
        return response.text
        
    except Exception as e:
        print(f"Erro ao gerar resposta: {e}")
        return f"Desculpe, ocorreu um erro ao processar sua pergunta: {str(e)}"