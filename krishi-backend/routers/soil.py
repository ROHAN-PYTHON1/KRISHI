from fastapi import APIRouter, HTTPException
from typing import Dict, Any

from services.mock_data_service import SOIL

router = APIRouter(
    prefix="/api/v1/soil",
    tags=["soil"]
)

@router.get("/analysis", response_model=Dict[str, Any])
async def get_soil_analysis_overview():
    """Get overall soil analysis."""
    return {"overview": "Soil is generally healthy, but organic carbon is low.", "score": SOIL["health_score"]}

@router.get("/{field_id}", response_model=Dict[str, Any])
async def get_soil_data(field_id: str):
    """Get detailed soil data by field ID."""
    if field_id != SOIL["field_id"]:
        raise HTTPException(status_code=404, detail="Field not found")
    return SOIL
