from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import router
import uvicorn

app = FastAPI(
    title="AI Weather Service", 
    version="1.0.0",
    description="Uma API de serviço de clima alimentada por IA. Recebe dados automáticos de um worker externo e permite consultas de chat inteligentes sobre as condições climáticas armazenadas.",
    contact={
        "name": "Equipe de Suporte AI Service",
        "url": "https://suaempresa.com/suporte", 
        "email": "suporte@suaempresa.com", 
    },
    license_info={
        "name": "Licença MIT", 
        "url": "https://opensource.org/licenses/MIT",
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1", tags=["v1"])

@app.get("/")
async def root():
    return {"message": "AI Weather Service", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "AI Weather Service"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)