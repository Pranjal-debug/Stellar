import { useState } from "react";
import { createCampaign } from "../services/crowdfunding";
import { useWallet } from "../context/WalletContext";

function CreateCampaign() {
  const { publicKey } = useWallet();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleCreate = async () => {
    if (!publicKey) {
      alert("Connect wallet first");
      return;
    }

    try {
      const unixDeadline = Math.floor(new Date(deadline).getTime() / 1000);
      await createCampaign(
        publicKey,
        title,
        description,
        BigInt(goal),
        BigInt(unixDeadline)
      );

      alert("Campaign created!");
      setTitle("");
      setDescription("");
      setGoal("");
      setDeadline("");
    } catch (err) {
      console.error(err);
      alert("Failed to create campaign");
    }
  };

  return (
    <div className="form-card">
      <div>
        <h2>Launch Campaign</h2>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Deploy a decentralized fundraising smart contract program.</p>
      </div>

      <div className="form-group">
        <label>Campaign Title</label>
        <input
          type="text"
          placeholder="e.g. Open Source Tooling"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Outline your milestones and project target delivery vectors..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Funding Goal (Stroops / Base Units)</label>
        <input
          type="number"
          placeholder="0.00"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Expiration Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <button className="btn-primary" onClick={handleCreate} style={{ width: '100%', marginTop: '8px' }}>
        Publish to Ledger
      </button>
    </div>
  );
}

export default CreateCampaign;