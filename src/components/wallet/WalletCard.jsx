import "./WalletCard.css";

export default function WalletCard() {
  return (
    <div className="wallet--card">
      <div className="wallet-content">
        <div className="wallet-header">
          <span className="wallet-title">WALLET</span>
        </div>

        <div className="wallet-balance">
          $3.400,23
        </div>
      </div>

      <div className="wallet-address">
        ejdke...sk
      </div>
    </div>
  );
}