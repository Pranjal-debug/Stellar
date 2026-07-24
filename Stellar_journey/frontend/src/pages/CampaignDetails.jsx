import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { getCampaign } from "../services/campaign.service";
import CampaignStats from "../components/campaign/details/CampaignStats";
import CampaignHero from "../components/campaign/details/CampaignHero";
import DonationCard from "../components/campaign/details/DonationCard";

export default function CampaignDetails() {
  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaign();
  }, [id]);

  async function loadCampaign() {
    try {
      const data = await getCampaign(Number(id));
      setCampaign(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-7xl px-6 py-20">
          Loading...
        </div>
      </MainLayout>
    );
  }

  if (!campaign) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-7xl px-6 py-20">
          Campaign not found.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
        <section className="mx-auto max-w-7xl px-6 py-10">
            <CampaignHero campaign={campaign} />
                <div className="mt-10 grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <CampaignStats campaign={campaign} />
                  </div>
                  <DonationCard campaign={campaign} />
                </div>
        </section>
    </MainLayout>
  );
}