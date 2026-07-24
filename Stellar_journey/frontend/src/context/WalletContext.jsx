import { createContext, useEffect, useState } from "react";
import { getBalance } from "../services/account";

import {
  connectWallet,
  getWalletAddress,
} from "../services/wallet";

import {
  isConnected,
  requestAccess,
  getAddress,
} from "@stellar/freighter-api";

export const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState({
    publicKey: null,
    connected: false,
    balance: "0",
    network: "Testnet",
    loading: true,
  });

  async function connect() {
    try {
      const address = await connectWallet();

      const balance = await getBalance(address);

    setWallet({
      publicKey: address,
      connected: true,
      balance,
      network: "Testnet",
      loading: false,
    });
  } catch (err) {
    console.error(err);
  }
}

async function disconnect() {
  setWallet({
    publicKey: null,
    connected: false,
    balance: "0",
    network: "Testnet",
    loading: false,
  });
}

  useEffect(() => {
    async function restoreWallet() {
      try {
        const address = await getWalletAddress();

if (!address) {
  return;
}
        const balance = await getBalance(address);
        setWallet({
          publicKey: address,
          connected: true,
          balance,
          network: "Testnet",
          loading: false,
        });
      } catch {
        // User has not connected yet
      } finally {
        setWallet((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    }

    restoreWallet();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        ...wallet,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}