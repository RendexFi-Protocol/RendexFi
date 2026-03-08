import { useState } from "react";

export default function WalletConnectButton() {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectPhantom = async () => {
    try {
      const provider = window.solana;

      if (!provider || !provider.isPhantom) {
        alert("Phantom Wallet nicht installiert");
        window.open("https://phantom.app/", "_blank");
        return;
      }

      const resp = await provider.connect();
      setWalletAddress(resp.publicKey.toString());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ position: "absolute", top: 20, right: 20 }}>
      {!walletAddress ? (
        <button onClick={connectPhantom}>
          Connect Wallet
        </button>
      ) : (
        <button>
          {walletAddress.slice(0,4)}...{walletAddress.slice(-4)}
        </button>
      )}
    </div>
  );
  }