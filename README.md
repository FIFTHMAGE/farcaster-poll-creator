# 🗳️ PollCaster - Farcaster Poll Creator

Create beautiful, interactive poll frames for Farcaster with premium templates and analytics.

## 🚀 Revenue Model

- **Free**: Basic polls with 2 templates
- **Premium Poll**: $3 per poll with all templates + analytics
- **Bulk Pack**: $20 for 10 premium polls (33% savings)

## ⚡ Quick Deploy (5 minutes)

### 1. Deploy to Vercel
```bash
npm install
npm run build
```

### 2. Set Environment Variables
```
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
RECIPIENT_WALLET_ADDRESS=0xYourWalletAddress
```

### 3. Database Setup
- Add Vercel Postgres or Supabase
- Replace mock `polls` object with real database calls

## 🎯 Features

### Free Tier
- 2 beautiful gradient templates
- Up to 4 poll options
- Basic vote counting
- Farcaster frame generation

### Premium ($3/poll)
- 6 stunning templates (sunset, forest, royal, cosmic)
- Unlimited poll options
- Advanced analytics dashboard
- CSV export of results
- Custom branding options

### Bulk Pack ($20/10 polls)
- All premium features
- 33% cost savings
- 6-month validity
- Priority support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Frames**: Farcaster Frames v2 spec
- **Payments**: USDC on Base (Coinbase OnchainKit + Wagmi)
- **Database**: Vercel Postgres (recommended)
- **Deploy**: Vercel (one-click)

## 📊 Revenue Projections

**Conservative (100 polls/month)**
- 70 free polls → $0
- 20 premium polls → $60
- 10 bulk purchases → $200
- **Monthly Revenue: $260**

**Growth (500 polls/month)**
- 300 free polls → $0  
- 100 premium polls → $300
- 100 bulk purchases → $2,000
- **Monthly Revenue: $2,300**

## 🎨 Templates

1. **Purple Gradient** (Free)
2. **Ocean Blue** (Free)  
3. **Sunset Vibes** (Premium)
4. **Forest Green** (Premium)
5. **Royal Gold** (Premium)
6. **Cosmic Purple** (Premium)

## 🔧 Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📈 Growth Strategy

1. **Launch**: Share on Farcaster with free polls
2. **Viral**: Premium templates drive upgrades
3. **Scale**: Add team features, white-label options
4. **Expand**: Analytics dashboard, A/B testing

## 💰 Monetization Features

- **USDC Payments**: Native crypto payments on Base
- **Instant Settlement**: No payment processor fees
- **Web3 Native**: Perfect for Farcaster audience
- **Premium Gating**: Template and feature restrictions
- **Bulk Discounts**: Volume pricing for power users

## 🔗 Farcaster-Native Payment Flow

1. User clicks "Pay $3 USDC" 
2. Payment frame URL generated & copied
3. User shares frame URL in Farcaster
4. Farcaster handles wallet connection automatically
5. USDC transfer executed on Base
6. Success frame shows transaction confirmation
7. Premium features instantly unlocked

**No external wallet connections needed!** Farcaster handles everything natively.

Ready to ship and start earning! 🚀