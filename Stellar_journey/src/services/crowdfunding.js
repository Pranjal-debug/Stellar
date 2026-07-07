import { Client, networks } from "contract-client";
import StellarWalletsKit from "./walletKit";

const client = new Client({
  ...networks.testnet,
  rpcUrl: "https://soroban-testnet.stellar.org",
  signTransaction: StellarWalletsKit.signTransaction,
});

export async function getCampaigns() {
  const count = await getCampaignCount();

  const requests = [];

  for (let i = 1; i <= count; i++) {
    requests.push(getCampaign(i));
  }

  return await Promise.all(requests);
}

export async function getCampaign(id) {
  const tx = await client.get_campaign({
    id,
  });

  return tx.result;
}

export async function getCampaignCount() {
  const tx = await client.get_campaign_count();

  return Number(tx.result);
}

export async function createCampaign(
  creator,
  title,
  description,
  goal,
  deadline
) {
  const tx = await client.create_campaign(
  {
    creator,
    title,
    description,
    goal: BigInt(goal),
    deadline: BigInt(deadline),
  },
  {
    publicKey: creator,
  }
);

  console.log(tx);

  const result = await tx.signAndSend();

console.dir(result, { depth: null });

console.log(result.sendTransactionResponse);
console.log(result.getTransactionResponseAll);

  return result;
}

export async function donate(donor, campaignId, amount) {
  const tx = await client.donate(
    {
      donor,
      campaign_id: campaignId,
      amount: BigInt(amount),
    },
    {
      publicKey: donor,
    }
  );

  return await tx.signAndSend();
}

export async function getDonation(
  campaignId,
  donor
) {
  const tx = await client.get_donation({
    campaign_id: campaignId,
    donor,
  });

  return Number(tx.result);
}

export async function closeCampaign(creator, campaignId) {
  const tx = await client.close_campaign(
    {
      creator,
      campaign_id: campaignId,
    },
    {
      publicKey: creator,
    }
  );

  return await tx.signAndSend();
}

export async function withdraw(creator, campaignId) {
  const tx = await client.withdraw(
    {
      creator,
      campaign_id: campaignId,
    },
    {
      publicKey: creator,
    }
  );

  return await tx.signAndSend();
}