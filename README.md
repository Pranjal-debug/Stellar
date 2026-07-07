# Stellar Crowdfunding DApp

A decentralized crowdfunding platform built on the **Stellar Soroban** smart contract platform. The application allows users to create fundraising campaigns, donate securely using Stellar assets, manage campaigns, and withdraw funds after campaigns are completed.

## Features

* Connect Stellar wallet
* Create crowdfunding campaigns
* View all active and closed campaigns
* View campaign details
* Donate to campaigns
* Live campaign progress tracking
* Campaign owner can close campaigns
* Campaign owner can withdraw raised funds
* Automatic wallet balance refresh after transactions
* Responsive React frontend
* Soroban smart contract backend

## Tech Stack

### Frontend

* React
* React Router
* Vite
* JavaScript
* CSS

### Blockchain

* Stellar Soroban
* Stellar SDK
* Freighter Wallet API
* Stellar Wallets Kit (prepared for multi-wallet support)

### Smart Contract

* Rust
* Soroban SDK

---

## Project Structure

```
Stellar_journey/
│
├── src/
│   ├── components/
│   │   ├── CampaignCard.jsx
│   │   ├── CreateCampaign.jsx
│   │   └── Navbar.jsx
│   │
│   ├── context/
│   │   └── WalletContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── CampaignDetails.jsx
│   │
│   ├── services/
│   │   ├── crowdfunding.js
│   │   └── stellar.js
│   │
│   ├── contracts/
│   │   └── crowdfunding/
│   │       └── Rust Soroban Contract
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── README.md
```

---

## Smart Contract Functions

* `initialize()`
* `create_campaign()`
* `get_campaign()`
* `get_campaigns()`
* `get_campaign_count()`
* `donate()`
* `close_campaign()`
* `withdraw()`
* `get_donation()`

---

## How It Works

### 1. Connect Wallet

The user connects a Stellar wallet to the application.

### 2. Create Campaign

A campaign creator provides:

* Title
* Description
* Funding Goal
* Deadline

The campaign is stored on the Soroban blockchain.

### 3. Donate

Users can donate Stellar assets to any active campaign.

Each successful donation:

* Transfers tokens to the smart contract
* Updates the campaign's total raised amount
* Refreshes the wallet balance
* Updates campaign progress

### 4. Close Campaign

Only the campaign creator can close an active campaign.

After closing:

* Donations are disabled.
* The campaign status changes to Closed.

### 5. Withdraw Funds

Once the campaign is closed, the creator can withdraw the collected funds.

Funds can only be withdrawn once.

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd Stellar_journey
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Smart Contract

Build the contract:

```bash
stellar contract build
```

Deploy the contract:

```bash
stellar contract deploy \
  --alias crowdfunding \
  --source alice \
  --network testnet
```

Initialize the contract:

```bash
stellar contract invoke \
  --id crowdfunding \
  --source alice \
  --network testnet \
  -- initialize \
  --admin <ADMIN_ADDRESS> \
  --token <TOKEN_CONTRACT_ADDRESS>
```

---

## Wallet Support

Current implementation:

* Freighter Wallet

Prepared for future integration:

* Stellar Wallets Kit
* xBull
* Albedo
* Lobstr
* Rabet
* Hana
* WalletConnect compatible wallets

---

## Future Improvements

* Live blockchain event synchronization
* Campaign search and filtering
* Campaign categories
* Campaign images
* User dashboard
* Transaction history
* Better analytics
* Mobile-first UI improvements

---

## Screenshots


* Home page
  <img src="https://github.com/Pranjal-debug/Stellar/blob/main/ss/Screenshot%202026-07-07%20135921.png?raw=true">
* Campaign details
  <img src="https://github.com/Pranjal-debug/Stellar/blob/main/ss/Screenshot%202026-07-07%20140001.png?raw=true">
* Create campaign page
  <img src="https://github.com/Pranjal-debug/Stellar/blob/main/ss/Screenshot%202026-07-07%20140349.png?raw=true">
* Wallet connection
  <img src="https://github.com/Pranjal-debug/Stellar/blob/main/ss/Screenshot%202026-07-07%20135932.png?raw=true">

---

## License

This project is developed for learning and demonstrating decentralized application development on the Stellar Soroban platform.
