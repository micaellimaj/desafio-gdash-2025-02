from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import router
import uvicorn

app = FastAPI(title="AI Weather Service", version="1.0.0")

# CORS para desenvolvimento
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir router com prefixo de versão
app.include_router(router, prefix="/api/v1", tags=["v1"])

@app.get("/")
async def root():
    return {"message": "AI Weather Service", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "AI Weather Service"}

if __name__ == "__main__":
    # CRÍTICO: Bind para 0.0.0.0 para funcionar em Docker
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)