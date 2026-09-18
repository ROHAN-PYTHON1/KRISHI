from fastapi import APIRouter, UploadFile, File
from typing import Dict, Any, List

router = APIRouter(
    prefix="/api/v1/disease",
    tags=["disease"]
)

@router.post("/diagnose", response_model=Dict[str, Any])
async def diagnose_disease(file: UploadFile = File(...)):
    """Diagnose crop disease from an uploaded image."""
    return {
        "disease": "Wheat Leaf Rust",
        "confidence": 91,
        "risk": "High",
        "symptoms": [
            "Small, brown or orange pustules on leaves",
            "Yellowing of surrounding tissue",
            "Premature drying of leaves"
        ],
        "recommendation": "Apply a recommended fungicide (e.g., Propiconazole) immediately. Ensure good field drainage and avoid excessive nitrogen application.",
        "alternative": "Consider growing rust-resistant wheat varieties next season.",
        "filename": file.filename
    }

@router.get("/catalogue", response_model=List[Dict[str, str]])
async def get_disease_catalogue():
    """Get a list of known crop diseases."""
    return [
        {"name": "Wheat Leaf Rust", "crop": "Wheat"},
        {"name": "Powdery Mildew", "crop": "Wheat"},
        {"name": "Loose Smut", "crop": "Wheat"},
        {"name": "Rice Blast", "crop": "Rice"},
        {"name": "Bacterial Blight", "crop": "Rice"}
    ]
