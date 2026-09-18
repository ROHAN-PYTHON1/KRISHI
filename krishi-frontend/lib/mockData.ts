// lib/mockData.ts — Complete demo data for Krishi platform
// All values are internally consistent for the Punjab wheat farm scenario

export const DEMO_FARMER = {
  id: "farmer_001",
  name: "Rajesh Kumar",
  village: "Raikot",
  district: "Ludhiana",
  state: "Punjab",
  farmSizeAcres: 2.5,
  crop: "Wheat",
  variety: "HD-3226",
  soilType: "Loamy",
  preferredLanguage: "en",
  avatar: "RK",
  phone: "+91 98765 43210",
  aadhaarLinked: true,
  pmKisanRegistered: true,
};

export const DEMO_FIELD = {
  fieldId: "field_punjab_001",
  crop: "Wheat",
  variety: "HD-3226",
  areaAcres: 2.5,
  location: {
    lat: 30.9010,
    lon: 75.8573,
    state: "Punjab",
    district: "Ludhiana",
    village: "Raikot",
  },
  cropHealthPct: 86,
  ndvi: 0.71,
  soilMoisturePct: 62,
  temperatureC: 27,
  rainfallMm: 0,
  growthStage: "Tillering",
  sowingDate: "2024-11-25",
  expectedHarvestDate: "2025-04-10",
  diseaseRisk: "Moderate" as const,
  healthZones: [
    { zone: "North-West", status: "stress" as const, ndvi: 0.58, pct: 15 },
    { zone: "North-East", status: "healthy" as const, ndvi: 0.74, pct: 30 },
    { zone: "South-West", status: "healthy" as const, ndvi: 0.72, pct: 30 },
    { zone: "South-East", status: "healthy" as const, ndvi: 0.75, pct: 25 },
  ],
  ndviHistory: [
    { date: "Dec 20", ndvi: 0.45, health: 52 },
    { date: "Dec 27", ndvi: 0.52, health: 61 },
    { date: "Jan 3", ndvi: 0.58, health: 67 },
    { date: "Jan 10", ndvi: 0.63, health: 73 },
    { date: "Jan 17", ndvi: 0.67, health: 79 },
    { date: "Jan 24", ndvi: 0.71, health: 86 },
    { date: "Jan 31", ndvi: 0.70, health: 84 },
  ],
};

export const DEMO_SOIL = {
  fieldId: "field_punjab_001",
  ph: 7.1,
  nitrogen: { level: "Moderate" as const, valueKgHa: 180, optimalMin: 160, optimalMax: 240, pct: 58 },
  phosphorus: { level: "High" as const, valueKgHa: 28, optimalMin: 20, optimalMax: 30, pct: 87 },
  potassium: { level: "Moderate" as const, valueKgHa: 145, optimalMin: 130, optimalMax: 200, pct: 64 },
  organicCarbon: { level: "Low" as const, valuePct: 0.42, optimalMin: 0.75, pct: 28 },
  soilMoisturePct: 62,
  healthScore: 72,
  recommendations: [
    {
      icon: "🌱",
      title: "Increase Organic Carbon",
      detail: "Organic carbon is at 0.42%, below the recommended 0.75%. Add 2-3 tonnes of farmyard manure per acre after harvest.",
      priority: "high" as const,
    },
    {
      icon: "🌿",
      title: "Sow a Cover Crop",
      detail: "Consider a legume cover crop (moong or green gram) after wheat harvest to fix nitrogen and add organic matter.",
      priority: "medium" as const,
    },
    {
      icon: "🚜",
      title: "Reduce Tillage",
      detail: "Avoid unnecessary tillage operations to preserve soil structure and beneficial earthworm populations.",
      priority: "medium" as const,
    },
    {
      icon: "📊",
      title: "Reassess After Harvest",
      detail: "Schedule a fresh soil health test after the wheat harvest to track improvement from this season's practices.",
      priority: "low" as const,
    },
  ],
  history: [
    { period: "Kharif 2023", score: 65, organicCarbon: 0.38, nitrogen: 165 },
    { period: "Rabi 2023", score: 68, organicCarbon: 0.40, nitrogen: 172 },
    { period: "Kharif 2024", score: 70, organicCarbon: 0.41, nitrogen: 176 },
    { period: "Rabi 2024", score: 72, organicCarbon: 0.42, nitrogen: 180 },
  ],
};

export const DEMO_WEATHER = {
  location: "Ludhiana, Punjab",
  current: {
    temperatureC: 27,
    humidityPct: 64,
    rainProbabilityPct: 72,
    expectedRainfallMm: 12,
    windSpeedKmh: 14,
    condition: "Partly Cloudy",
    feelsLikeC: 29,
    uvIndex: 5,
    visibilityKm: 8,
  },
  forecast: [
    { day: "Today", maxC: 27, minC: 18, rainProb: 72, condition: "Rain Expected", icon: "🌧️" },
    { day: "Tomorrow", maxC: 24, minC: 16, rainProb: 85, condition: "Heavy Rain", icon: "⛈️" },
    { day: "Thu", maxC: 22, minC: 15, rainProb: 40, condition: "Cloudy", icon: "☁️" },
    { day: "Fri", maxC: 26, minC: 17, rainProb: 15, condition: "Partly Cloudy", icon: "⛅" },
    { day: "Sat", maxC: 29, minC: 19, rainProb: 5, condition: "Sunny", icon: "☀️" },
    { day: "Sun", maxC: 30, minC: 20, rainProb: 10, condition: "Sunny", icon: "☀️" },
    { day: "Mon", maxC: 28, minC: 18, rainProb: 30, condition: "Partly Cloudy", icon: "⛅" },
  ],
  weeklyChart: [
    { day: "Today", temp: 27, rain: 72 },
    { day: "Tue", temp: 24, rain: 85 },
    { day: "Wed", temp: 22, rain: 40 },
    { day: "Thu", temp: 26, rain: 15 },
    { day: "Fri", temp: 29, rain: 5 },
    { day: "Sat", temp: 30, rain: 10 },
    { day: "Sun", temp: 28, rain: 30 },
  ],
  risks: {
    heavyRain: "High" as const,
    heatStress: "Low" as const,
    frost: "Low" as const,
    wind: "Low" as const,
    diseaseFavorability: "Moderate" as const,
  },
  farmActions: [
    {
      trigger: "🌧️ Rain expected within 24 hours",
      recommendation: "Do not irrigate today. Rainfall of ~12mm is forecast, and soil moisture is already at 62%.",
      action: "Skip irrigation — save water and energy",
      priority: "high" as const,
    },
    {
      trigger: "💧 High humidity (64%) for 48 hours",
      recommendation: "Monitor crop for early signs of fungal disease, particularly in the north-west zone showing lower NDVI.",
      action: "Inspect field tomorrow morning",
      priority: "medium" as const,
    },
    {
      trigger: "🌡️ Temperature rising to 30°C by Day 5",
      recommendation: "If no significant rainfall by Friday, schedule drip irrigation for Friday evening.",
      action: "Plan irrigation for Friday evening",
      priority: "low" as const,
    },
  ],
};

export const DEMO_ADVISORY = {
  title: "Do not irrigate today",
  body: "Rainfall is expected within the next 24–36 hours and current soil moisture is adequate at 62%. Irrigating now would raise moisture above optimal levels and risk waterlogging, particularly in the north-west zone of your field.",
  recommendedAction: "Recheck soil moisture after rainfall. If moisture drops below 50% within 5 days, schedule drip irrigation for the evening.",
  confidencePct: 89,
  riskLevel: "Low" as const,
  timestamp: "2025-01-31T07:30:00+05:30",
};

export const DEMO_DISEASE_RESULT = {
  disease: "Wheat Leaf Rust",
  confidence: 91,
  risk: "High" as const,
  symptoms: [
    "Orange/brown pustules on leaf surface",
    "Leaf discoloration and yellowing",
    "Pattern consistent with Puccinia triticina (fungal)",
    "Concentrated on lower leaf surface",
  ],
  recommendation: "Isolate affected area and consult your district agricultural officer before applying any fungicide. If confirmed, a suitable triazole-based fungicide may be recommended by a certified expert.",
  alternative: "Nutrient deficiency (Nitrogen) or environmental stress — upload a clearer image of multiple leaves for higher confidence.",
  responsibleNote: "This diagnosis is generated by an AI model and should be verified by a certified agricultural expert before any treatment decision.",
  affectedAreaPct: 15,
};

export const REGENERATIVE_PRACTICES = [
  {
    id: "cover-crop",
    practice: "Cover Cropping",
    icon: "🌿",
    description: "Sow moong or cowpea after wheat harvest to fix nitrogen and add organic matter.",
    expectedBenefit: "Improved soil structure and +0.15% organic carbon per season",
    waterImpact: "Potential 10-15% reduction in next season irrigation need",
    soilImpact: "Positive — nitrogen fixation + soil cover",
    climateResilience: "High",
    effort: "Low",
    timeline: "Next Kharif (June)",
  },
  {
    id: "residue-mgmt",
    practice: "Residue Management",
    icon: "🌾",
    description: "Retain and incorporate wheat stubble instead of burning. Use Happy Seeder for direct seeding.",
    expectedBenefit: "Prevent organic matter loss, reduce air pollution",
    waterImpact: "Neutral",
    soilImpact: "Significant positive — adds carbon to soil",
    climateResilience: "High",
    effort: "Medium",
    timeline: "This harvest (April)",
  },
  {
    id: "reduced-tillage",
    practice: "Reduced Tillage",
    icon: "🚜",
    description: "Minimize plowing operations. Use zero-till or minimal-till techniques for wheat sowing.",
    expectedBenefit: "Preserve soil aggregates and earthworm habitat",
    waterImpact: "Better water retention — 8-12% improvement",
    soilImpact: "Positive — preserves soil structure",
    climateResilience: "Medium",
    effort: "Low",
    timeline: "Next Rabi (November)",
  },
  {
    id: "intercropping",
    practice: "Intercropping",
    icon: "🌱",
    description: "Introduce a companion legume in the field border rows during wheat season.",
    expectedBenefit: "Natural nitrogen input, diversified income",
    waterImpact: "Neutral to slight positive",
    soilImpact: "Positive",
    climateResilience: "Very High",
    effort: "Medium",
    timeline: "Next Rabi (November)",
  },
];

export const THREE_YEAR_PLAN = [
  {
    year: "Year 1",
    label: "Foundation",
    color: "#16803A",
    actions: [
      "Retain wheat residue (do not burn)",
      "Apply 2-3 T/acre farmyard manure after harvest",
      "Sow moong as summer cover crop",
      "Get soil health tested (baseline)",
    ],
    targetScore: 76,
    targetOC: 0.52,
  },
  {
    year: "Year 2",
    label: "Diversification",
    color: "#0ea5e9",
    actions: [
      "Introduce Rice-Wheat-Legume rotation",
      "Adopt zero-till wheat sowing",
      "Add micronutrient foliar spray",
      "Join Krishi Network for benchmarking",
    ],
    targetScore: 82,
    targetOC: 0.62,
  },
  {
    year: "Year 3",
    label: "Resilience",
    color: "#7c3aed",
    actions: [
      "Achieve 0.75%+ organic carbon",
      "Drip irrigation installation",
      "Intercrop wheat with mustard border",
      "Sell carbon credits via Krishi Network",
    ],
    targetScore: 89,
    targetOC: 0.75,
  },
];

export const ANALYTICS_DATA = {
  cropHealthTrend: [
    { month: "Sep", health: 0 },
    { month: "Oct", health: 0 },
    { month: "Nov", health: 45 },
    { month: "Dec", health: 62 },
    { month: "Jan", health: 86 },
    { month: "Feb", health: 88 },
    { month: "Mar", health: 82 },
  ],
  soilHealthTrend: [
    { period: "Kharif 23", score: 65 },
    { period: "Rabi 23", score: 68 },
    { period: "Kharif 24", score: 70 },
    { period: "Rabi 24", score: 72 },
  ],
  waterUsage: [
    { month: "Nov", liters: 4200 },
    { month: "Dec", liters: 5800 },
    { month: "Jan", liters: 3200 },
    { month: "Feb", liters: 4500 },
  ],
  advisoryAdoption: [
    { category: "Irrigation", adopted: 85, total: 100 },
    { category: "Fertilizer", adopted: 72, total: 100 },
    { category: "Pest Control", adopted: 60, total: 100 },
    { category: "Soil Mgmt", adopted: 45, total: 100 },
  ],
  yieldEstimate: {
    current: 4.2,
    baseline: 3.8,
    target: 4.8,
    unit: "tonnes/acre",
  },
  farmPerformance: {
    soil: 72,
    water: 68,
    cropHealth: 86,
    climateResilience: 64,
    economicReturn: 74,
    advisoryAdoption: 65,
  },
};

export const STATES_NETWORK = [
  {
    state: "Punjab",
    status: "Connected" as const,
    color: "#16803A",
    farmers: 12400,
    datasets: 8,
    activeModels: 5,
    useCases: ["Wheat intelligence", "Satellite crop monitoring", "Soil health models", "Climate advisory"],
    sharing: true,
    flag: "🌾",
  },
  {
    state: "Haryana",
    status: "Connected" as const,
    color: "#0ea5e9",
    farmers: 9800,
    datasets: 6,
    activeModels: 4,
    useCases: ["Crop planning", "Water intelligence", "Field monitoring", "Disease alerts"],
    sharing: true,
    flag: "💧",
  },
  {
    state: "Maharashtra",
    status: "Active" as const,
    color: "#f59e0b",
    farmers: 22000,
    datasets: 7,
    activeModels: 3,
    useCases: ["Cotton monitoring", "Sugarcane intelligence", "Drought risk"],
    sharing: false,
    flag: "🌻",
  },
  {
    state: "Karnataka",
    status: "Active" as const,
    color: "#7c3aed",
    farmers: 18500,
    datasets: 5,
    activeModels: 3,
    useCases: ["Ragi monitoring", "Soil carbon tracking", "Water management"],
    sharing: false,
    flag: "🌿",
  },
  {
    state: "Uttar Pradesh",
    status: "Pending" as const,
    color: "#94a3b8",
    farmers: 0,
    datasets: 0,
    activeModels: 0,
    useCases: ["Sugarcane advisory", "Rice monitoring"],
    sharing: false,
    flag: "🏞️",
  },
];

export const AI_MODELS = [
  {
    id: "wheat_disease_v2",
    name: "Wheat Disease Detection",
    version: "2.1",
    provider: "Punjab Agriculture Intelligence",
    status: "Available" as const,
    accuracy: 91,
    crops: ["Wheat"],
    type: "Computer Vision",
    uses: 1840,
  },
  {
    id: "soil_health_v1",
    name: "Soil Health Recommendation",
    version: "1.4",
    provider: "Krishi Network",
    status: "Available" as const,
    accuracy: 88,
    crops: ["All crops"],
    type: "Regression + Rules",
    uses: 3220,
  },
  {
    id: "irrigation_advisor",
    name: "Smart Irrigation Advisor",
    version: "1.2",
    provider: "Haryana Water Board",
    status: "Available" as const,
    accuracy: 85,
    crops: ["Wheat", "Rice", "Cotton"],
    type: "Time Series",
    uses: 2140,
  },
  {
    id: "yield_predictor",
    name: "Crop Yield Predictor",
    version: "1.0",
    provider: "Krishi Network",
    status: "Beta" as const,
    accuracy: 79,
    crops: ["Wheat", "Rice"],
    type: "Ensemble ML",
    uses: 640,
  },
];

export const NOTIFICATIONS = [
  {
    id: "n1",
    icon: "🌧️",
    title: "Rain Expected Tomorrow",
    detail: "Heavy rain (85%) forecast. Skip irrigation and clear drainage.",
    time: "2 min ago",
    type: "weather" as const,
    read: false,
  },
  {
    id: "n2",
    icon: "🌱",
    title: "Soil Moisture Stable",
    detail: "Soil moisture at 62% — within optimal range for tillering stage.",
    time: "1 hr ago",
    type: "soil" as const,
    read: false,
  },
  {
    id: "n3",
    icon: "⚠️",
    title: "Disease Risk: Moderate",
    detail: "High humidity increases fungal disease risk. Inspect north-west zone.",
    time: "3 hrs ago",
    type: "disease" as const,
    read: true,
  },
  {
    id: "n4",
    icon: "🌾",
    title: "New Regenerative Recommendation",
    detail: "Your 3-year soil improvement plan has been updated.",
    time: "Yesterday",
    type: "advisory" as const,
    read: true,
  },
];

export const API_DEMO_ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/field/advisory",
    description: "Get field status and today's advisory",
    response: {
      field_id: "field_punjab_001",
      crop: "Wheat",
      location: "Ludhiana, Punjab",
      soil: { ph: 7.1, nitrogen: "Moderate", phosphorus: "High", potassium: "Moderate", organic_carbon: "Low", moisture_pct: 62 },
      weather: { condition: "Rain Expected", rain_probability_pct: 72, temperature_c: 27 },
      crop_health: { score_pct: 86, ndvi: 0.71, stage: "Tillering", disease_risk: "Moderate" },
      advisory: { title: "Do not irrigate today", confidence_pct: 89, risk_level: "Low" },
    },
  },
  {
    method: "POST",
    path: "/api/v1/disease/diagnose",
    description: "Upload crop image for disease diagnosis",
    response: {
      disease: "Wheat Leaf Rust",
      confidence: 0.91,
      risk: "High",
      symptoms: ["Orange/brown pustules", "Leaf discoloration"],
      recommendation: "Consult district agricultural officer before treatment",
      alternative: "Nutrient deficiency or environmental stress",
    },
  },
  {
    method: "GET",
    path: "/api/v1/soil/analysis",
    description: "Get comprehensive soil health analysis",
    response: {
      field_id: "field_punjab_001",
      ph: 7.1,
      nitrogen: { level: "Moderate", value_kg_ha: 180 },
      phosphorus: { level: "High", value_kg_ha: 28 },
      potassium: { level: "Moderate", value_kg_ha: 145 },
      organic_carbon: { level: "Low", value_pct: 0.42 },
      health_score: 72,
    },
  },
  {
    method: "GET",
    path: "/api/v1/weather/advisory",
    description: "Get weather-based farm action recommendations",
    response: {
      location: "Ludhiana, Punjab",
      rain_probability_pct: 72,
      farm_actions: [
        { trigger: "Rain expected in 24h", recommendation: "Avoid irrigation today", priority: "high" },
      ],
    },
  },
  {
    method: "GET",
    path: "/api/v1/models",
    description: "List available AI models in the Krishi Network",
    response: {
      models: [
        { id: "wheat_disease_v2", name: "Wheat Disease Detection", status: "Available", accuracy: 0.91 },
        { id: "soil_health_v1", name: "Soil Health Recommendation", status: "Available", accuracy: 0.88 },
      ],
    },
  },
];

export const CHAT_SUGGESTIONS = [
  "Should I irrigate my wheat today?",
  "My wheat leaves are turning yellow — what's wrong?",
  "What crop should I plant next season?",
  "How can I improve my soil organic carbon?",
  "When should I apply the next fertilizer dose?",
  "What should I do before the heavy rain tomorrow?",
];

export type RiskLevel = "Low" | "Moderate" | "High";
export type HealthLevel = "healthy" | "stress" | "critical";
export type StateStatus = "Connected" | "Active" | "Pending";
export type ModelStatus = "Available" | "Beta" | "Deprecated";
export type Priority = "high" | "medium" | "low";
export type NutrientLevel = "Low" | "Moderate" | "High";
