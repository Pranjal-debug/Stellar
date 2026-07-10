use soroban_sdk::{contractevent, Address};

#[contractevent]
#[derive(Clone)]
pub struct CampaignCreated {
    #[topic]
    pub campaign_id: u32,

    #[topic]
    pub creator: Address,

    pub goal: i128,
}

#[contractevent]
#[derive(Clone)]
pub struct DonationReceived {
    #[topic]
    pub campaign_id: u32,

    #[topic]
    pub donor: Address,

    pub amount: i128,
}

#[contractevent]
#[derive(Clone)]
pub struct CampaignClosed {
    #[topic]
    pub campaign_id: u32,
}

#[contractevent]
#[derive(Clone)]
pub struct FundsWithdrawn {
    #[topic]
    pub campaign_id: u32,

    #[topic]
    pub creator: Address,

    pub amount: i128,
}

#[contractevent]
#[derive(Clone)]
pub struct GoalReached {
    #[topic]
    pub campaign_id: u32,

    #[topic]
    pub creator: Address,

    pub total_raised: i128,
}