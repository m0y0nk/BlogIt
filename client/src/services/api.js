// File: client/src/services/api.js
// This file is crucial for clean data flow.
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/*
  This is the magic! We use an interceptor to automatically add the
  'Authorization' header to every request if a token exists in
  localStorage. This keeps our components clean and free from
  auth logic.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;