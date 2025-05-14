import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { config } from '../config/config';
import { web3Service } from '../services/api';
import TrueTokenABI from '../../../backend/artifacts/contracts/TrueToken.sol/TrueToken.json';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletType, setWalletType] = useState(null); // 'ethereum' or 'solana'
  const [solanaConnection, setSolanaConnection] = useState(null);

  useEffect(() => {
    // Initialize Solana connection
    const connection = new Connection(clusterApiUrl('devnet'));
    setSolanaConnection(connection);

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const initializeWeb3 = async () => {
    try {
      setLoading(true);
      if (window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);

        const trueToken = new ethers.Contract(
          config.CONTRACT_ADDRESS,
          TrueTokenABI.abi,
          web3Provider
        );
        setContract(trueToken);

        const accounts = await web3Provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0].address);
          setWalletType('ethereum');
        }
      }
    } catch (err) {
      setError(err.message);
      console.error('Failed to initialize web3:', err);
    } finally {
      setLoading(false);
    }
  };

  const connectEthereumWallet = async () => {
    try {
      setLoading(true);
      const address = await web3Service.connectWallet();
      setAccount(address);
      setWalletType('ethereum');
      return address;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const connectSolanaWallet = async () => {
    try {
      setLoading(true);
      
      // Check if Phantom is installed
      const { solana } = window;
      if (!solana?.isPhantom) {
        throw new Error('Phantom wallet is not installed');
      }

      // Connect to Phantom
      const response = await solana.connect();
      const address = response.publicKey.toString();
      setAccount(address);
      setWalletType('solana');
      return address;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async (type = 'ethereum') => {
    if (type === 'solana') {
      return connectSolanaWallet();
    } else {
      return connectEthereumWallet();
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(null);
      setWalletType(null);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setWalletType(null);
  };

  const value = {
    account,
    contract,
    provider,
    loading,
    error,
    connectWallet,
    disconnectWallet,
    walletType,
    solanaConnection,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}; 