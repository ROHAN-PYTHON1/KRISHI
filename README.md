# 🌾 Krishi — Intelligence for Every Field

> AI-powered agricultural intelligence platform combining satellite data, soil health, weather forecasting and crop diagnostics to help Indian farmers make smarter, climate-resilient decisions.

---

## 🚀 Quick Start (Local Demo)

### Frontend (Next.js)

```bash
cd krishi-frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend (FastAPI)

```bash
cd krishi-backend

# Create virtual environment (first time only)
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn main:app --reload --port 8000
```

API docs available at [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🏗️ Project Structure

```
Agricultural/
├── krishi-frontend/          # Next.js 14 + Tailwind CSS
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Design system styles
│   │   └── (dashboard)/       # Dashboard route group
│   │       ├── layout.tsx     # Sidebar + TopBar layout
│   │       ├── dashboard/     # Main dashboard
│   │       ├── field/         # Field Intelligence + Leaflet map
│   │       ├── soil/          # Soil Health
│   │       ├── weather/       # Weather Intelligence
│   │       ├── advisor/       # AI Farm Advisor (chat)
│   │       ├── crop-doctor/   # Crop Disease Diagnosis
│   │       ├── regenerative/  # Regenerative Farming Planner
│   │       ├── analytics/     # Farm Analytics
│   │       ├── network/       # Krishi Network + API Demo
│   │       └── settings/      # Farmer Profile + Settings
│   ├── components/
│   │   ├── layout/            # Sidebar, TopBar, DemoModeBanner
│   │   ├── field/             # Leaflet map component
│   │   ├── providers/         # DemoModeProvider context
│   │   └── ui/                # Reusable UI components
│   └── lib/
│       ├── mockData.ts        # All demo data (Punjab wheat farm)
│       └── api.ts             # API client with fallback
│
└── krishi-backend/            # Python FastAPI
    ├── main.py                # App entry point + CORS
    ├── routers/               # API route handlers
    │   ├── field.py           # Field data + advisory
    │   ├── soil.py            # Soil analysis
    │   ├── weather.py         # Weather + farm actions
    │   ├── advisor.py         # AI chat endpoint
    │   ├── disease.py         # Crop disease diagnosis
    │   ├── network.py         # State network + AI models
    │   └── analytics.py       # Farm analytics
    ├── services/
    │   ├── ai_service.py      # Modular AI layer (mock + real LLM ready)
    │   └── mock_data_service.py # All demo data
    └── requirements.txt
```

---

## 🌍 Environment Variables

### Frontend (`krishi-frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (`krishi-backend/.env`)

```env
PORT=8000
HOST=0.0.0.0

# Optional: plug in a real LLM for live AI responses
# GEMINI_API_KEY=your_key_here
# OPENAI_API_KEY=your_key_here

# Optional: PostgreSQL (in-memory demo data used if not set)
# DATABASE_URL=postgresql://user:password@localhost:5432/krishi

ALLOWED_ORIGINS=http://localhost:3000
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API status |
| `GET` | `/health` | Health check |
| `GET` | `/api/v1/demo-data` | Complete farm demo data |
| `GET` | `/api/v1/field/advisory` | Field status + advisory |
| `GET` | `/api/v1/soil/analysis` | Soil health analysis |
| `GET` | `/api/v1/weather/advisory` | Weather + farm actions |
| `POST` | `/api/v1/advisor/chat` | AI farm advisor chat |
| `POST` | `/api/v1/disease/diagnose` | Crop disease diagnosis |
| `GET` | `/api/v1/network/states` | State network data |
| `GET` | `/api/v1/models` | Available AI models |
| `GET` | `/api/v1/analytics/farm-performance` | Farm analytics |

Interactive API docs: `http://localhost:8000/docs`

---

## 🎯 Demo Flow (Hackathon Presentation)

1. **Landing Page** → `localhost:3000` — hero, problem/solution
2. **Explore Krishi** → Dashboard loads Punjab wheat farm
3. **Field Intelligence** → Map with NDVI zones, 30-day chart
4. **Soil Health** → NPK cards, circular score 72/100, recommendations
5. **Weather** → 7-day forecast + farm actions (avoid irrigation)
6. **AI Farm Advisor** → Type "Should I irrigate today?" → structured AI response
7. **Crop Doctor** → Upload any leaf photo → mock diagnosis demo
8. **Regenerative Farming** → 3-year soil improvement plan
9. **Analytics** → Radar chart, performance score
10. **Krishi Network** → State cards, API endpoints, interoperability demo

---

## 🤖 AI Architecture

```
Farmer Data (crop, soil, weather, field)
           ↓
    Data Fusion Layer
           ↓
Agricultural Knowledge Layer
           ↓
    AI Reasoning Layer (KrishiAIService)
           ↓
      Advisory Engine
           ↓
    Farmer (structured: recommendation + why + risk + confidence + next step)
```

The `KrishiAIService` in `services/ai_service.py` uses **intent-based mock responses** by default. To connect a real LLM:
1. Set `GEMINI_API_KEY` or `OPENAI_API_KEY` in `.env`
2. Modify the `get_response()` method to call the LLM API with the farm context prompt

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Green | `#16803A` |
| Dark Green | `#0B4F2F` |
| Light Green BG | `#f0fdf4` |
| Earth Accent | `#92400e` |
| Weather Blue | `#0ea5e9` |
| Risk Red | `#dc2626` |
| Warning Orange | `#d97706` |

---

## 📊 Demo Data — Punjab Wheat Farm

All values are internally consistent throughout the application:

| Parameter | Value |
|-----------|-------|
| Farmer | Rajesh Kumar |
| Location | Ludhiana, Punjab |
| Crop | Wheat (HD-3226) |
| Area | 2.5 acres |
| Growth Stage | Tillering |
| NDVI | 0.71 |
| Soil Moisture | 62% |
| Crop Health | 86% |
| Soil pH | 7.1 |
| Nitrogen | Moderate (180 kg/ha) |
| Phosphorus | High (28 kg/ha) |
| Potassium | Moderate (145 kg/ha) |
| Organic Carbon | Low (0.42%) |
| Temperature | 27°C |
| Humidity | 64% |
| Rain Probability | 72% |
| Disease Risk | Moderate |
| Soil Health Score | 72/100 |

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS v4 |
| Charts | Recharts |
| Maps | Leaflet + OpenStreetMap (no API key needed) |
| Backend | Python FastAPI |
| AI Layer | Mock intent engine (LLM-ready) |
| Database | In-memory mock data (PostgreSQL-ready) |

---

## ⚠️ Mock vs Real Data

| Feature | Current | Real Integration Point |
|---------|---------|----------------------|
| Maps | OpenStreetMap (free) | Mapbox / Google Maps |
| NDVI | Mock values | Sentinel-2 satellite API |
| Weather | Mock forecast | IMD / OpenWeatherMap API |
| AI Advisor | Intent-based mock | Gemini / GPT-4 |
| Disease Diagnosis | Mock result | Custom CV model / Google Vision |
| Soil Data | Mock readings | IoT soil sensors |

All mock data is clearly labeled in the UI with **"Demo Data"** indicators.

---

## 🏛️ Krishi as Digital Public Infrastructure

Krishi is designed as **interoperable DPI** — states don't need to rebuild:

```
State Data → Krishi API → AI Model → Local Advisory
```

Any state agriculture department can:
- Connect via standardized REST APIs
- Share AI models through the Krishi Network
- Access advisory intelligence without rebuilding the platform

---

*Built for hackathon demonstration. All data is simulated. Krishi is not affiliated with any government body.*
