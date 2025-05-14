const { ethers } = require('ethers');
const { logger } = require('../utils/logger');

// ABI will be imported from contract artifacts after compilation
const NEWS_CONTRACT_ABI = require('../contracts/artifacts/NewsVerification.json').abi;
const TOKEN_CONTRACT_ABI = require('../contracts/artifacts/TrueToken.json').abi;

let provider;
let newsContract;
let tokenContract;

const setupWeb3 = async () => {
  try {
    // Connect to Ethereum network (update with your preferred network)
    provider = new ethers.JsonRpcProvider(process.env.ETH_NODE_URL);
    
    // Initialize contract instances
    const newsContractAddress = process.env.NEWS_CONTRACT_ADDRESS;
    const tokenContractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
    
    newsContract = new ethers.Contract(
      newsContractAddress,
      NEWS_CONTRACT_ABI,
      provider
    );
    
    tokenContract = new ethers.Contract(
      tokenContractAddress,
      TOKEN_CONTRACT_ABI,
      provider
    );
    
    logger.info('Web3 connection established successfully');
  } catch (error) {
    logger.error('Failed to setup Web3:', error);
    throw error;
  }
};

const getNewsContract = () => {
  if (!newsContract) throw new Error('News contract not initialized');
  return newsContract;
};

const getTokenContract = () => {
  if (!tokenContract) throw new Error('Token contract not initialized');
  return tokenContract;
};

const getProvider = () => {
  if (!provider) throw new Error('Web3 provider not initialized');
  return provider;
};

module.exports = {
  setupWeb3,
  getNewsContract,
  getTokenContract,
  getProvider,
}; 