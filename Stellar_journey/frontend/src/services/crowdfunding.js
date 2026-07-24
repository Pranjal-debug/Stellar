import { Client, networks } from "../contracts/crowdfunding/src";
import { signTransaction } from "@stellar/freighter-api";

export const crowdfundingClient = new Client({
  ...networks.testnet,
  rpcUrl: "https://soroban-testnet.stellar.org",
  signTransaction,
});

export async function getCampaigns() {
  const tx = await crowdfundingClient.get_campaigns();

  return tx.result;
}