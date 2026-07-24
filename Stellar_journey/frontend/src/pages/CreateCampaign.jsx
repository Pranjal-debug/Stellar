import { useState } from "react";

import MainLayout from "../layouts/MainLayout";
import FormCard from "../components/createCampaign/FormCard";
import CreateCampaignForm from "../components/createCampaign/CreateCampaignForm";
import { useWallet } from "../hooks/useWallet";
import { createCampaign } from "../services/createCampaign";

export default function CreateCampaign() {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");

  async function handleSubmit(e) {
  e.preventDefault();

  if (!publicKey) {
    alert("Connect your wallet first.");
    return;
  }

  try {
    setLoading(true);

    const deadlineTimestamp = Math.floor(
      new Date(deadline).getTime() / 1000
    );

    await createCampaign({
      creator: publicKey,
      title,
      description,
      goal: Number(goal) * 10000000,
      deadline: deadlineTimestamp,
    });

    alert("Campaign created successfully!");

    setTitle("");
    setDescription("");
    setGoal("");
    setDeadline("");

  } catch (err) {
    console.error(err);
    alert("Failed to create campaign.");
  } finally {
    setLoading(false);
  }
}
  return (
    <MainLayout>
      <section className="py-16">
        <FormCard>
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold">
              Launch Your Campaign
            </h1>
        
            <p className="mt-4 text-slate-400">
              Create transparent fundraising campaigns secured by Stellar smart contracts.
            </p>
          </div>
        
          <CreateCampaignForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            goal={goal}
            setGoal={setGoal}
            deadline={deadline}
            setDeadline={setDeadline}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </FormCard>
      </section>
    </MainLayout>
  );
}