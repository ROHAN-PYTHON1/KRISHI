from fastapi import APIRouter, HTTPException
from typing import Dict, Any

from services.mock_data_service import FIELD, ADVISORY

router = APIRouter(
    prefix="/api/v1/field",
    tags=["field"]
)

@router.get("/advisory", response_model=Dict[str, Any])
async def get_field_advisory():
    """Get field advisory details."""
    return ADVISORY

@router.get("/{field_id}", response_model=Dict[str, Any])
async def get_field_data(field_id: str):
    """Get complete field data by field ID."""
    if field_id != FIELD["field_id"]:
        raise HTTPException(status_code=404, detail="Field not found")
    return FIELD

@router.get("/{field_id}/ndvi-history", response_model=Dict[str, Any])
async def get_field_ndvi_history(field_id: str):
    """Get historical NDVI data for a field."""
    if field_id != FIELD["field_id"]:
        raise HTTPException(status_code=404, detail="Field not found")
    return {"field_id": field_id, "ndvi_history": FIELD["ndvi_history"]}
