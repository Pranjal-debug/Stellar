import { getBalance } from "./services/stellar";
import { createPaymentTransaction } from "./services/sendPayment";
import { useEffect, useState } from "react";
import { initializeWalletKit } from "./services/walletKit";
import { requestAccess } from "@stellar/freighter-api";
import { donate, getTotal } from "./services/crowdfunding";
import "./App.css";

function App() {
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState("0");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState({
  status: "",
  message: "",
  });
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
  initializeWalletKit();
}, []);

const connectWallet = async () => {
  try {
    const result = await requestAccess();

    console.log("Freighter:", result);

    const address = result.address;

    console.log("Address:", address);

    setPublicKey(address);

    const balanceValue = await getBalance(address);
    setBalance(balanceValue);

    const total = await getTotal();
    console.log("Total:", total);
  } catch (err) {
    console.error(err);
  }
};

const handleSend = async () => {
  try {
    const stroops = BigInt(Math.floor(Number(amount) * 10_000_000));

    await donate(publicKey, stroops);

    // Refresh wallet balance
    const newBalance = await getBalance(publicKey);
    setBalance(newBalance);

    // Refresh contract total
    const total = await getTotal();
    console.log("New Total:", total);

  } catch (err) {
    console.error(err);
  }
};

  const disconnectWallet = () => {
    setPublicKey("");
    setBalance("0");
    setDestination("");
    setAmount("");
    setTxStatus("");
    setTxHash("");
  };

  const shortAddress = publicKey
    ? `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`
    : "";

  const copyHash = () => {
    navigator.clipboard.writeText(txHash);
    alert("Transaction hash copied!");
  };

  console.log("publicKey state:", publicKey);

  return (
    <div className="container">
      <div className="card">
        {/* Unified sleek header layer */}
        <div className="card-header">
          <h1 className="title">Stellar Dashboard</h1>
          {publicKey && (
            <button className="btn disconnect-btn" onClick={disconnectWallet}>
              Disconnect
            </button>
          )}
        </div>

        {!publicKey ? (
          <button className="btn connect-btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="wallet-box">
              <p className="wallet-label">Connected Wallet</p>
              <p className="wallet-address">{shortAddress}</p>
            </div>

            <div className="balance-box">
              <p className="wallet-label">Balance</p>
              <p className="balance">{Number(balance).toFixed(2)} XLM</p>
            </div>

            <div className="input-group">
              <label>Destination Address</label>
              <input
                type="text"
                placeholder="G..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Amount (XLM)</label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button
              className="btn send-btn"
              onClick={handleSend}
              disabled={txStatus === "Submitting..."}
            >
              {txStatus === "Submitting..." ? "Sending..." : "Send XLM"}
            </button>

            {txStatus.status && (
              <p
                className={`status ${
                  txStatus.status === "Success"
                    ? "success"
                    : txStatus.status === "Failed"
                    ? "failed"
                    : "submitting"
                }`}
              >
                {txStatus.status === "Success" && "🟢 "}
                {txStatus.status === "Failed" && "🔴 "}
                {txStatus.status === "Submitting..." && "🟡 "}
                {txStatus.message || txStatus.status}
              </p>
            )}

            {txHash && (
              <div className="hash-box">
                <strong>Transaction Hash</strong>
                <p>{txHash}</p>
                <button className="copy-btn" onClick={copyHash}>
                  Copy Hash
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;