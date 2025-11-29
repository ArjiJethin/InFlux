import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// API endpoints
export const endpoints = {
  // ML Backend endpoints (REAL DATA)
  dashboard: '/api/dashboard',
  devices: '/api/devices',
  forecast: '/api/forecast',
  appliances: '/api/appliances',
  
  // Legacy endpoints
  predict: '/api/predict',
  uploadData: '/api/upload',
  getModels: '/api/models',
  getUserData: '/api/user/data',
  saveUserData: '/api/user/data',
  getPredictions: '/api/predictions',
}

// Fetch functions for each page
export const fetchDashboardData = async () => {
  const response = await api.get(endpoints.dashboard)
  return response.data
}

export const fetchForecastData = async () => {
  const response = await api.get(endpoints.forecast)
  return response.data
}

export const fetchAppliancesData = async () => {
  const response = await api.get(endpoints.appliances)
  return response.data
}

export const fetchDevicesData = async () => {
  const response = await api.get(endpoints.devices)
  return response.data
}

export default api
