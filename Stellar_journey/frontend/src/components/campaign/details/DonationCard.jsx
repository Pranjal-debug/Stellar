import { useState } from "react";
import { toast } from "react-hot-toast";
import { donate } from "../../../services/donate";
import { useWallet } from "../../../hooks/useWallet";
import Button from "../../ui/Button";


export default function DonationCard({
  campaign,
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
 const { publicKey } = useWallet();

const handleDonate = async () => {
  if (!publicKey) {
    toast.error("Please connect your Stellar wallet first");
    return;
  }

  if (!amount || Number(amount) <= 0) {
    toast.error("Please enter a valid donation amount");
    return;
  }

  const toastId = toast.loading("Processing smart contract donation...");

  try {
    setLoading(true);

    await donate({
      donor: publicKey,
      campaign_id: campaign.id,
      amount: Number(amount) * 10000000,
    });

    toast.success("Donation Successful! Verified on Stellar testnet.", { id: toastId });
    setAmount("");
  } catch (err) {
    console.error(err);
    toast.error(err.message || "Donation failed. Please try again.", { id: toastId });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold text-white">
        Support This Campaign
      </h2>

      <p className="mt-2 text-slate-400">
        Every contribution is recorded transparently on the Stellar blockchain.
      </p>

      <div className="mt-8">

        <label className="mb-2 block text-sm text-slate-400">
          Amount (XLM)
        </label>

        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="
            w-full
            rounded-2xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-4
            text-lg
            text-white
            placeholder:text-slate-500
            focus:border-teal-400
            focus:outline-none
          "
        />

      </div>

      <div className="mt-8 rounded-2xl bg-slate-950 p-5">

        <div className="flex justify-between">

          <span className="text-slate-400">
            Estimated Donation
          </span>

          <span className="font-semibold text-white">
            {amount || 0} XLM
          </span>

        </div>

      </div>

      <Button
          onClick={handleDonate}
          loading={loading}
          className="w-full"
      >
          Donate Now
      </Button>

      <p className="mt-4 text-center text-xs text-slate-500">
        Secured by Stellar Soroban Smart Contracts
      </p>

    </div>
  );
}