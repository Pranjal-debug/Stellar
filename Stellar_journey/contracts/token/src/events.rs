use soroban_sdk::{
    contracttype,
    symbol_short,
    Address,
    Env,
};

#[derive(Clone)]
#[contracttype]
pub struct Minted {
    pub to: Address,
    pub amount: i128,
}

impl Minted {
    pub fn publish(&self, env: &Env) {
        env.events().publish(
            (symbol_short!("mint"),),
            self.clone(),
        );
    }
}

#[derive(Clone)]
#[contracttype]
pub struct Transfer {
    pub from: Address,
    pub to: Address,
    pub amount: i128,
}

impl Transfer {
    pub fn publish(&self, env: &Env) {
        env.events().publish(
            (symbol_short!("transfer"),),
            self.clone(),
        );
    }
}