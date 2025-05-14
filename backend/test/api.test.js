const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');

// Mock dependencies
jest.mock('web3.storage');
jest.mock('openai');
jest.mock('axios');

const app = require('../src/index');

describe('Backend API Tests', () => {
  let authToken;
  let testWallet;

  beforeAll(() => {
    // Create a test wallet
    testWallet = ethers.Wallet.createRandom();
    
    // Create a test JWT token
    authToken = jwt.sign(
      { address: testWallet.address },
      process.env.JWT_SECRET || 'test-secret'
    );
  });

  describe('News Endpoints', () => {
    const testNews = {
      title: 'Test News',
      newsText: 'Apple and Google stock prices are rising.'
    };

    test('POST /api/news - Should submit news successfully', async () => {
      const response = await request(app)
        .post('/api/news')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testNews);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('cid');
      expect(response.body).to.have.property('aiAnalysis');
      expect(response.body).to.have.property('stockTickers');
    });

    test('POST /api/news - Should fail without auth token', async () => {
      const response = await request(app)
        .post('/api/news')
        .send(testNews);

      expect(response.status).to.equal(401);
    });
  });

  describe('Stock Endpoints', () => {
    test('GET /api/stocks/:ticker/prediction - Should get stock prediction', async () => {
      const response = await request(app)
        .get('/api/stocks/AAPL/prediction');

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('ticker', 'AAPL');
      expect(response.body).to.have.property('predictedChange');
      expect(response.body).to.have.property('confidence');
    });

    test('POST /api/stocks/predictions - Should submit stock prediction', async () => {
      const prediction = {
        ticker: 'AAPL',
        predictedChange: 5.0
      };

      const response = await request(app)
        .post('/api/stocks/predictions')
        .set('Authorization', `Bearer ${authToken}`)
        .send(prediction);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('transactionHash');
    });
  });

  describe('User Endpoints', () => {
    test('GET /api/users/:address/stats - Should get user stats', async () => {
      const response = await request(app)
        .get(`/api/users/${testWallet.address}/stats`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('level');
      expect(response.body).to.have.property('points');
      expect(response.body).to.have.property('newsVerified');
      expect(response.body).to.have.property('reputation');
    });

    test('GET /api/users/:address/predictions - Should get user predictions', async () => {
      const response = await request(app)
        .get(`/api/users/${testWallet.address}/predictions`);

      expect(response.status).to.equal(200);
      expect(Array.isArray(response.body)).to.be.true;
    });
  });
});

// Mock implementations
jest.mock('../src/services/stockService', () => ({
  extractStockTickers: jest.fn().mockResolvedValue(['AAPL', 'GOOGL']),
  getStockPrediction: jest.fn().mockResolvedValue({
    ticker: 'AAPL',
    predictedChange: 5.0,
    confidence: 80,
    analysis: 'Bullish trend'
  }),
  analyzeNewsImpact: jest.fn().mockResolvedValue({
    impactScore: 75,
    confidence: 85,
    analysis: 'Positive impact expected'
  }),
  getStockSentiment: jest.fn().mockResolvedValue({
    ticker: 'AAPL',
    sentiment: 'Positive',
    score: 0.8
  })
}));

jest.mock('web3.storage', () => ({
  Web3Storage: jest.fn().mockImplementation(() => ({
    put: jest.fn().mockResolvedValue('QmTestHash123')
  }))
}));

jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{
            message: {
              content: 'Analysis: This news appears to be legitimate. Confidence: 85'
            }
          }]
        })
      }
    }
  }))
})); 