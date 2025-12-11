import axios from 'axios';

// URL de l'API - à adapter selon l'environnement
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour logger les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ============================================
// CATEGORIES
// ============================================

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

// ============================================
// ARTISANS
// ============================================

export const getArtisans = async () => {
  const response = await api.get('/artisans');
  return response.data;
};

export const getArtisanById = async (id) => {
  const response = await api.get(`/artisans/${id}`);
  return response.data;
};

export const getTopArtisans = async () => {
  const response = await api.get('/artisans/top');
  return response.data;
};

export const getArtisansByCategory = async (categoryId) => {
  const response = await api.get(`/artisans/category/${categoryId}`);
  return response.data;
};

export const searchArtisans = async (query) => {
  const response = await api.get(`/artisans/search`, {
    params: { q: query }
  });
  return response.data;
};

export default api;