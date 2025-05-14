import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
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

  useEffect(() => {
    initializeWeb3();
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

        // Initialize contract
        const trueToken = new ethers.Contract(
          config.CONTRACT_ADDRESS,
          TrueTokenABI.abi,
          web3Provider
        );
        setContract(trueToken);

        // Check if already connected
        const accounts = await web3Provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0].address);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error('Failed to initialize web3:', err);
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      const address = await web3Service.connectWallet();
      setAccount(address);
      return address;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(null);
    }
  };

  const value = {
    account,
    contract,
    provider,
    loading,
    error,
    connectWallet,
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