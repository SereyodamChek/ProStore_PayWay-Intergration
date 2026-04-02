# ProStore — Premium Subscriptions with ABA PayWay

A Next.js e-commerce store for purchasing digital subscriptions (ChatGPT, Grok, Gemini, CapCut, Canva Pro, YouTube Premium) with ABA PayWay payment integration.

## 🚀 Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Create a `.env.local` file in the root:
```env
PAYWAY_MERCHANT_ID=ec000262
PAYWAY_API_KEY=308f1c5f450ff6d971bf8a805b4d18a6ef142464
PAYWAY_API_URL=https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase
```

> ⚠️ For production, update `lib/payway.ts` to use `process.env` variables and switch to the live PayWay URL.

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
payway-shop/
├── pages/
│   ├── _app.tsx           # App wrapper
│   ├── index.tsx          # Main shop page
│   └── api/
│       └── payment.ts     # API route: generates HMAC-SHA512 hash
├── components/
│   ├── ProductCard.tsx    # Product display card
│   └── CheckoutModal.tsx  # Checkout form + PayWay integration
├── lib/
│   ├── products.ts        # Product catalog data
│   └── payway.ts          # PayWay config & hash utility
└── styles/
    ├── globals.css
    ├── Home.module.css
    ├── ProductCard.module.css
    └── Checkout.module.css
```

## 💳 How ABA PayWay Works

1. User clicks "Buy Now" → opens checkout modal
2. User fills in name, email, phone
3. Frontend calls `/api/payment` → server generates HMAC-SHA512 hash
4. A hidden form is dynamically created and submitted to ABA PayWay
5. ABA PayWay popup handles card/ABA Pay/KHQR payment
6. On success, PayWay redirects back with result

## 🔐 Security Notes

- The HMAC-SHA512 hash is computed **server-side** in `/api/payment.ts`
- **Never expose your API key on the client side**
- For production, move credentials to `.env.local` and use `process.env`
- Switch from sandbox to production PayWay URL when going live

## 🛒 Products Included

| Product | Price/month |
|---------|------------|
| ChatGPT Plus | $20.00 |
| Grok Pro | $16.00 |
| Google Gemini Advanced | $19.99 |
| CapCut Pro | $9.99 |
| Canva Pro | $12.99 |
| YouTube Premium | $13.99 |

## 🔧 Customization

- **Add products**: Edit `lib/products.ts`
- **Change prices**: Update `price` field in each product
- **Production PayWay URL**: `https://checkout.payway.com.kh/api/payment-gateway/v1/payments/purchase`
- **Production JS SDK**: `https://checkout.payway.com.kh/plugins/checkout2-0.js`
