from fastapi import APIRouter
from typing import Dict, Any

from services.mock_data_service import FIELD, SOIL

router = APIRouter(
    prefix="/api/v1/analytics",
    tags=["analytics"]
)

@router.get("/farm-performance", response_model=Dict[str, Any])
async def get_farm_performance():
    """Get overall farm performance metrics."""
    return {
        "crop_health_pct": FIELD["crop_health_pct"],
        "soil_health_score": SOIL["health_score"],
        "yield_estimate": "4.2 tonnes/acre",
        "resource_efficiency": "High"
    }

@router.get("/trends", response_model=Dict[str, Any])
async def get_farm_trends():
    """Get farm performance trends over time."""
    return {
        "ndvi_trend": FIELD["ndvi_history"],
        "soil_health_trend": SOIL["history"]
    }
