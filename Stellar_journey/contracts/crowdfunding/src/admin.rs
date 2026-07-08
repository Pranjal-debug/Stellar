use soroban_sdk::{
    Address,
    Env,
};

use crate::{
    storage::DataKey,
    types::{Campaign, CampaignStatus},
};

pub fn initialize(
        env: Env,
        admin: Address,
        token: Address,
    ) {
        if env.storage().persistent().has(&DataKey::Admin) {
            panic!("Already initialized");
        }

        admin.require_auth();

        env.storage().persistent().set(&DataKey::Admin, &admin);
        env.storage().persistent().set(&DataKey::Token, &token);
        env.storage().persistent().set(&DataKey::CampaignCount, &0u32);
    }

    pub fn close_campaign(
    env: Env,
    creator: Address,
    campaign_id: u32,
) {
    creator.require_auth();

    let mut campaign: Campaign = env
        .storage()
        .persistent()
        .get(&DataKey::Campaign(campaign_id))
        .unwrap();

    if campaign.creator != creator {
        panic!("Only campaign creator can close campaign");
    }

    if campaign.status != CampaignStatus::Active {
    panic!("Campaign already closed");
    }

    campaign.status = CampaignStatus::Closed;

    env.storage()
        .persistent()
        .set(&DataKey::Campaign(campaign_id), &campaign);
}