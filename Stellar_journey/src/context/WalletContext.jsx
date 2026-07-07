import { createContext, useContext, useState } from "react";
import StellarWalletsKit from "../services/walletKit";
import { getBalance } from "../services/stellar";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState("0");

async function connectWallet() {
  try {
    const { address } = await StellarWalletsKit.authModal();

    setPublicKey(address);

    const bal = await getBalance(address);

    setBalance(bal);
  } catch (err) {
  if (err.code === -1) {
    return; // user closed the modal
  }

  console.error(err);
  alert(err.message || "Failed to connect wallet");
}
}

  async function disconnectWallet() {
  await StellarWalletsKit.disconnect();

  setPublicKey("");
  setBalance("0");
}

  async function refreshBalance() {
    if (!publicKey) return;

    const bal = await getBalance(publicKey);

    setBalance(bal);
  }

  return (
    <WalletContext.Provider
      value={{
        publicKey,
        balance,
        connectWallet,
        disconnectWallet,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}