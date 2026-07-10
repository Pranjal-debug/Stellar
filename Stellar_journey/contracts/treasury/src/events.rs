use soroban_sdk::{contracttype, symbol_short, Address, Env};

#[derive(Clone)]
#[contracttype]
pub struct TreasuryFunded {
    pub from: Address,
    pub amount: i128,
}

impl TreasuryFunded {
    pub fn publish(&self, env: &Env) {
        env.events().publish(
            (symbol_short!("funded"),),
            self.clone(),
        );
    }
}

#[derive(Clone)]
#[contracttype]
pub struct TreasuryTransfer {
    pub campaign_id: u32,
    pub creator: Address,
    pub amount: i128,
}

impl TreasuryTransfer {
    pub fn publish(&self, env: &Env) {
        env.events().publish(
            (symbol_short!("transfer"),),
            self.clone(),
        );
    }
}

#[derive(Clone)]
#[contracttype]
pub struct AdminChanged {
    pub old_admin: Address,
    pub new_admin: Address,
}

impl AdminChanged {
    pub fn publish(&self, env: &Env) {
        env.events().publish(
            (symbol_short!("admin"),),
            self.clone(),
        );
    }
}

#[derive(Clone)]
#[contracttype]
pub struct Withdrawn {
    pub to: Address,
    pub amount: i128,
}

impl Withdrawn {
    pub fn publish(&self, env: &Env) {
        env.events().publish(
            (symbol_short!("withdrawn"),),
            self.clone(),
        );
    }
}