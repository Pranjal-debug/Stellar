import { useState } from "react";
import { requestAccess } from "@stellar/freighter-api";
import { getBalance } from "../services/stellar";

function WalletCard({ publicKey, setPublicKey }) {
  const [balance, setBalance] = useState("0");

  const connectWallet = async () => {
    try {
      const result = await requestAccess();
      if (result.error) {
        alert(result.error);
        return;
      }
      setPublicKey(result.address);
      const bal = await getBalance(result.address);
      setBalance(bal);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = () => {
    setPublicKey("");
    setBalance("0");
  };

  return (
    <div className="form-card">
      <div>
        <h2>Wallet Interface</h2>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Manage your ecosystem keypair authentication.</p>
      </div>

      {!publicKey ? (
        <button className="btn-primary" onClick={connectWallet} style={{ width: '100%' }}>
          Connect via Freighter
        </button>
      ) : (
        <>
          <div className="form-group">
            <label>Public Address</label>
            <div className="info-block">
              <p>{publicKey}</p>
            </div>
          </div>

          <div className="form-group">
            <label>Liquid Balance</label>
            <div className="info-block">
              <p style={{ color: 'var(--secondary)', fontSize: '18px', fontWeight: '600', fontFamily: 'inherit' }}>
                {balance} XLM
              </p>
            </div>
          </div>

          <button className="btn-danger" onClick={disconnectWallet} style={{ width: '100%', marginTop: '8px' }}>
            Disconnect Account
          </button>
        </>
      )}
    </div>
  );
}

export default WalletCard;