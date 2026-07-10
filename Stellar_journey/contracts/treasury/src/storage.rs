use soroban_sdk::{contracttype, Address, Env};

use crate::types::Treasury;

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    Token,
    Treasury,
}

// ----------------------
// Admin
// ----------------------

pub fn get_admin(env: &Env) -> Option<Address> {
    env.storage()
        .persistent()
        .get(&DataKey::Admin)
}

pub fn set_admin(env: &Env, admin: &Address) {
    env.storage()
        .persistent()
        .set(&DataKey::Admin, admin);
}

// ----------------------
// Token
// ----------------------

pub fn get_token(env: &Env) -> Option<Address> {
    env.storage()
        .persistent()
        .get(&DataKey::Token)
}

pub fn set_token(env: &Env, token: &Address) {
    env.storage()
        .persistent()
        .set(&DataKey::Token, token);
}

// ----------------------
// Treasury
// ----------------------

pub fn get_treasury(env: &Env) -> Option<Treasury> {
    env.storage()
        .persistent()
        .get(&DataKey::Treasury)
}

pub fn save_treasury(
    env: &Env,
    treasury: &Treasury,
) {
    env.storage()
        .persistent()
        .set(&DataKey::Treasury, treasury);
}