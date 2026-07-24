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
      goal,
      deadline,
    },
    {
      publicKey: creator,
    }
  );

  return await tx.signAndSend();
}