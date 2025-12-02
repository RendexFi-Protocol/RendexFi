import React, { useState, useEffect } from 'react';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import './WalletConnect.css';

import phantom_icon from '../phantom_icon.png';
import solflare_icon from '../solflare_icon.png';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [balance, setBalance] = useState(0);

  const connection = new Connection(
    "https://api.mainnet-beta.solana.com",
    "confirmed"
  );


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (!walletAddress) return;
        const publicKey = new PublicKey(walletAddress);
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Balance error:", error);
      }
    };

    if (isConnected) fetchBalance();
  }, [isConnected, walletAddress, connection]);

  const connectPhantom = async () => {
    try {
      const provider = window?.phantom?.solana;
      
      if (!provider) {
        alert("Phantom Wallet nicht gefunden!");
        return;
      }
      
      const resp = await provider.connect();
      const address = resp.publicKey.toString();
      setWalletAddress(address);
      setIsConnected(true);
      
      const lamports = await connection.getBalance(new PublicKey(address));
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch (e) {
      console.log("Phantom error:", e);
    }
  };

  const connectSolflare = async () => {
    try {
      if (!window?.solflare?.isSolflare) {
        alert("Solflare Wallet nicht gefunden!");
        window.open("https://solflare.com/", "_blank");
        return;
      }

      await window.solflare.connect();
      const address = window.solflare.publicKey.toString();

      console.log("Solflare connected:", address);

      setWalletAddress(address);
      setIsConnected(true);
      setShowMenu(false);

      const lamports = await connection.getBalance(new PublicKey(address));
      setBalance(lamports / LAMPORTS_PER_SOL);

    } catch (error) {
      console.error("Solflare Fehler:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (window?.solana?.isPhantom) await window.solana.disconnect();
      if (window?.solflare?.isSolflare) await window.solflare.disconnect();
    } catch (error) {}

    setIsConnected(false);
    setWalletAddress('');
    setBalance(0);
  };

  const shortenAddress = (address) =>
    `${address.slice(0, 4)}...${address.slice(-4)}`;

  const formatBalance = (bal) => Number(bal).toFixed(3);

  // Wenn verbunden
  if (isConnected) {
    return (
      <div className="wallet-connected">
        <div className="wallet-info">
          <div className="wallet-balance">{formatBalance(balance)} SOL</div>
          <div className="wallet-address">{shortenAddress(walletAddress)}</div>
        </div>
        <button className="disconnect-button" onClick={disconnectWallet}>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
        </button>
      </div>
    );
  }

  // Wenn nicht verbunden
  return (
    <div className="wallet-container">
      <button className="connect-button" onClick={() => setShowMenu(!showMenu)}>
        <span className="connect-button-text">Connect</span>
      </button>

      {showMenu && (
        <div className="wallet-menu">
          <div className="wallet-menu-header">
            <span>Connect Wallet</span>
            <button className="close-button" onClick={() => setShowMenu(false)}>×</button>
          </div>

          <div className="wallet-options">

            <button className="wallet-option" onClick={connectPhantom}>
              <div className="wallet-option-content">
                <div className="wallet-option-icon">
                  <img src={phantom_icon} alt="Phantom" />
                </div>
                <div className="wallet-option-info">
                  <div className="wallet-option-name">Phantom</div>
                  <div className="wallet-option-status">Popular</div>
                </div>
              </div>
              <div className="wallet-option-arrow">→</div>
            </button>

            <button className="wallet-option" onClick={connectSolflare}>
              <div className="wallet-option-content">
                <div className="wallet-option-icon">
                  <img src={solflare_icon} alt="Solflare" />
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
