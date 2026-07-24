import MainLayout from "../layouts/MainLayout";
import CampaignGrid from "../components/campaign/CampaignGrid";
import { useCampaigns } from "../hooks/useCampaigns";

import { useEffect, useState } from "react";
import { getCampaigns } from "../services/campaign.service";

async function loadCampaigns() {
  try {
    const data = await getCampaigns();

    setCampaigns(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

export default function Explore() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredCampaigns = campaigns.filter((campaign) => {

  const matchesSearch =
    campaign.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    campaign.description
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" ||
    campaign.status.tag === filter;

  return matchesSearch && matchesFilter;

});

  return (
    <MainLayout>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="mb-12 text-5xl font-bold text-white">
          Explore Campaigns
        </h1>

        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

  <input
    type="text"
    placeholder="Search campaigns..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      rounded-2xl
      border
      border-slate-800
      bg-slate-900
      px-5
      py-3
      text-white
      placeholder:text-slate-500
      focus:border-teal-400
      focus:outline-none
    "
  />

  <div className="flex flex-wrap gap-3">

    {["All", "Active", "Successful", "Expired"].map((status) => (
  
      <button
        key={status}
        onClick={() => setFilter(status)}
        className={`rounded-full px-5 py-2 transition ${
          filter === status
            ? "bg-teal-500 text-white"
            : "border border-slate-700 text-slate-300 hover:border-teal-400"
        }`}
      >
        {status}
      </button>
  
    ))}
  
  </div>
  
  </div>

        {loading ? (
          <p className="text-slate-400">
            Loading campaigns...
          </p>
        ) : (
          filteredCampaigns.length ? (
  <CampaignGrid campaigns={filteredCampaigns} />
) : (
  <div className="rounded-3xl border border-dashed border-slate-700 py-20 text-center">

    <h2 className="text-2xl font-semibold text-white">
      No Campaigns Found
    </h2>

    <p className="mt-3 text-slate-400">
      Try changing your search or filter.
    </p>

  </div>
)
        )}
      </section>
    </MainLayout>
  );
}