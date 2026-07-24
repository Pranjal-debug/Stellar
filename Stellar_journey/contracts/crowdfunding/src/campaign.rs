use crate::events::CampaignCreated;

use soroban_sdk::{
    Address,
    Env,
    String,
    Vec,
};

use crate::{
    storage::{self, DataKey},
    types::{Campaign, CampaignStatus},
};

use crate::errors::ContractError;

pub fn create_campaign(
    env: Env,
    creator: Address,
    title: String,
    description: String,
    goal: i128,
    deadline: u64,
) -> Result<(), ContractError>{
    if goal <= 0 {
    return Err(ContractError::InvalidGoal);
}

let now = env.ledger().timestamp();

if deadline <= now {
    return Err(ContractError::InvalidDeadline);
}
        creator.require_auth();

        let mut count = storage::get_campaign_count(&env);

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

        storage::save_campaign(&env, &campaign);

        storage::set_campaign_count(&env, count);

        CampaignCreated {
            campaign_id: count,
            creator: creator.clone(),
            goal,
        }
        .publish(&env);

        Ok(())
}

pub fn get_campaign(env: Env, id: u32) -> Option<Campaign> {
    storage::get_campaign(&env, id)
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