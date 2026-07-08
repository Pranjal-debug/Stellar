use soroban_sdk::{
    Address,
    Env,
    String,
    Vec,
};

use crate::{
    storage::DataKey,
    types::{Campaign, CampaignStatus},
};

pub fn create_campaign(
        env: Env,
        creator: Address,
        title: String,
        description: String,
        goal: i128,
        deadline: u64,
    ) {
        creator.require_auth();

        let mut count: u32 = env
            .storage()
            .persistent()
            .get(&DataKey::CampaignCount)
            .unwrap_or(0);

        count += 1;

        let campaign = Campaign {
            id: count,
            creator: creator.clone(),
            title,
            description,
            goal,
            raised: 0,
            deadline,
            status: CampaignStatus::Active,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Campaign(count), &campaign);

        env.storage()
            .persistent()
            .set(&DataKey::CampaignCount, &count);
    }

pub fn get_campaign(env: Env, id: u32) -> Option<Campaign> {
    env.storage()
        .persistent()
        .get(&DataKey::Campaign(id))
}

pub fn get_campaigns(env: Env) -> Vec<Campaign> {
    let count: u32 = env
        .storage()
        .persistent()
        .get(&DataKey::CampaignCount)
        .unwrap_or(0);

    let mut campaigns = Vec::new(&env);

    let mut id: u32 = 1;

    while id <= count {
        if let Some(campaign) = env
            .storage()
            .persistent()
            .get::<_, Campaign>(&DataKey::Campaign(id))
        {
            campaigns.push_back(campaign);
        }

        id += 1;
    }

    campaigns
}

pub fn get_campaign_count(env: Env) -> u32 {
        env.storage()
            .persistent()
            .get(&DataKey::CampaignCount)
            .unwrap_or(0)
    }