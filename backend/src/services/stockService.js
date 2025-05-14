const axios = require('axios');
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Initialize Alpha Vantage client
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

class StockService {
    async extractStockTickers(text) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "Extract stock tickers from the text. Return them as a comma-separated list. Only include valid stock symbols."
                    },
                    {
                        role: "user",
                        content: text
                    }
                ]
            });

            const tickers = completion.choices[0].message.content.split(',').map(t => t.trim());
            return tickers.filter(t => t.length > 0);
        } catch (error) {
            console.error('Error extracting stock tickers:', error);
            throw error;
        }
    }

    async getStockPrediction(ticker) {
        try {
            // Get historical data from Alpha Vantage
            const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
                params: {
                    function: 'TIME_SERIES_DAILY',
                    symbol: ticker,
                    apikey: ALPHA_VANTAGE_API_KEY
                }
            });

            const timeSeries = response.data['Time Series (Daily)'];
            const dates = Object.keys(timeSeries).slice(0, 30); // Last 30 days

            // Prepare data for AI analysis
            const priceData = dates.map(date => ({
                date,
                close: parseFloat(timeSeries[date]['4. close'])
            }));

            // Use OpenAI to analyze the trend
            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "Analyze the stock price trend and provide a prediction for price movement in the next 7 days. Return a JSON object with: predictedChange (percentage), confidence (0-100), analysis (string)"
                    },
                    {
                        role: "user",
                        content: JSON.stringify(priceData)
                    }
                ]
            });

            const prediction = JSON.parse(completion.choices[0].message.content);
            return {
                ticker,
                ...prediction,
                timestamp: Date.now()
            };
        } catch (error) {
            console.error(`Error getting stock prediction for ${ticker}:`, error);
            throw error;
        }
    }

    async analyzeNewsImpact(newsText, stockTickers) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `Analyze the potential impact of this news on the following stocks: ${stockTickers.join(', ')}. 
                                Provide a JSON object with: impactScore (-100 to 100), confidence (0-100), analysis (string)`
                    },
                    {
                        role: "user",
                        content: newsText
                    }
                ]
            });

            return JSON.parse(completion.choices[0].message.content);
        } catch (error) {
            console.error('Error analyzing news impact:', error);
            throw error;
        }
    }

    async getStockSentiment(ticker) {
        try {
            const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
                params: {
                    function: 'NEWS_SENTIMENT',
                    tickers: ticker,
                    apikey: ALPHA_VANTAGE_API_KEY
                }
            });

            return {
                ticker,
                sentiment: response.data.sentiment_score_definition,
                score: response.data.sentiment_score,
                timestamp: Date.now()
            };
        } catch (error) {
            console.error(`Error getting sentiment for ${ticker}:`, error);
            throw error;
        }
    }
}

module.exports = new StockService(); 