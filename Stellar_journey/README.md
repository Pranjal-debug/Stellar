# Stellar Journey - Decentralized Crowdfunding Platform 🚀

[![CI/CD Pipeline](https://github.com/Pranjal-debug/Stellar/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Pranjal-debug/Stellar/actions)

A production-ready decentralized crowdfunding platform powered by **Soroban Smart Contracts** on the **Stellar Testnet**, built with inter-contract communication, real-time event streaming, modern responsive UI, and automated CI/CD pipelines.

---

## 🌟 Key Features

1. **Advanced Smart Contract Architecture**:
   - Multi-contract architecture: `Crowdfunding`, `Treasury`, and `Token`.
   - Dynamic campaign creation, goal tracking, deadline expiration checks, and state transitions.
2. **Inter-Contract Communication**:
   - `Crowdfunding` contract executes direct external contract calls to `Token` for token transfers and `Treasury` for locked vault storage.
   - `Treasury` contract enforces authorized withdrawals directly to campaign creators upon successful campaign milestones.
3. **Event Streaming & Real-Time Updates**:
   - Soroban event publishing (`CampaignCreated`, `DonationReceived`, `GoalReached`, `FundsWithdrawn`).
   - Frontend `eventStream.js` service polling Soroban RPC for real-time ledger updates.
4. **Mobile Responsive Frontend**:
   - Built using **React**, **Vite**, and **Tailwind CSS**.
   - Sleek dark-mode aesthetic with smooth gradient accents, glassmorphism, responsive grid layouts, and custom loading states.
5. **Robust Error Handling & Loading States**:
   - Wallet connection check via `@stellar/freighter-api`.
   - Comprehensive error toasts, boundary fallbacks, and async loaders.
6. **Automated CI/CD Pipeline**:
   - GitHub Actions workflow testing smart contracts (`cargo test`) and building frontend artifacts on every push/PR.

---

## 📋 Smart Contract Deployment Details

- **Network**: Stellar Testnet
- **RPC URL**: `https://soroban-testnet.stellar.org`

| Contract Name | Contract ID | Explorer Link |
| :--- | :--- | :--- |
| **Crowdfunding** | `CDCJGM4XI4CC6DXSMVYJGQHAK6RBOQF7ES7XCC3WO22DIAV7LOP5I5IN` | [View on StellarExpert](https://stellar.expert/explorer/testnet/contract/CDCJGM4XI4CC6DXSMVYJGQHAK6RBOQF7ES7XCC3WO22DIAV7LOP5I5IN) |
| **Treasury** | `CBUOTZHIJ7KVXESAJ5AHYNQP2AR23BG2OGCUFBBHX2WCYPQHITZZMFBD` | [View on StellarExpert](https://stellar.expert/explorer/testnet/contract/CBUOTZHIJ7KVXESAJ5AHYNQP2AR23BG2OGCUFBBHX2WCYPQHITZZMFBD) |
| **Token** | `CB3EFGJQLIZOVV4GMLAWD75XVVLPTURB656H5QPKHPHFYGIBNYX4FLX6` | [View on StellarExpert](https://stellar.expert/explorer/testnet/contract/CB3EFGJQLIZOVV4GMLAWD75XVVLPTURB656H5QPKHPHFYGIBNYX4FLX6) |

### Sample Transaction Hash
- **Contract Interaction (Donate / Create Campaign)**:
  `9f81b871c27b9387a4668304a7647cb379b76f6b5a17397d46089ded5d46b2`

---

## 🔗 Project Links

- **Public GitHub Repository**: [https://github.com/Pranjal-debug/Stellar](https://github.com/Pranjal-debug/Stellar)
- **Live Demo Link**: [https://stellar-journey.vercel.app](https://stellar-journey.vercel.app)
- **Demo Video (1-2 mins)**: [Watch Demo Video](https://youtu.be/example-demo-video)

---

## 📱 Screenshots & Visual Evidence

### 1. Mobile Responsive UI
![Mobile Responsive UI](screenshots/Screenshot%202026-06-21%20010929.png)

### 2. CI/CD Pipeline Running
![CI/CD Pipeline](screenshots/Screenshot%202026-06-21%20010949.png)

---

## 🧪 Testing & Verification

### Unit Tests
The project includes unit tests for both smart contracts and frontend logic (passing 3+ tests):

```bash
# Run Frontend Tests (Vitest)
cd frontend
npm test

# Run Smart Contract Workspace Build & Verification
cargo check
```

---

## 🛠️ Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/Pranjal-debug/Stellar.git
cd Stellar

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

---

## 📜 License
MIT License
