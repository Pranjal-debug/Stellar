use soroban_sdk::{contracttype, Address};

#[contracttype]
pub enum DataKey {
    Admin,
    Token,
    CampaignCount,
    Campaign(u32),
    Donation((u32, Address)),
}