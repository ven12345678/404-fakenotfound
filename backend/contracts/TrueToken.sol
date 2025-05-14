// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TrueToken is ERC20, Ownable, ReentrancyGuard {
    struct News {
        string ipfsHash;
        address submitter;
        uint256 verificationCount;
        bool isVerified;
        mapping(address => bool) hasVerified;
        uint256 timestamp;
        uint256 confidence;
        string[] stockTickers;
        bool isFlagged;
    }

    struct User {
        uint256 level;
        uint256 points;
        uint256 newsVerified;
        bool isRegistered;
        uint256 reputation;
        uint256 successfulPredictions;
    }

    struct StockPrediction {
        string ticker;
        int256 predictedChange;
        uint256 timestamp;
        bool verified;
        uint256 accuracy;
    }

    mapping(bytes32 => News) public news;
    mapping(address => User) public users;
    mapping(address => StockPrediction[]) public userPredictions;
    mapping(string => uint256) public stockTickerVerifications;
    
    uint256 public constant VERIFICATION_THRESHOLD = 5;
    uint256 public constant BASE_REWARD = 10 * 10**18; // 10 TRUE tokens
    uint256 public constant POINTS_PER_LEVEL = 100;
    uint256 public constant REPUTATION_THRESHOLD = 1000;
    
    event NewsSubmitted(bytes32 indexed newsId, string ipfsHash, address submitter, string[] stockTickers);
    event NewsVerified(bytes32 indexed newsId, address verifier, bool verified, uint256 confidence);
    event UserLevelUp(address indexed user, uint256 newLevel);
    event StockPredictionMade(address indexed user, string ticker, int256 predictedChange);
    event NewsFlagged(bytes32 indexed newsId, string reason);

    constructor() ERC20("TRUE Token", "TRUE") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10**18); // Initial supply of 1M tokens
    }

    function submitNews(string memory ipfsHash, string[] memory stockTickers) external nonReentrant {
        require(bytes(ipfsHash).length > 0, "Invalid IPFS hash");
        bytes32 newsId = keccak256(abi.encodePacked(ipfsHash, block.timestamp, msg.sender));
        
        News storage newsItem = news[newsId];
        newsItem.ipfsHash = ipfsHash;
        newsItem.submitter = msg.sender;
        newsItem.timestamp = block.timestamp;
        newsItem.stockTickers = stockTickers;
        
        if (!users[msg.sender].isRegistered) {
            users[msg.sender].isRegistered = true;
            users[msg.sender].level = 1;
        }
        
        // Update stock ticker verification counts
        for(uint i = 0; i < stockTickers.length; i++) {
            stockTickerVerifications[stockTickers[i]]++;
        }
        
        emit NewsSubmitted(newsId, ipfsHash, msg.sender, stockTickers);
    }

    function verifyNews(bytes32 newsId, bool isValid, uint256 aiConfidence) external nonReentrant {
        require(users[msg.sender].isRegistered, "User not registered");
        require(!news[newsId].hasVerified[msg.sender], "Already verified this news");
        require(news[newsId].submitter != msg.sender, "Cannot verify own submission");
        
        News storage newsItem = news[newsId];
        newsItem.hasVerified[msg.sender] = true;
        newsItem.verificationCount++;
        newsItem.confidence = (newsItem.confidence + aiConfidence) / 2;
        
        if (newsItem.verificationCount >= VERIFICATION_THRESHOLD) {
            newsItem.isVerified = true;
            _distributeRewards(newsId);
        }
        
        // Update user stats and reputation
        users[msg.sender].newsVerified++;
        users[msg.sender].points += 10;
        users[msg.sender].reputation += 5;
        _checkAndUpdateLevel(msg.sender);
        
        emit NewsVerified(newsId, msg.sender, isValid, aiConfidence);
    }

    function flagNews(bytes32 newsId, string memory reason) external {
        require(users[msg.sender].reputation >= REPUTATION_THRESHOLD, "Insufficient reputation to flag");
        News storage newsItem = news[newsId];
        newsItem.isFlagged = true;
        emit NewsFlagged(newsId, reason);
    }

    function submitStockPrediction(string memory ticker, int256 predictedChange) external {
        require(users[msg.sender].isRegistered, "User not registered");
        StockPrediction memory prediction = StockPrediction({
            ticker: ticker,
            predictedChange: predictedChange,
            timestamp: block.timestamp,
            verified: false,
            accuracy: 0
        });
        userPredictions[msg.sender].push(prediction);
        emit StockPredictionMade(msg.sender, ticker, predictedChange);
    }

    function _distributeRewards(bytes32 newsId) internal {
        News storage newsItem = news[newsId];
        uint256 reward = BASE_REWARD;
        
        // Reward submitter
        _mint(newsItem.submitter, reward);
        users[newsItem.submitter].reputation += 10;
        
        // Reward verifiers based on their level and reputation
        uint256 verifierReward = reward / 2 / newsItem.verificationCount;
        // Implementation for verifier rewards would go here
    }

    function _checkAndUpdateLevel(address user) internal {
        uint256 currentPoints = users[user].points;
        uint256 newLevel = (currentPoints / POINTS_PER_LEVEL) + 1;
        
        if (newLevel > users[user].level) {
            users[user].level = newLevel;
            emit UserLevelUp(user, newLevel);
            
            // Mint bonus tokens for level up
            _mint(user, BASE_REWARD * (newLevel - users[user].level));
        }
    }

    function getUserStats(address user) external view returns (
        uint256 level,
        uint256 points,
        uint256 newsVerified,
        uint256 reputation,
        uint256 successfulPredictions
    ) {
        User memory userStats = users[user];
        return (
            userStats.level,
            userStats.points,
            userStats.newsVerified,
            userStats.reputation,
            userStats.successfulPredictions
        );
    }

    function getStockPredictions(address user) external view returns (StockPrediction[] memory) {
        return userPredictions[user];
    }
} 