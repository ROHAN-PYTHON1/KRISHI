from fastapi import APIRouter
from typing import List, Dict, Any

from services.mock_data_service import STATES_NETWORK, AI_MODELS

router = APIRouter(
    prefix="/api/v1/network",
    tags=["network"]
)

@router.get("/states", response_model=List[Dict[str, Any]])
async def get_states_network():
    """Get state network status."""
    return STATES_NETWORK

@router.get("/models", response_model=List[Dict[str, Any]])
async def get_ai_models():
    """Get list of active AI models."""
    return AI_MODELS

@router.get("/api-demo", response_model=Dict[str, Any])
async def get_api_demo():
    """Get sample API documentation/demo for the network."""
    return {
        "name": "Krishi Network API Demo",
        "version": "1.0",
        "endpoints": {
            "GET /states": "Returns status of all state nodes",
            "GET /models": "Returns available federated AI models"
        },
        "description": "This is a demo endpoint showing how state nodes can integrate with the Krishi Network API."
    }

# Provide backwards compatible endpoint mapped under /api/v1/models (as specified in prompt)
router_models = APIRouter(prefix="/api/v1", tags=["models"])
@router_models.get("/models", response_model=List[Dict[str, Any]])
async def get_ai_models_legacy():
    return AI_MODELS
