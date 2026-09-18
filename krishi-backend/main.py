from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from routers import field, soil, weather, advisor, disease, network, analytics
from services.mock_data_service import FARMER, FIELD, SOIL, WEATHER, ADVISORY, STATES_NETWORK, AI_MODELS

app = FastAPI(
    title="Krishi API",
    description="Backend for the Krishi AI Agriculture Intelligence Platform",
    version="1.0.0"
)

# Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(field.router)
app.include_router(soil.router)
app.include_router(weather.router)
app.include_router(advisor.router)
app.include_router(disease.router)
app.include_router(network.router)
app.include_router(network.router_models)
app.include_router(analytics.router)

@app.get("/")
async def root():
    """Root endpoint returning basic API information."""
    return {
        "name": "Krishi API",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

@app.get("/api/v1/demo-data")
async def get_demo_data():
    """Return the complete mock farm object."""
    return {
        "farmer": FARMER,
        "field": FIELD,
        "soil": SOIL,
        "weather": WEATHER,
        "advisory": ADVISORY,
        "states_network": STATES_NETWORK,
        "ai_models": AI_MODELS
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
