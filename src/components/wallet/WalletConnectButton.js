import { useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export default function WalletConnectButton() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const connection = new Connection(clusterApiUrl("mainnet-beta"));

  const connectPhantom = async () => {
    try {
      const provider = window.solana;

      if (!provider || !provider.isPhantom) {
        alert("Phantom Wallet nicht installiert");
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

  return (
    <div className="wallet-connect">
      {!walletAddress ? (
        <button onClick={connectPhantom}>
          Connect Wallet
        </button>
      ) : (
        <button>
          {walletAddress.slice(0,4)}...{walletAddress.slice(-4)}
          <span className="balance">
            {balance ? balance.toFixed(2) + " SOL" : "..."}
          </span>
        </button>
      )}
    </div>
  );
}