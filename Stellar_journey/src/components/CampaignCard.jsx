import { Link } from "react-router-dom";

function CampaignCard({ campaign }) {
  const progress = Math.min(
    Number((campaign.raised * 100n) / campaign.goal),
    100
  );

  const deadline = new Date(Number(campaign.deadline) * 1000);
  const today = new Date();
  const daysLeft = Math.max(
    Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)),
    0
  );

  return (
    <div className="campaign-card">
      <div className="campaign-top">
        <h2>{campaign.title}</h2>
        <p>{campaign.description}</p>
        <span className={`status-badge ${campaign.active ? "active" : "closed"}`}>
          {campaign.active ? "● Active" : "● Closed"}
        </span>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">
          <span>{progress}% funded</span>
        </div>
      </div>

      <div className="campaign-stats">
        <div>
          <span>Raised</span>
          <strong>{campaign.raised.toString()} XLM</strong>
        </div>
        <div>
          <span>Goal</span>
          <strong>{campaign.goal.toString()} XLM</strong>
        </div>
      </div>

      <div className="campaign-footer">
        <span className="days-left">{daysLeft} days left</span>
        <Link to={`/campaign/${campaign.id}`} className="view-link">
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default CampaignCard;