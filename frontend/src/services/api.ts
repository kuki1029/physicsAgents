import axios from 'axios';
import { BASE_URL } from '@/config';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add token to headers
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => Promise.reject(error));

export default axiosInstance;

export const WS_URL = import.meta.env.MODE === 'production' ? `wss://${BASE_URL}/api/ws/chat` : `ws://${BASE_URL}/ws/chat`;
