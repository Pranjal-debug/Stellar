import { crowdfundingClient } from "./contractClient";

export async function donate({
  donor,
  campaign_id,
  amount,
}) {
  const tx = await crowdfundingClient.donate({
    donor,
    campaign_id,
    amount,
  });

  return await tx.signAndSend();
}