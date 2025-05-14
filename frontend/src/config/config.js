export const config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  SEPOLIA_URL: process.env.NEXT_PUBLIC_SEPOLIA_URL,
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
};

export const API_ENDPOINTS = {
  // News endpoints
  submitNews: '/api/news',
  verifyNews: (newsId) => `/api/news/${newsId}/verify`,
  flagNews: (newsId) => `/api/news/${newsId}/flag`,
  
  // Stock endpoints
  getStockPrediction: (ticker) => `/api/stocks/${ticker}/prediction`,
  submitPrediction: '/api/stocks/predictions',
  
  // User endpoints
  getUserStats: (address) => `/api/users/${address}/stats`,
  getUserPredictions: (address) => `/api/users/${address}/predictions`,
}; 