#![no_std]

mod admin;
mod campaign;
mod donation;
mod errors;
mod events;
mod storage;
mod types;

use soroban_sdk::{contract, contractimpl, Address, Env, String, Vec};

use types::Campaign;

#[contract]
pub struct CrowdfundingContract;

#[contractimpl]
impl CrowdfundingContract {
    pub fn initialize(env: Env, admin: Address, token: Address) {
        admin::initialize(env, admin, token);
    }

    pub fn create_campaign(
        env: Env,
        creator: Address,
        title: String,
        description: String,
        goal: i128,
        deadline: u64,
    ) {
        campaign::create_campaign(
            env,
            creator,
            title,
            description,
            goal,
            deadline,
        );
    }

    pub fn get_campaign(env: Env, id: u32) -> Option<Campaign> {
        campaign::get_campaign(env, id)
    }

    pub fn get_campaigns(env: Env) -> Vec<Campaign> {
        campaign::get_campaigns(env)
    }

    pub fn get_campaign_count(env: Env) -> u32 {
        campaign::get_campaign_count(env)
    }

    pub fn donate(
        env: Env,
        donor: Address,
        campaign_id: u32,
        amount: i128,
    ) {
        donation::donate(env, donor, campaign_id, amount);
    }

    pub fn get_donation(
        env: Env,
        campaign_id: u32,
        donor: Address,
    ) -> i128 {
        donation::get_donation(env, campaign_id, donor)
    }

    pub fn close_campaign(
        env: Env,
        creator: Address,
        campaign_id: u32,
    ) {
        admin::close_campaign(env, creator, campaign_id);
    }

    pub fn withdraw(
        env: Env,
        creator: Address,
        campaign_id: u32,
    ) {
        donation::withdraw(env, creator, campaign_id);
    }
}