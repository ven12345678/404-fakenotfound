const express = require('express');
const router = express.Router();
const { getNewsContract, getTokenContract } = require('../config/web3');
const { uploadToIPFS } = require('../config/ipfs');
const { logger } = require('../utils/logger');
const { detectFakeNews } = require('../services/ai.service');
const { extractStockInfo } = require('../services/stock.service');

// Submit news for verification
router.post('/submit', async (req, res) => {
  try {
    const { newsContent, source, timestamp } = req.body;
    
    // Run AI verification
    const aiResult = await detectFakeNews(newsContent);
    
    // Extract and analyze stock information
    const stockInfo = await extractStockInfo(newsContent);
    
    // Store data in IPFS
    const ipfsData = {
      newsContent,
      source,
      timestamp,
      aiVerification: aiResult,
      stockAnalysis: stockInfo
    };
    
    const ipfsHash = await uploadToIPFS(ipfsData);
    
    // Store verification on blockchain
    const newsContract = getNewsContract();
    const tx = await newsContract.submitNews(ipfsHash, aiResult.score);
    await tx.wait();
    
    res.json({
      success: true,
      ipfsHash,
      aiScore: aiResult.score,
      stockInfo,
      transactionHash: tx.hash
    });
  } catch (error) {
    logger.error('Error in news verification:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Verify news (by community)
router.post('/verify/:newsId', async (req, res) => {
  try {
    const { newsId } = req.params;
    const { verdict, evidence } = req.body;
    const { address } = req.user; // Assuming auth middleware sets this
    
    const newsContract = getNewsContract();
    const tokenContract = getTokenContract();
    
    // Submit verification
    const tx = await newsContract.verifyNews(newsId, verdict, evidence);
    await tx.wait();
    
    // Calculate and distribute rewards
    const rewardTx = await tokenContract.distributeReward(address);
    await rewardTx.wait();
    
    res.json({
      success: true,
      transactionHash: tx.hash,
      rewardTransactionHash: rewardTx.hash
    });
  } catch (error) {
    logger.error('Error in community verification:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Get verification status
router.get('/status/:newsId', async (req, res) => {
  try {
    const { newsId } = req.params;
    const newsContract = getNewsContract();
    
    const status = await newsContract.getNewsStatus(newsId);
    const verifications = await newsContract.getVerifications(newsId);
    
    res.json({
      status,
      verifications
    });
  } catch (error) {
    logger.error('Error fetching verification status:', error);
    res.status(500).json({ error: 'Failed to fetch status' });
  }
});

module.exports = router; 