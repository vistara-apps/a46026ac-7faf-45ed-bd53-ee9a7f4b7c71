# Tracker Tokens

**Block trackers, earn tokens, own your data.**

A comprehensive privacy-focused platform that combines browser extension functionality with blockchain-based token rewards. Users earn Tracker Tokens (TT) by blocking online trackers and optionally sharing anonymized data, creating a sustainable privacy economy on Base.

## 🚀 Features

### Core Functionality
- **Proactive Tracker Blocking**: Automatically identifies and blocks known tracking scripts and cookies
- **Data Breach Alerts**: Monitors and notifies users about compromised personal information
- **Token Earning Mechanism**: Earn tokens through privacy-preserving activities
- **Token Utility**: Use earned tokens for premium features, exchanges, or gift cards

### Technical Implementation
- **Next.js Base Mini App**: Modern React application optimized for Base ecosystem
- **Farcaster Frame Integration**: Social media integration for token earning
- **Smart Contract on Base**: ERC-20 token with privacy-focused reward mechanisms
- **Browser Extension**: Chrome/Firefox extension for tracker blocking
- **Real-time Dashboard**: Live tracking statistics and token balance

## 🏗️ Architecture

### Frontend (Next.js)
- **Components**: Modular React components with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks with API integration
- **Real-time Updates**: Polling-based live data updates

### Backend (API Routes)
- **User Management**: `/api/user` - User profiles and settings
- **Tracker Data**: `/api/trackers` - Tracker blocking statistics
- **Notifications**: `/api/notifications` - Real-time alerts
- **Token Transactions**: `/api/tokens` - Transaction history
- **Breach Checking**: `/api/breach-check` - Data breach monitoring

### Smart Contracts (Base)
- **TrackerToken.sol**: ERC-20 token with privacy rewards
- **Reward Mechanisms**: Automated token distribution
- **Access Control**: Authorized minters for security

### Farcaster Integration
- **Frame API**: `/api/frame` - Farcaster Frame endpoints
- **Dynamic Images**: Generated frame images with user data
- **Social Actions**: Frame interactions for token earning

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Blockchain**: Base Network, Solidity, OpenZeppelin
- **APIs**: Farcaster API, HaveIBeenPwned API
- **Development**: Hardhat, Ethers.js, Wagmi, Viem
- **Deployment**: Vercel (frontend), Base (contracts)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or Coinbase Wallet
- Chrome/Firefox browser (for extension)

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd tracker-tokens
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_cdpdemo_key
BASE_RPC_URL=https://mainnet.base.org
ETHERSCAN_API_KEY=your_etherscan_key
PRIVATE_KEY=your_private_key
```

### 3. Smart Contract Deployment
```bash
# Install Hardhat dependencies
npm install

# Deploy to Base testnet
npx hardhat run scripts/deploy.js --network baseGoerli

# Deploy to Base mainnet
npx hardhat run scripts/deploy.js --network base
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📖 API Documentation

### User Management
```typescript
// Get user data
GET /api/user?userId=fc_fid_123

// Update user settings
PUT /api/user
{
  "userId": "fc_fid_123",
  "privacySettings": { ... },
  "optedInDataFlags": { ... }
}
```

### Token Transactions
```typescript
// Get transaction history
GET /api/tokens?userId=fc_fid_123&limit=10

// Record token earning
POST /api/tokens
{
  "userId": "fc_fid_123",
  "type": "earn",
  "amount": 0.05,
  "description": "Blocked 5 trackers"
}
```

### Data Breach Checking
```typescript
// Check for breaches
POST /api/breach-check
{
  "userId": "fc_fid_123",
  "email": "user@example.com"
}
```

## 🔧 Smart Contract

### TrackerToken.sol

**Key Features:**
- ERC-20 compliant token
- Privacy-focused reward mechanisms
- Activity cooldowns to prevent abuse
- Authorized minter system
- Emergency withdrawal functions

**Deployment:**
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network base
```

## 🎨 Design System

### Colors
- **Background**: `hsl(220, 30%, 8%)`
- **Foreground**: `hsl(210, 20%, 95%)`
- **Accent**: `hsl(45, 100%, 50%)` (Gold)
- **Primary**: `hsl(210, 70%, 53%)` (Blue)
- **Success**: `hsl(120, 60%, 50%)` (Green)

### Components
- `AppShell`: Main application layout
- `TokenBalanceDisplay`: Token balance with earning animations
- `TrackerList`: Tracker blocking statistics
- `NotificationBanner`: Real-time alerts
- `EarningMechanism`: Token earning configuration

## 🔒 Security Considerations

- **Privacy First**: All data sharing is anonymized and encrypted
- **Access Control**: Smart contract functions require authorization
- **Rate Limiting**: API endpoints include rate limiting
- **Input Validation**: All user inputs are validated and sanitized
- **Audit Ready**: Contracts designed for security audits

## 📊 Business Model

### Revenue Streams
1. **Premium Features**: Advanced blocking lists, analytics
2. **Token Purchases**: Optional token purchases for additional rewards
3. **Data Marketplace**: Aggregated, anonymized data insights
4. **Affiliate Programs**: Partner integrations

### Token Economics
- **Total Supply**: 1,000,000,000 TT
- **Initial Distribution**: 100,000,000 TT to platform
- **Earning Rates**:
  - Tracker blocked: 0.01 TT
  - Data sharing: 0.1 TT
  - Attention focus: 0.05 TT

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
npm run start
```

### Smart Contracts (Base)
```bash
npx hardhat verify --network base <CONTRACT_ADDRESS>
```

### Browser Extension
```bash
cd extension
npm install
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

- **Documentation**: [docs.tracker-tokens.com](https://docs.tracker-tokens.com)
- **Discord**: [discord.gg/tracker-tokens](https://discord.gg/tracker-tokens)
- **Twitter**: [@TrackerTokens](https://twitter.com/TrackerTokens)

## 🙏 Acknowledgments

- Base Network for the blockchain infrastructure
- Farcaster for social integration
- HaveIBeenPwned for breach data
- OpenZeppelin for secure smart contracts

