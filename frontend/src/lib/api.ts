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
  // Prediction endpoints
  predict: '/api/predict',
  uploadData: '/api/upload',
  getModels: '/api/models',
  
  // User data endpoints
  getUserData: '/api/user/data',
  saveUserData: '/api/user/data',
  
  // Predictions history
  getPredictions: '/api/predictions',
}

export default api
