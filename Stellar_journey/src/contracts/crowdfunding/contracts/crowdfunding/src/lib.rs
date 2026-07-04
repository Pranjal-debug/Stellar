#![no_std]

use soroban_sdk::{
    contract,
    contractimpl,
    contracttype,
    token,
    Address,
    Env,
};

#[contracttype]
pub enum DataKey {
    Admin,
    Token,
    Total,
    Donation(Address),
}

#[contract]
pub struct CrowdfundingContract;

#[contractimpl]
impl CrowdfundingContract {

   pub fn initialize(env: Env, admin: Address, token: Address) {
    admin.require_auth();

    env.storage().persistent().set(&DataKey::Admin, &admin);
    env.storage().persistent().set(&DataKey::Token, &token);
    env.storage().persistent().set(&DataKey::Total, &0i128);
}
    // Donate an amount
    pub fn donate(
    env: Env,
    donor: Address,
    amount: i128,
){
        donor.require_auth();

        let token_address: Address = env
    .storage()
    .persistent()
    .get(&DataKey::Token)
    .unwrap();

let token = token::Client::new(&env, &token_address);

token.transfer(
    &donor,
    &env.current_contract_address(),
    &amount,
);

token.transfer(
    &donor,
    &env.current_contract_address(),
    &amount,
);

        // Update donor total
        let key = DataKey::Donation(donor.clone());
        let donated = env.storage().persistent().get::<_, i128>(&key).unwrap_or(0);
        env.storage().persistent().set(&key, &(donated + amount));

        // Update overall total
        let total = env
            .storage()
            .persistent()
            .get::<_, i128>(&DataKey::Total)
            .unwrap_or(0);

        let new_total = total + amount;

env.storage()
    .persistent()
    .set(&DataKey::Total, &new_total);

env.events().publish(
    ("donation",),
    (donor.clone(), amount),
);
    }

    // Total funds raised
    pub fn get_total(env: Env) -> i128 {
        env.storage()
            .persistent()
            .get::<_, i128>(&DataKey::Total)
            .unwrap_or(0)
    }

    // Individual donation
    pub fn get_donation(env: Env, donor: Address) -> i128 {
        env.storage()
            .persistent()
            .get::<_, i128>(&DataKey::Donation(donor))
            .unwrap_or(0)
    }
}