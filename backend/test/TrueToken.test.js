const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TrueToken", function () {
  let TrueToken;
  let trueToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    TrueToken = await ethers.getContractFactory("TrueToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new TrueToken contract before each test
    trueToken = await TrueToken.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await trueToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await trueToken.balanceOf(owner.address);
      expect(await trueToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("News Submission and Verification", function () {
    const ipfsHash = "QmTest123";
    const stockTickers = ["AAPL", "GOOGL"];

    it("Should allow users to submit news", async function () {
      await expect(trueToken.connect(addr1).submitNews(ipfsHash, stockTickers))
        .to.emit(trueToken, "NewsSubmitted")
        .withArgs(expect.any(String), ipfsHash, addr1.address, stockTickers);
    });

    it("Should not allow empty IPFS hash", async function () {
      await expect(trueToken.connect(addr1).submitNews("", stockTickers))
        .to.be.revertedWith("Invalid IPFS hash");
    });

    it("Should allow news verification", async function () {
      // First submit news
      await trueToken.connect(addr1).submitNews(ipfsHash, stockTickers);
      const newsId = ethers.keccak256(
        ethers.solidityPacked(
          ["string", "uint256", "address"],
          [ipfsHash, await ethers.provider.getBlock("latest").then(b => b.timestamp), addr1.address]
        )
      );

      // Then verify it
      await expect(trueToken.connect(addr2).verifyNews(newsId, true, 80))
        .to.emit(trueToken, "NewsVerified");
    });

    it("Should not allow self-verification", async function () {
      await trueToken.connect(addr1).submitNews(ipfsHash, stockTickers);
      const newsId = ethers.keccak256(
        ethers.solidityPacked(
          ["string", "uint256", "address"],
          [ipfsHash, await ethers.provider.getBlock("latest").then(b => b.timestamp), addr1.address]
        )
      );

      await expect(trueToken.connect(addr1).verifyNews(newsId, true, 80))
        .to.be.revertedWith("Cannot verify own submission");
    });
  });

  describe("Stock Predictions", function () {
    it("Should allow users to submit stock predictions", async function () {
      const ticker = "AAPL";
      const predictedChange = 500; // 5% change

      await expect(trueToken.connect(addr1).submitStockPrediction(ticker, predictedChange))
        .to.emit(trueToken, "StockPredictionMade")
        .withArgs(addr1.address, ticker, predictedChange);
    });

    it("Should store user predictions correctly", async function () {
      const ticker = "AAPL";
      const predictedChange = 500;

      await trueToken.connect(addr1).submitStockPrediction(ticker, predictedChange);
      const predictions = await trueToken.getStockPredictions(addr1.address);
      
      expect(predictions[0].ticker).to.equal(ticker);
      expect(predictions[0].predictedChange).to.equal(predictedChange);
    });
  });

  describe("User Stats and Leveling", function () {
    it("Should track user stats correctly", async function () {
      const ipfsHash = "QmTest123";
      const stockTickers = ["AAPL"];

      // Submit news
      await trueToken.connect(addr1).submitNews(ipfsHash, stockTickers);
      
      // Get user stats
      const stats = await trueToken.getUserStats(addr1.address);
      expect(stats.level).to.equal(1); // Initial level
      expect(stats.newsVerified).to.equal(0);
      expect(stats.isRegistered).to.be.true;
    });

    it("Should level up users correctly", async function () {
      const ipfsHash = "QmTest123";
      const stockTickers = ["AAPL"];

      // Submit multiple news and verifications to accumulate points
      for(let i = 0; i < 10; i++) {
        await trueToken.connect(addr1).submitNews(`${ipfsHash}${i}`, stockTickers);
        const newsId = ethers.keccak256(
          ethers.solidityPacked(
            ["string", "uint256", "address"],
            [`${ipfsHash}${i}`, await ethers.provider.getBlock("latest").then(b => b.timestamp), addr1.address]
          )
        );
        await trueToken.connect(addr2).verifyNews(newsId, true, 80);
      }

      const stats = await trueToken.getUserStats(addr2.address);
      expect(stats.level).to.be.above(1); // Should have leveled up
    });
  });

  describe("News Flagging", function () {
    it("Should allow high reputation users to flag news", async function () {
      const ipfsHash = "QmTest123";
      const stockTickers = ["AAPL"];
      const reason = "Suspicious content";

      // First, we need to give the user enough reputation
      // This would normally happen through participation
      // For testing, we'll submit and verify multiple news
      for(let i = 0; i < 20; i++) {
        await trueToken.connect(addr1).submitNews(`${ipfsHash}${i}`, stockTickers);
        const newsId = ethers.keccak256(
          ethers.solidityPacked(
            ["string", "uint256", "address"],
            [`${ipfsHash}${i}`, await ethers.provider.getBlock("latest").then(b => b.timestamp), addr1.address]
          )
        );
        await trueToken.connect(addr2).verifyNews(newsId, true, 80);
      }

      // Submit news to flag
      await trueToken.connect(addr1).submitNews(ipfsHash, stockTickers);
      const newsId = ethers.keccak256(
        ethers.solidityPacked(
          ["string", "uint256", "address"],
          [ipfsHash, await ethers.provider.getBlock("latest").then(b => b.timestamp), addr1.address]
        )
      );

      // Flag the news
      await expect(trueToken.connect(addr2).flagNews(newsId, reason))
        .to.emit(trueToken, "NewsFlagged")
        .withArgs(newsId, reason);
    });
  });
}); 