import axios from 'axios';

// URL de l'API backend
const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const httpClient = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Gestion des erreurs HTTP
httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('Erreur API:', err.response?.data || err.message);
    return Promise.reject(err);
  }
);

// ============================================
// CATEGORIES
// ============================================

export const fetchCategories = async () => {
  const result = await httpClient.get('/categories');
  return result.data;
};

export const fetchCategoryDetails = async (id) => {
  const result = await httpClient.get(`/categories/${id}`);
  return result.data;
};

// ============================================
// ARTISANS
// ============================================

export const fetchArtisansList = async () => {
  const result = await httpClient.get('/artisans');
  return result.data;
};

export const fetchArtisanDetails = async (id) => {
  const result = await httpClient.get(`/artisans/${id}`);
  return result.data;
};

export const fetchTopArtisans = async () => {
  const result = await httpClient.get('/artisans/top');
  return result.data;
};

export const fetchArtisansByCategory = async (categoryId) => {
  const result = await httpClient.get(`/artisans/category/${categoryId}`);
  return result.data;
};

export const searchArtisansByKeyword = async (searchQuery) => {
  const result = await httpClient.get(`/artisans/search`, {
    params: { q: searchQuery }
  });
  return result.data;
};

export default httpClient;