from fastapi import APIRouter
from typing import Dict, Any

from services.mock_data_service import WEATHER

router = APIRouter(
    prefix="/api/v1/weather",
    tags=["weather"]
)

@router.get("/advisory", response_model=Dict[str, Any])
async def get_weather_advisory():
    """Get weather based farm actions/advisories."""
    return {"farm_actions": WEATHER["farm_actions"], "risks": WEATHER["risks"]}

@router.get("/current", response_model=Dict[str, Any])
async def get_current_weather():
    """Get current weather conditions."""
    return {"location": WEATHER["location"], "current": WEATHER["current"]}

@router.get("/forecast", response_model=Dict[str, Any])
async def get_weather_forecast():
    """Get weather forecast details."""
    return {"location": WEATHER["location"], "forecast": WEATHER["forecast"]}
