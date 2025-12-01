import React, { useState, useEffect } from 'react';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import './WalletConnect.css';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [balance, setBalance] = useState(0);
  const [connection] = useState(new Connection('https://api.mainnet-beta.solana.com'));

  // Balance abrufen wenn verbunden ist
  useEffect(() => {
    if (isConnected && walletAddress) {
      getBalance();
    }
  }, [isConnected, walletAddress]);

  const getBalance = async () => {
    try {
      const publicKey = new PublicKey(walletAddress);
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
      setBalance(balanceInSOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const connectPhantom = async () => {
    try {
      if (window?.solana?.isPhantom) {
        const response = await window.solana.connect();
        const address = response.publicKey.toString();
        setWalletAddress(address);
        setIsConnected(true);
        setShowMenu(false);
        
        // Balance sofort abrufen
        const publicKey = new PublicKey(address);
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
        setBalance(balanceInSOL);
        
      } else {
        alert('Phantom Wallet nicht gefunden!');
        window.open('https://phantom.app/', '_blank');
      }
    } catch (error) {
      console.error('Phantom connection error:', error);
    }
  };

  const connectSolflare = async () => {
    try {
      if (window?.solflare?.isSolflare) {
        await window.solflare.connect();
        const address = window.solflare.publicKey.toString();
        setWalletAddress(address);
        setIsConnected(true);
        setShowMenu(false);
        
        // Balance für Solflare
        const publicKey = new PublicKey(address);
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
        setBalance(balanceInSOL);
      } else {
        alert('Solflare Wallet nicht gefunden!');
        window.open('https://solflare.com/', '_blank');
      }
    } catch (error) {
      console.error('Solflare connection error:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (window?.solana?.isPhantom) {
        await window.solana.disconnect();
      }
      if (window?.solflare?.isSolflare) {
        await window.solflare.disconnect();
      }
    } catch (error) {
      console.error('Disconnect error:', error);
    } finally {
      setIsConnected(false);
      setWalletAddress('');
      setBalance(0);
    }
  };

  const shortenAddress = (address) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  
  const formatBalance = (bal) => {
    return bal.toFixed(3); // 3 Nachkommastellen
  };
  
  if (isConnected) {
    return (
      <div className="wallet-connected-jup">
        <div className="wallet-info">
          <div className="wallet-balance">{formatBalance(balance)} SOL</div>
          <div className="wallet-address-jup">{shortenAddress(walletAddress)}</div>
        </div>
        <button className="disconnect-button-jup" onClick={disconnectWallet}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-container-jup">
      <button 
        className="connect-button-jup"
        onClick={() => setShowMenu(!showMenu)}
      >
        <span className="connect-button-text">Connect Wallet</span>
      </button>

      {showMenu && (
        <div className="wallet-menu-jup">
          <div className="wallet-menu-header">
            <span>Connect Wallet</span>
            <button 
              className="close-button"
              onClick={() => setShowMenu(false)}
            >
              ×
            </button>
          </div>
          
          <div className="wallet-options">
            <button className="wallet-option-jup" onClick={connectPhantom}>
              <div className="wallet-option-content">
                <div className="wallet-option-icon">
                  <img src={phantom_icon} alt={alt}/>
                </div>
                <div className="wallet-option-info">
                  <div className="wallet-option-name">Phantom</div>
                  <div className="wallet-option-status">Popular</div>
                </div>
              </div>
              <div className="wallet-option-arrow">→</div>
            </button>

            <button className="wallet-option-jup" onClick={connectSolflare}>
              <div className="wallet-option-content">
                <div className="wallet-option-icon">
                  <img src={solflare_icon} alt={alt}/>
                </div>
                <div className="wallet-option-info">
                  <div className="wallet-option-name">Solflare</div>
                  <div className="wallet-option-status">Web & Extension</div>
                </div>
              </div>
              <div className="wallet-option-arrow">→</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
