import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCampaign, donate, closeCampaign, withdraw } from "../services/crowdfunding";
import { useWallet } from "../context/WalletContext";

function CampaignDetails() {
  const { id } = useParams();
  const { publicKey, refreshBalance } = useWallet();
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadCampaign();
  }, [id]);

  async function loadCampaign() {
    setLoading(true);
    const data = await getCampaign(Number(id));
    setCampaign(data);
    setLoading(false);
  }

  async function handleDonate() {
    if (!amount || BigInt(amount) <= 0n) {
      alert("Enter a valid amount");
      return;
    }
    try {
      setProcessing(true);
      await donate(publicKey, Number(id), BigInt(amount));
      await refreshBalance();
      alert("Donation Successful!");
      await loadCampaign();
      setAmount("");
    } catch (err) {
      console.error("Donation Error:", err);
      alert(err?.message ?? "Donation Failed");
    } finally {
      setProcessing(false);
    }
  }

  const handleCloseCampaign = async () => {
    try {
      await closeCampaign(publicKey, Number(id));
      alert("Campaign closed successfully!");
      await loadCampaign();
    } catch (err) {
      console.error(err);
      alert("Failed to close campaign");
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdraw(publicKey, Number(id));
      alert("Funds withdrawn successfully!");
      await loadCampaign();
    } catch (err) {
      console.error(err);
      alert("Withdrawal failed");
    }
  };

  if (loading) {
    return (
      <div className="center">
        <h2>Loading campaign parameters...</h2>
      </div>
    );
  }

  const progress = Math.min(Number((campaign.raised * 100n) / campaign.goal), 100);
  const daysLeft = Math.max(
    Math.ceil((Number(campaign.deadline) * 1000 - Date.now()) / (1000 * 60 * 60 * 24)),
    0
  );

  const status = campaign.status.tag;
  
  const isActive = status === "Active";
  const isSuccessful = status === "Successful";
  const isClosed = status === "Closed";
  const isWithdrawn = status === "Withdrawn";
  const isExpired = status === "Expired";

  return (
    <div className="details-container">
      <div className="details-card">
        <div className="details-header">
          <h1>{campaign.title}</h1>
          <p className="description">{campaign.description}</p>
          <div className="creator-pill">
            Creator: <strong>{`${campaign.creator.slice(0, 6)}...${campaign.creator.slice(-4)}`}</strong>
          </div>
        </div>

        <div className="campaign-stats">
          <div>
            <span>Target Goal</span>
            <strong>{campaign.goal.toString()} XLM</strong>
          </div>
          <div>
            <span>Total Raised</span>
            <strong>{campaign.raised.toString()} XLM</strong>
          </div>
          <div>
            <span>Time remaining</span>
            <strong>{daysLeft} Days</strong>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-text">
            <span>Progress status</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="action-box">
          {isActive ? (
            <div className="input-group">
              <input
                type="number"
                placeholder="Amount in XLM"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={processing}
              />
              <button className="btn-primary" onClick={handleDonate} disabled={processing}>
                {processing ? "Processing..." : "Back Campaign"}
              </button>
            </div>
          ) : (
            <div className="status-badge closed" style={{ justifyContent: 'center', padding: '12px' }}>
              This funding window has concluded.
            </div>
          )}

          {campaign.creator === publicKey && (
            <div className="admin-actions">
              {isActive && (
                <button className="btn-danger" onClick={handleCloseCampaign}>
                  End Campaign
                </button>
              )}
              {(isSuccessful || isClosed) && !isWithdrawn && (
                <button className="btn-primary" onClick={handleWithdraw} style={{ background: 'var(--secondary)' }}>
                  Claim Capital
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;