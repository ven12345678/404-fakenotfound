import axios from 'axios';
import { config, API_ENDPOINTS } from '../config/config';

const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const newsService = {
  submitNews: async (newsData) => {
    const response = await api.post(API_ENDPOINTS.submitNews, newsData);
    return response.data;
  },

  verifyNews: async (newsId, verificationData) => {
    const response = await api.post(API_ENDPOINTS.verifyNews(newsId), verificationData);
    return response.data;
  },

  flagNews: async (newsId, reason) => {
    const response = await api.post(API_ENDPOINTS.flagNews(newsId), { reason });
    return response.data;
  },
};

export const stockService = {
  getPrediction: async (ticker) => {
    const response = await api.get(API_ENDPOINTS.getStockPrediction(ticker));
    return response.data;
  },

  submitPrediction: async (predictionData) => {
    const response = await api.post(API_ENDPOINTS.submitPrediction, predictionData);
    return response.data;
  },
};

export const userService = {
  getStats: async (address) => {
    const response = await api.get(API_ENDPOINTS.getUserStats(address));
    return response.data;
  },

  getPredictions: async (address) => {
    const response = await api.get(API_ENDPOINTS.getUserPredictions(address));
    return response.data;
  },
};

export const web3Service = {
  connectWallet: async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      // Get the connected chain ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      // Check if we're on Sepolia testnet (chain ID 0xaa36a7)
      if (chainId !== '0xaa36a7') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
          });
        } catch (error) {
          // If the chain is not added, add it
          if (error.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0xaa36a7',
                chainName: 'Sepolia Testnet',
                nativeCurrency: {
                  name: 'Sepolia ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: [config.SEPOLIA_URL],
                blockExplorerUrls: ['https://sepolia.etherscan.io']
              }]
            });
          }
        }
      }

      return accounts[0];
    } catch (error) {
      throw new Error('Failed to connect wallet: ' + error.message);
    }
  },
}; 