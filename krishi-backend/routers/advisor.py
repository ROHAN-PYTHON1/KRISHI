from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any, List

from services.ai_service import ai_service
from services.mock_data_service import FIELD, SOIL, WEATHER

router = APIRouter(
    prefix="/api/v1/advisor",
    tags=["advisor"]
)

class ChatRequest(BaseModel):
    message: str
    field_id: Optional[str] = None

@router.post("/chat", response_model=Dict[str, Any])
async def chat_with_advisor(request: ChatRequest):
    """Chat with the AI advisor."""
    farm_context = {
        "field": FIELD,
        "soil": SOIL,
        "weather": WEATHER
    }
    response = ai_service.get_response(request.message, farm_context)
    return response

@router.get("/suggestions", response_model=List[str])
async def get_advisor_suggestions():
    """Get a list of suggested questions to ask the advisor."""
    return [
        "Should I irrigate my wheat crop today?",
        "My wheat leaves are turning yellow, what should I do?",
        "What should I plant for the next crop?",
        "How can I improve my soil's organic carbon?",
        "When should I apply the next dose of fertilizer?",
        "Is there any risk from the heavy rain forecast?"
    ]
