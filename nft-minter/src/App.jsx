import { useState } from "react";
import { connectWallet } from "./wallet/wallet";

function App() {
  const [wallet, setWallet] = useState(null);
  const [status, setStatus] = useState("");

  const handleConnect = async () => {
    try {
      const w = await connectWallet();
      setWallet(w);
      setStatus("Wallet connected");
    } catch (err) {
      if (err.message === "WALLET_NOT_FOUND") {
        setStatus("No wallet found");
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>NFT Minter</h1>

      {!wallet ? (
        <button onClick={handleConnect}>Connect Wallet</button>
      ) : (
        <p>Connected: {wallet.address}</p>
      )}

      <p>{status}</p>
    </div>
  );
}

export default App;