import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verifyToken: () => api.get('/auth/verify')
};

export const userAPI = {
  updateProfile: (data) => api.put('/users/profile', data),
  getProfile: () => api.get('/users/profile')
};

export const habitAPI = {
  getHabits: () => api.get('/habits'),
  createHabit: (data) => api.post('/habits', data),
  updateHabit: (id, data) => api.put(`/habits/${id}`, data),
  deleteHabit: (id) => api.delete(`/habits/${id}`),
  logProgress: (id, data) => api.post(`/habits/${id}/progress`, data)
};

export const moodAPI = {
  getMoodEntries: () => api.get('/moods'),
  createMoodEntry: (data) => api.post('/moods', data),
  getMoodStats: () => api.get('/moods/stats')
};

export const aiAPI = {
  getRecommendations: () => api.get('/ai/recommendations'),
  getInsights: () => api.get('/ai/insights')
};

export default api;
