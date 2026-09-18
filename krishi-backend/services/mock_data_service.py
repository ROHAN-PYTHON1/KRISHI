# All demo data as Python dicts - used by all routers
FARMER = {"id": "farmer_001", "name": "Rajesh Kumar", "village": "Raikot", "district": "Ludhiana", "state": "Punjab", "farm_size_acres": 2.5, "crop": "Wheat", "soil_type": "Loamy", "preferred_language": "en"}

FIELD = {
  "field_id": "field_punjab_001",
  "crop": "Wheat",
  "variety": "HD-3226",
  "area_acres": 2.5,
  "location": {"lat": 30.9010, "lon": 75.8573, "state": "Punjab", "district": "Ludhiana"},
  "crop_health_pct": 86,
  "ndvi": 0.71,
  "soil_moisture_pct": 62,
  "temperature_c": 27,
  "rainfall_mm": 0,
  "growth_stage": "Tillering",
  "disease_risk": "Moderate",
  "health_zones": [
    {"zone": "North-West", "status": "stress", "ndvi": 0.58},
    {"zone": "North-East", "status": "healthy", "ndvi": 0.74},
    {"zone": "South-West", "status": "healthy", "ndvi": 0.72},
    {"zone": "South-East", "status": "healthy", "ndvi": 0.75}
  ],
  "ndvi_history": [
    {"date": "2024-12-20", "ndvi": 0.45},
    {"date": "2024-12-27", "ndvi": 0.52},
    {"date": "2025-01-03", "ndvi": 0.58},
    {"date": "2025-01-10", "ndvi": 0.63},
    {"date": "2025-01-17", "ndvi": 0.67},
    {"date": "2025-01-24", "ndvi": 0.71},
    {"date": "2025-01-31", "ndvi": 0.70}
  ]
}

SOIL = {
  "field_id": "field_punjab_001",
  "ph": 7.1,
  "nitrogen": {"level": "Moderate", "value_kg_ha": 180, "optimal_min": 160, "optimal_max": 240},
  "phosphorus": {"level": "High", "value_kg_ha": 28, "optimal_min": 20, "optimal_max": 30},
  "potassium": {"level": "Moderate", "value_kg_ha": 145, "optimal_min": 130, "optimal_max": 200},
  "organic_carbon": {"level": "Low", "value_pct": 0.42, "optimal_min": 0.75},
  "soil_moisture_pct": 62,
  "health_score": 72,
  "recommendations": [
    "Organic carbon is below the recommended level. Add 2-3 tonnes of farmyard manure per acre.",
    "Consider sowing a cover crop (e.g., mustard or legume) after wheat harvest.",
    "Minimise tillage to preserve soil structure and earthworm population.",
    "Reassess soil health after the next cropping cycle."
  ],
  "history": [
    {"period": "Kharif 2023", "score": 65, "organic_carbon": 0.38},
    {"period": "Rabi 2023", "score": 68, "organic_carbon": 0.40},
    {"period": "Kharif 2024", "score": 70, "organic_carbon": 0.41},
    {"period": "Rabi 2024", "score": 72, "organic_carbon": 0.42}
  ]
}

WEATHER = {
  "location": "Ludhiana, Punjab",
  "current": {"temperature_c": 27, "humidity_pct": 64, "rain_probability_pct": 72, "expected_rainfall_mm": 12, "wind_speed_kmh": 14, "condition": "Partly Cloudy"},
  "forecast": [
    {"day": "Today", "max_c": 27, "min_c": 18, "rain_prob": 72, "condition": "Rain Expected"},
    {"day": "Tomorrow", "max_c": 24, "min_c": 16, "rain_prob": 85, "condition": "Heavy Rain"},
    {"day": "Day 3", "max_c": 22, "min_c": 15, "rain_prob": 40, "condition": "Cloudy"},
    {"day": "Day 4", "max_c": 26, "min_c": 17, "rain_prob": 15, "condition": "Partly Cloudy"},
    {"day": "Day 5", "max_c": 29, "min_c": 19, "rain_prob": 5, "condition": "Sunny"},
    {"day": "Day 6", "max_c": 30, "min_c": 20, "rain_prob": 10, "condition": "Sunny"},
    {"day": "Day 7", "max_c": 28, "min_c": 18, "rain_prob": 30, "condition": "Partly Cloudy"}
  ],
  "risks": {
    "heavy_rain": "High",
    "heat_stress": "Low",
    "frost": "Low",
    "wind": "Low",
    "disease_favorability": "Moderate"
  },
  "farm_actions": [
    {"trigger": "Rain expected in 24 hours", "recommendation": "Avoid irrigation today. Soil moisture is already at 62% and rainfall will bring it to adequate levels.", "priority": "high"},
    {"trigger": "High humidity (64%) forecast for 48 hours", "recommendation": "Monitor crop for signs of fungal disease. Inspect the north-west section of the field closely.", "priority": "medium"},
    {"trigger": "Temperature to rise to 30°C by Day 5", "recommendation": "Plan irrigation for Day 5 evening if no significant rainfall occurs by then.", "priority": "low"}
  ]
}

ADVISORY = {
  "field_id": "field_punjab_001",
  "crop": "Wheat",
  "location": "Ludhiana, Punjab",
  "soil": {"ph": 7.1, "nitrogen": "Moderate", "phosphorus": "High", "potassium": "Moderate", "organic_carbon": "Low", "moisture_pct": 62},
  "weather": {"condition": "Rain Expected", "rain_probability_pct": 72, "temperature_c": 27},
  "crop_health": {"score_pct": 86, "ndvi": 0.71, "stage": "Tillering", "disease_risk": "Moderate"},
  "advisory": {
    "title": "Do not irrigate today",
    "body": "Rainfall is expected within the next 24\u201336 hours and current soil moisture is adequate at 62%. Irrigation at this time would lead to waterlogging and potential root stress.",
    "recommended_action": "Recheck soil moisture after rainfall. If moisture drops below 50% within 5 days, schedule drip irrigation for the evening.",
    "confidence_pct": 89,
    "risk_level": "Low"
  }
}

STATES_NETWORK = [
  {"state": "Punjab", "status": "Connected", "farmers": 12400, "datasets": 8, "active_models": 5, "use_cases": ["Wheat intelligence", "Satellite crop monitoring", "Soil health models", "Climate advisory"], "sharing": True},
  {"state": "Haryana", "status": "Connected", "farmers": 9800, "datasets": 6, "active_models": 4, "use_cases": ["Crop planning", "Water intelligence", "Field monitoring"], "sharing": True},
  {"state": "Maharashtra", "status": "Active", "farmers": 22000, "datasets": 7, "active_models": 3, "use_cases": ["Cotton monitoring", "Sugarcane intelligence", "Drought risk"], "sharing": False},
  {"state": "Karnataka", "status": "Active", "farmers": 18500, "datasets": 5, "active_models": 3, "use_cases": ["Ragi monitoring", "Soil carbon", "Water management"], "sharing": False},
  {"state": "Uttar Pradesh", "status": "Pending", "farmers": 0, "datasets": 0, "active_models": 0, "use_cases": ["Sugarcane advisory", "Rice monitoring"], "sharing": False}
]

AI_MODELS = [
  {"id": "wheat_disease_v2", "name": "Wheat Disease Detection Model", "version": "2.1", "provider": "Punjab Agriculture Intelligence", "status": "Available", "accuracy": 91, "crops": ["Wheat"], "type": "Computer Vision"},
  {"id": "soil_health_v1", "name": "Soil Health Recommendation Model", "version": "1.4", "provider": "Krishi Network", "status": "Available", "accuracy": 88, "crops": ["All"], "type": "Regression"},
  {"id": "irrigation_advisor", "name": "Smart Irrigation Advisor", "version": "1.2", "provider": "Haryana Water Board", "status": "Available", "accuracy": 85, "crops": ["Wheat", "Rice", "Cotton"], "type": "Time Series"},
  {"id": "yield_predictor", "name": "Crop Yield Predictor", "version": "1.0", "provider": "Krishi Network", "status": "Beta", "accuracy": 79, "crops": ["Wheat", "Rice"], "type": "Ensemble"}
]
