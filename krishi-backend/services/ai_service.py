# Intent-based mock AI that returns structured agricultural advice
# Designed so a real LLM (Gemini/OpenAI) can be plugged in by setting GEMINI_API_KEY or OPENAI_API_KEY env vars

from typing import Optional
import os

class KrishiAIService:
    """Modular AI service. Currently uses rule-based mock responses.
    To use a real LLM, set GEMINI_API_KEY or OPENAI_API_KEY in .env"""
    
    MOCK_RESPONSES = {
        "irrigate": {
            "recommendation": "Do not irrigate today.",
            "why": "Rainfall of 12mm is expected within the next 24-36 hours, and your current soil moisture is already at 62%, which is within the adequate range for Wheat at the Tillering stage. Irrigating now would raise moisture above optimal levels and risk root stress.",
            "risk": "Low",
            "confidence": 89,
            "next_step": "Check soil moisture reading again after the rainfall event. If moisture falls below 50% within the next 5 days with no further rain, schedule evening drip irrigation.",
            "disclaimer": "This recommendation is based on available sensor and forecast data. Please verify with a local agricultural extension officer if in doubt."
        },
        "yellow_leaves": {
            "recommendation": "Inspect the affected plants and compare with the disease guide in Crop Doctor.",
            "why": "Yellow leaves in Wheat at the Tillering stage can indicate several conditions: nitrogen deficiency (possible — nitrogen is at Moderate level), early-stage leaf rust, or waterlogging stress. Given current high humidity (64%) and moderate disease risk, fungal causes should not be ruled out.",
            "risk": "Medium",
            "confidence": 74,
            "next_step": "Photograph the affected leaves and upload to Krishi Crop Doctor for image analysis. If the pattern is orange-yellow pustules, treat as potential leaf rust and consult your district agricultural officer.",
            "disclaimer": "Confidence is moderate. Please consult a certified agricultural expert before applying any treatment."
        },
        "next_crop": {
            "recommendation": "Consider Rice or Maize as the next Kharif crop, or a short-duration legume as an intercrop.",
            "why": "Your soil shows Low organic carbon (0.42%), which is a key concern. A legume crop (e.g., moong/green gram) in the rotation will fix atmospheric nitrogen and add organic matter, improving soil health before the next Rabi wheat cycle. Your soil phosphorus is currently High, which also suits legumes.",
            "risk": "Low",
            "confidence": 82,
            "next_step": "Visit the Regenerative Farming Planner page for a 3-year soil improvement plan tailored to your field.",
            "disclaimer": "Crop selection depends on local market conditions and water availability. Verify with your local Krishi Vigyan Kendra (KVK)."
        },
        "improve_soil": {
            "recommendation": "Add organic matter and consider minimum tillage to reverse the decline in soil organic carbon.",
            "why": "Your soil organic carbon is 0.42%, below the recommended 0.75% for healthy Loamy soil. This is limiting nutrient retention and soil water-holding capacity. Burning wheat residue (common in Punjab) is the primary driver of this decline.",
            "risk": "Low",
            "confidence": 91,
            "next_step": "After wheat harvest: (1) Retain and incorporate stubble rather than burning. (2) Apply 2-3 tonnes of FYM per acre. (3) Sow a cover crop. Visit the Regenerative Farming Planner for the full 3-year plan.",
            "disclaimer": "Soil improvement is a multi-season process. Results will vary by initial conditions and management practices."
        },
        "fertilizer": {
            "recommendation": "Your next fertilizer application should focus on Nitrogen — apply a split dose at the tillering stage.",
            "why": "Nitrogen is at Moderate levels (180 kg/ha). For Wheat variety HD-3226 at the Tillering stage, a top-dressing of urea (25-30 kg/acre) is recommended in 10-14 days if growth looks uniform. Phosphorus is already High — no additional phosphorus input needed this season.",
            "risk": "Low",
            "confidence": 85,
            "next_step": "Wait for the current rain event to pass (2-3 days). Apply urea on a clear morning when soil is moist but not waterlogged. Avoid applying before predicted rain to prevent runoff losses.",
            "disclaimer": "Fertilizer recommendations depend on field-specific tests. This is a general guidance based on available soil data."
        },
        "heavy_rain": {
            "recommendation": "Do not irrigate, clear drainage channels, and inspect the north-west section of your field for waterlogging risk.",
            "why": "Heavy rain (85% probability, ~20mm) is forecast for tomorrow. Your north-west zone already shows lower NDVI (0.58), which may indicate localized stress. Waterlogging in this zone could worsen crop health.",
            "risk": "Medium",
            "confidence": 87,
            "next_step": "(1) Clear any blocked drainage outlets today. (2) Do not apply any pesticide or fertiliser in the next 48 hours. (3) After rain, inspect north-west section and report any standing water.",
            "disclaimer": "Weather forecasts carry inherent uncertainty. Always prepare for a range of rainfall outcomes."
        },
        "default": {
            "recommendation": "Based on current farm data, your wheat crop is in a generally healthy state.",
            "why": "Crop health is at 86% and NDVI is 0.71, both within healthy ranges for the Tillering stage. The main areas to watch are: (1) Low soil organic carbon — long-term concern. (2) Upcoming rain — avoid irrigation. (3) North-west field zone showing slight stress.",
            "risk": "Low",
            "confidence": 80,
            "next_step": "Review the full Advisory on the Dashboard, check the Weather Intelligence page for rain timing, and visit the Regenerative Farming Planner for long-term soil improvement.",
            "disclaimer": "This is a general status summary. For specific concerns, ask a more targeted question."
        }
    }
    
    def detect_intent(self, message: str) -> str:
        msg = message.lower()
        if any(w in msg for w in ["irrigat", "water", "drip"]):
            return "irrigate"
        elif any(w in msg for w in ["yellow", "pale", "discolor", "brown", "rust"]):
            return "yellow_leaves"
        elif any(w in msg for w in ["next crop", "plant next", "rotation", "kharif", "rabi"]):
            return "next_crop"
        elif any(w in msg for w in ["soil", "organic", "carbon", "improve"]):
            return "improve_soil"
        elif any(w in msg for w in ["fertilizer", "fertiliser", "urea", "npk", "nutrient"]):
            return "fertilizer"
        elif any(w in msg for w in ["rain", "flood", "heavy", "storm"]):
            return "heavy_rain"
        else:
            return "default"
    
    def get_response(self, message: str, farm_context: dict = None) -> dict:
        """Get AI advisory response. Swap this method body for a real LLM call."""
        intent = self.detect_intent(message)
        response = self.MOCK_RESPONSES[intent].copy()
        response["intent"] = intent
        response["data_source"] = "demo_mock"
        response["note"] = "This response uses demo data. Connect a real AI provider via GEMINI_API_KEY or OPENAI_API_KEY for live intelligence."
        return response

ai_service = KrishiAIService()
