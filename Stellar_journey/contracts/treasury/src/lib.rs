#![no_std]

mod admin;
mod errors;
mod events;
mod storage;
mod types;

use soroban_sdk::{contract, contractimpl, Address, Env};

use types::Treasury;

#[contract]
pub struct TreasuryContract;

#[contractimpl]
impl TreasuryContract {
    pub fn initialize(
        env: Env,
        admin: Address,
        token: Address,
    ) -> Result<(), errors::ContractError> {
        admin::initialize(env, admin, token)
    }

    pub fn deposit(
        env: Env,
        from: Address,
        amount: i128,
    ) -> Result<(), errors::ContractError> {
        admin::deposit(
            env,
            from,
            amount,
        )
    }

    pub fn change_admin(
        env: Env,
        new_admin: Address,
    ) -> Result<(), errors::ContractError> {
        admin::change_admin(
            env,
            new_admin,
        )
    }

    pub fn get_treasury(
        env: Env,
    ) -> Treasury {
        admin::get_treasury(env)
    }

    pub fn withdraw(
        env: Env,
        to: Address,
        amount: i128,
    ) -> Result<(), errors::ContractError> {
        admin::withdraw(
            env,
            to,
            amount,
        )
    }
}