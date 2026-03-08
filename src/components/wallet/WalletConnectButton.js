import { useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export default function WalletConnectButton() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const connection = new Connection(clusterApiUrl("mainnet-beta"));

  const connectPhantom = async () => {
    try {
      const provider = window.solana;

      if (!provider || !provider.isPhantom) {
        alert("Install Phantom Wallet");
        window.open("https://phantom.app/", "_blank");
        return;
      }

      const resp = await provider.connect();
      const address = resp.publicKey.toString();

      setWalletAddress(address);

      const publicKey = new PublicKey(address);
      const lamports = await connection.getBalance(publicKey);

      setBalance(lamports / 1000000000);

    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = async () => {
    const provider = window.solana;
    if (provider?.disconnect) {
      await provider.disconnect();
    }

    setWalletAddress(null);
    setBalance(null);
    setMenuOpen(false);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Address copied");
  };

  return (
    <div className="wallet-connect">

      {!walletAddress ? (

        <button onClick={connectPhantom}>
          Connect Wallet
        </button>

      ) : (

        <div className="wallet-container">

          <button
            className="wallet-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="wallet-info">
              <div className="wallet-address">
                {walletAddress.slice(0,4)}...{walletAddress.slice(-4)}
              </div>

              <div className="wallet-balance">
                {balance ? balance.toFixed(2) + " SOL" : "..."}
              </div>
            </div>

            <div className="wallet-menu-icon">⋯</div>
          </button>

          {menuOpen && (
            <div className="wallet-dropdown">

              <div onClick={copyAddress}>
                Copy Address
              </div>

              <div
                onClick={() =>
                  window.open(
                    `https://solscan.io/account/${walletAddress}`,
                    "_blank"
                  )
                }
              >
                View on Solscan
              </div>

              <div onClick={disconnectWallet}>
                Disconnect
              </div>

            </div>
          )}

        </div>

      )}

    </div>
  );
}