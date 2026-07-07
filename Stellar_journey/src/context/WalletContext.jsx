import { createContext, useContext, useState } from "react";
import { requestAccess } from "@stellar/freighter-api";
import { getBalance } from "../services/stellar";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState("0");

  async function connectWallet() {
    try {
      const result = await requestAccess();

      if (!result.address) {
        throw new Error("Wallet not connected");
      }

      const address = result.address;

      setPublicKey(address);

      const bal = await getBalance(address);

      setBalance(bal);
    } catch (err) {
      console.error(err);
    }
  }

  function disconnectWallet() {
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