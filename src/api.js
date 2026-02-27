import axios from 'axios';

// Vite uses import.meta.env for environment variables
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export default API;
