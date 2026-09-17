// Futuretech Innotech (FTIT) API Configuration
// Unified Python FastAPI Backend Service
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/health`,
  products: `${API_BASE_URL}/api/products`,
  productById: (id) => `${API_BASE_URL}/api/products/${encodeURIComponent(id)}`,
  categories: `${API_BASE_URL}/api/categories`,
  company: `${API_BASE_URL}/api/company`,
  rfq: `${API_BASE_URL}/api/rfq`,
  contact: `${API_BASE_URL}/api/contact`,
  recommend: (car, priority = 'all', limit = 4) =>
    `${API_BASE_URL}/api/py/recommend?car=${encodeURIComponent(car)}&priority=${encodeURIComponent(priority)}&limit=${limit}`,
  generatePdf: `${API_BASE_URL}/api/py/generate-rfq-pdf`,
  sync: `${API_BASE_URL}/api/py/sync`,
};
