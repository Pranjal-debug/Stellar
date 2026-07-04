import * as StellarSdk from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";

const server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

// Your deployed crowdfunding contract
export const CONTRACT_ID =
  "CCVOOKEQGWFGMQ6CHAUPM63THCVM5UTKRJM6H333GZOTDOFCPJHFSUJH";

// Network
export const NETWORK_PASSPHRASE =
  StellarSdk.Networks.TESTNET;