import { useEffect, useState } from "react";

import CampaignCard from "../components/CampaignCard";

import {
  getCampaign,
  getCampaignCount,
} from "../services/crowdfunding";

function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  loadCampaigns();
}, []);

  async function loadCampaigns() {
    try {
      setLoading(true);

      const count = await getCampaignCount();

      console.log("Campaign Count:", count);

      const list = await Promise.all(
  Array.from({ length: count }, (_, i) =>
    getCampaign(i + 1)
  )
);

setCampaigns(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="center">
        <h2>Loading campaigns...</h2>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="center">
        <h2>No campaigns yet 🚀</h2>
      </div>
    );
  }
  

  return (
    <div className="campaign-grid">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
        />
      ))}
    </div>
  );
}

export default Home;