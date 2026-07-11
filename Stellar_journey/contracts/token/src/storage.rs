use soroban_sdk::{Address, Env};

use crate::types::DataKey;

// ----------------------
// Admin
// ----------------------

pub fn get_admin(env: &Env) -> Option<Address> {
    env.storage()
        .persistent()
        .get(&DataKey::Admin)
}

pub fn set_admin(
    env: &Env,
    admin: &Address,
) {
    env.storage()
        .persistent()
        .set(&DataKey::Admin, admin);
}

// ----------------------
// Total Supply
// ----------------------

pub fn get_total_supply(env: &Env) -> i128 {
    env.storage()
        .persistent()
        .get(&DataKey::TotalSupply)
        .unwrap_or(0)
}

pub fn set_total_supply(
    env: &Env,
    amount: i128,
) {
    env.storage()
        .persistent()
        .set(&DataKey::TotalSupply, &amount);
}

// ----------------------
// Balance
// ----------------------

pub fn get_balance(
    env: &Env,
    owner: &Address,
) -> i128 {
    env.storage()
        .persistent()
        .get(&DataKey::Balance(owner.clone()))
        .unwrap_or(0)
}

pub fn set_balance(
    env: &Env,
    owner: &Address,
    amount: i128,
) {
    env.storage()
        .persistent()
        .set(
            &DataKey::Balance(owner.clone()),
            &amount,
        );
}