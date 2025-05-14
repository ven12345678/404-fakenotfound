const { create } = require('ipfs-http-client');
const { logger } = require('../utils/logger');

let ipfs;

const setupIPFS = async () => {
  try {
    // Connect to IPFS (update with your preferred IPFS node)
    ipfs = create({
      host: process.env.IPFS_HOST || 'ipfs.infura.io',
      port: process.env.IPFS_PORT || 5001,
      protocol: process.env.IPFS_PROTOCOL || 'https',
      headers: {
        authorization: process.env.IPFS_AUTH_HEADER,
      },
    });

    logger.info('IPFS connection established successfully');
  } catch (error) {
    logger.error('Failed to setup IPFS:', error);
    throw error;
  }
};

const getIPFSClient = () => {
  if (!ipfs) throw new Error('IPFS client not initialized');
  return ipfs;
};

// Helper function to upload content to IPFS
const uploadToIPFS = async (content) => {
  try {
    const result = await ipfs.add(JSON.stringify(content));
    return result.path;
  } catch (error) {
    logger.error('Failed to upload to IPFS:', error);
    throw error;
  }
};

// Helper function to retrieve content from IPFS
const getFromIPFS = async (hash) => {
  try {
    const stream = ipfs.cat(hash);
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return JSON.parse(Buffer.concat(chunks).toString());
  } catch (error) {
    logger.error('Failed to get from IPFS:', error);
    throw error;
  }
};

module.exports = {
  setupIPFS,
  getIPFSClient,
  uploadToIPFS,
  getFromIPFS,
}; 