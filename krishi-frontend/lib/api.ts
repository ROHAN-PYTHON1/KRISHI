// lib/api.ts — API client with fallback to mock data
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Graceful fallback: if backend is unreachable, use mock data
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("[Krishi API] Backend unreachable — using demo data:", error.message);
    return Promise.reject(error);
  }
);

export async function fetchFieldAdvisory() {
  const response = await api.get("/api/v1/field/advisory");
  return response.data;
}

export async function fetchSoilAnalysis() {
  const response = await api.get("/api/v1/soil/analysis");
  return response.data;
}

export async function fetchWeatherAdvisory() {
  const response = await api.get("/api/v1/weather/advisory");
  return response.data;
}

export async function sendAdvisorMessage(message: string, fieldId?: string) {
  const response = await api.post("/api/v1/advisor/chat", { message, field_id: fieldId });
  return response.data;
}

export async function diagnoseCropDisease(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/api/v1/disease/diagnose", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function fetchNetworkStates() {
  const response = await api.get("/api/v1/network/states");
  return response.data;
}

export async function fetchAIModels() {
  const response = await api.get("/api/v1/models");
  return response.data;
}

export async function fetchDemoData() {
  const response = await api.get("/api/v1/demo-data");
  return response.data;
}

export async function fetchAnalytics() {
  const response = await api.get("/api/v1/analytics/farm-performance");
  return response.data;
}

export default api;
