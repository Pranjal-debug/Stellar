use soroban_sdk::{
    contracttype,
    Address,
    String,
};

#[contracttype]
#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum CampaignStatus {
    Active,
    Successful,
    Expired,
    Closed,
    Withdrawn,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Campaign {
    pub id: u32,
    pub creator: Address,
    pub title: String,
    pub description: String,
    pub goal: i128,
    pub raised: i128,
    pub deadline: u64,
    pub status: CampaignStatus,
}