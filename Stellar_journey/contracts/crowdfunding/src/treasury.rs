use soroban_sdk::{contractclient, Address, Env};

#[contractclient(name = "TreasuryClient")]
pub trait TreasuryContract {
    fn deposit(
        env: Env,
        campaign_id: u32,
        from: Address,
        amount: i128,
    );

    fn withdraw(
        env: Env,
        campaign_id: u32,
        to: Address,
        amount: i128,
    );

    fn get_campaign_balance(
        env: Env,
        campaign_id: u32,
    ) -> i128;
}