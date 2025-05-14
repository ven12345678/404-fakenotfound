require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { ethers } = require('ethers');
const { Web3Storage } = require('web3.storage');
const OpenAI = require('openai');
const winston = require('winston');
const jwt = require('jsonwebtoken');
const stockService = require('./services/stockService');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Initialize Web3Storage client
const web3Storage = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Blockchain connection
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractABI = require('../artifacts/contracts/TrueToken.sol/TrueToken.json').abi;
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// AI-powered news verification
async function analyzeNewsWithAI(newsText) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a fact-checking AI. Analyze the following news for potential misinformation and provide a confidence score between 0 and 100."
        },
        {
          role: "user",
          content: newsText
        }
      ]
    });

    const analysis = completion.choices[0].message.content;
    const confidenceScore = parseInt(analysis.match(/\d+/)[0]);
    return {
      isValid: confidenceScore > 70,
      confidence: confidenceScore,
      analysis
    };
  } catch (error) {
    logger.error('Error analyzing news with AI:', error);
    throw error;
  }
}

// API Endpoints

// Submit news for verification
app.post('/api/news', verifyToken, async (req, res) => {
  try {
    const { newsText, title } = req.body;
    
    // Extract stock tickers
    const stockTickers = await stockService.extractStockTickers(newsText);
    
    // Analyze news with AI
    const aiAnalysis = await analyzeNewsWithAI(newsText);
    
    // Get stock impact analysis if tickers found
    let stockImpact = null;
    if (stockTickers.length > 0) {
      stockImpact = await stockService.analyzeNewsImpact(newsText, stockTickers);
    }
    
    // Store news content on IPFS
    const newsObject = {
      title,
      content: newsText,
      timestamp: Date.now(),
      author: req.user.address,
      aiAnalysis,
      stockTickers,
      stockImpact
    };
    
    const blob = new Blob([JSON.stringify(newsObject)], { type: 'application/json' });
    const files = [new File([blob], 'news.json')];
    const cid = await web3Storage.put(files);
    
    // Submit to blockchain
    const tx = await contract.submitNews(cid, stockTickers);
    await tx.wait();
    
    res.json({
      success: true,
      cid,
      aiAnalysis,
      stockTickers,
      stockImpact,
      transactionHash: tx.hash
    });
  } catch (error) {
    logger.error('Error submitting news:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify news
app.post('/api/news/:newsId/verify', verifyToken, async (req, res) => {
  try {
    const { newsId } = req.params;
    const { isValid, aiConfidence } = req.body;
    
    const tx = await contract.verifyNews(newsId, isValid, aiConfidence);
    await tx.wait();
    
    res.json({
      success: true,
      transactionHash: tx.hash
    });
  } catch (error) {
    logger.error('Error verifying news:', error);
    res.status(500).json({ error: error.message });
  }
});

// Flag news as suspicious
app.post('/api/news/:newsId/flag', verifyToken, async (req, res) => {
  try {
    const { newsId } = req.params;
    const { reason } = req.body;
    
    const tx = await contract.flagNews(newsId, reason);
    await tx.wait();
    
    res.json({
      success: true,
      transactionHash: tx.hash
    });
  } catch (error) {
    logger.error('Error flagging news:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get stock predictions
app.get('/api/stocks/:ticker/prediction', async (req, res) => {
  try {
    const { ticker } = req.params;
    const prediction = await stockService.getStockPrediction(ticker);
    res.json(prediction);
  } catch (error) {
    logger.error('Error getting stock prediction:', error);
    res.status(500).json({ error: error.message });
  }
});

// Submit stock prediction
app.post('/api/stocks/predictions', verifyToken, async (req, res) => {
  try {
    const { ticker, predictedChange } = req.body;
    
    const tx = await contract.submitStockPrediction(ticker, predictedChange);
    await tx.wait();
    
    res.json({
      success: true,
      transactionHash: tx.hash
    });
  } catch (error) {
    logger.error('Error submitting stock prediction:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user stats
app.get('/api/users/:address/stats', async (req, res) => {
  try {
    const { address } = req.params;
    const stats = await contract.getUserStats(address);
    
    res.json({
      level: stats[0].toString(),
      points: stats[1].toString(),
      newsVerified: stats[2].toString(),
      reputation: stats[3].toString(),
      successfulPredictions: stats[4].toString()
    });
  } catch (error) {
    logger.error('Error fetching user stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user's stock predictions
app.get('/api/users/:address/predictions', async (req, res) => {
  try {
    const { address } = req.params;
    const predictions = await contract.getStockPredictions(address);
    res.json(predictions);
  } catch (error) {
    logger.error('Error fetching user predictions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
}); 