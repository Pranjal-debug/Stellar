import { crowdfundingClient } from "./contractClient";

export async function createCampaign({
  creator,
  title,
  description,
  goal,
  deadline,
}) {
  const tx = await crowdfundingClient.create_campaign(
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

  return await tx.signAndSend();
}

export async function getCampaigns() {
  const tx = await crowdfundingClient.get_campaigns();

  return tx.result;
}

export async function getCampaign(id) {
  const tx = await crowdfundingClient.get_campaign({
    id,
  });

  return tx.result;
}