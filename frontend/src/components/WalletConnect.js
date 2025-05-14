import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnect = () => {
  const { account, loading, error, walletType } = useWeb3();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (account) {
    return (
      <div className="wallet-info">
        <p>Connected with {walletType === 'solana' ? 'Phantom' : 'MetaMask'}</p>
        <p>Address: {account.slice(0, 6)}...{account.slice(-4)}</p>
      </div>
    );
  }

  return (
    <div className="wallet-connect">
      <ConnectButton />
      <WalletMultiButton />
      <style jsx>{`
        .wallet-connect {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 300px;
          margin: 0 auto;
        }
        
        .wallet-info {
          text-align: center;
          padding: 20px;
          border-radius: 8px;
          background-color: #f5f5f5;
        }

        :global(.wallet-adapter-button) {
          background-color: #4c44c6;
        }

        :global(.wallet-adapter-button:hover) {
          background-color: #3832a8;
        }
      `}</style>
    </div>
  );
};

export default WalletConnect; 