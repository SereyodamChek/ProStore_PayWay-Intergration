<div align="center">

<img src="https://www.payway.com.kh/payway-logo.svg" alt="ABA PayWay" width="300" />

<br />
<br><img src="https://camo.githubusercontent.com/b4463a41d88367e1cb4a15591d611b01f64d41014d19ec5f15cb078e489af0dd/68747470733a2f2f65636f6c657061756c64756272756c652e6f72672f77702d636f6e74656e742f75706c6f6164732f323032342f30352f4142415f4c6f676f2e706e67" width="150" height="60" alt="ABA Logo" />


**Production-ready Next.js e-commerce template with ABA PayWay payment integration**

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](./LICENSE)


</div>

---

## Overview

**ProStore** is a modular Next.js template designed to help Cambodian e-commerce developers integrate **ABA PayWay** payment processing quickly and securely. Built with TypeScript, Tailwind CSS, and the Next.js Pages Router for maximum compatibility and ease of deployment.

| | |
|---|---|
| ✅ Sandbox & production environments | ✅ Webhook-ready API routes |
| ✅ Modular payment utilities | ✅ Type-safe with TypeScript |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| Language | TypeScript / JavaScript |
| Styling | Tailwind CSS + CSS Modules |
| Payment | ABA PayWay API (Sandbox & Production) |
| Tooling | ESLint · Prettier · TypeScript |

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/SereyodamChek/ProStore_PayWay-Intergration.git
cd ProStore_PayWay-Intergration

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your PayWay credentials

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Development Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint + TypeScript checks |
| `npm run type-check` | Verify TypeScript compilation |

---

## Environment Variables

Create a `.env` file in the project root (use `.env.example` as a template):

```env
# ABA PayWay
PAYWAY_API_URL=https://checkout-sandbox.payway.com.kh/api/v1
# Production: https://checkout.payway.com.kh/api/v1

PAYWAY_MERCHANT_ID=YOUR_MERCHANT_ID_HERE
PAYWAY_API_KEY=your_secret_api_key_here   # ⚠️ Never commit this

# Application URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
PAYWAY_RETURN_URL=http://localhost:3000/payment/return
PAYWAY_NOTIFY_URL=http://localhost:3000/api/payment/notify

# Security
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NODE_ENV=development
```

### Obtaining PayWay Credentials

1. Log in to the [ABA PayWay Sandbox Portal](https://checkout-sandbox.payway.com.kh/) (or production portal)
2. Navigate to **Settings → API Credentials**
3. Copy your `Merchant ID` and `API Key`
4. Confirm the `API URL` matches your target environment

---

## Integration Guide

### Payment Flow

```
User             ProStore            PayWay            Webhook
 │                  │                   │                  │
 │── Checkout ──▶   │                   │                  │
 │                  │── POST /create ──▶│                  │
 │                  │◀── payment_url ───│                  │
 │◀── Redirect ─────│                   │                  │
 │                  │                   │                  │
 │──── Complete payment ──────────────▶ │                  │
 │                  │                   │── POST notify ──▶│
 │                  │                   │                  │── Update order
 │◀──────────────── Redirect to return_url ────────────────│
```

### Key Files

| File | Purpose |
|---|---|
| `lib/payway.js` | PayWay API utilities — create payment, check status |
| `pages/api/payment/create.js` | Endpoint to initiate a PayWay payment request |
| `pages/api/payment/notify.js` | Webhook handler for PayWay callbacks |
| `components/PaymentModal.tsx` | Reusable payment UI component |
| `pages/payment/return.js` | Post-payment result page |

### Create Payment — Example

```javascript
// lib/payway.js
export async function createPayment({ orderId, amount, currency = 'USD' }) {
  const res = await fetch(`${process.env.PAYWAY_API_URL}/payment/create`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PAYWAY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      merchant_id: process.env.PAYWAY_MERCHANT_ID,
      order_id:    orderId,
      amount:      parseFloat(amount).toFixed(2),
      currency,
      return_url:  process.env.PAYWAY_RETURN_URL,
      notify_url:  process.env.PAYWAY_NOTIFY_URL,
    }),
  });

  if (!res.ok) throw new Error('PayWay API error');
  return res.json();
}
```

---

## Project Structure

```
ProStore_PayWay-Intergration/
├── components/
│   └── PaymentModal.tsx            # Reusable payment UI
├── lib/
│   └── payway.js                   # PayWay API helpers
├── pages/
│   ├── api/
│   │   └── payment/
│   │       ├── create.js           # Initiate payment
│   │       └── notify.js           # Webhook handler
│   ├── payment/
│   │   └── return.js               # Payment result page
│   ├── _app.js                     # App entry point
│   └── index.js                    # Home / checkout
├── styles/
│   ├── globals.css
│   └── PaymentModal.module.css
├── .env.example
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## Security Checklist

- **Never** expose `PAYWAY_API_KEY` in client-side code
- Validate all webhook requests (verify signatures if provided by PayWay)
- Use HTTPS in production for every endpoint
- Sanitize and validate all user inputs server-side
- Log payment events — exclude sensitive data
- Rotate API keys periodically via the PayWay portal
- Restrict `notify_url` to PayWay IP ranges (if documented)

---

## Troubleshooting

| Error | Likely Cause | Fix |
|---|---|---|
| `401 Unauthorized` | Invalid API key or Merchant ID | Verify credentials in the PayWay portal |
| Webhook not firing | `notify_url` not publicly accessible | Use ngrok for local testing (see below) |
| Redirect loop after payment | `return_url` mismatch | Ensure URL matches PayWay merchant settings exactly |
| TypeScript errors | Missing types or misconfigured tsconfig | Run `npm run type-check` and review `tsconfig.json` |
| CORS issues | API called from wrong origin | Configure allowed origins in Next.js middleware |

### Testing Webhooks Locally

```bash
# Expose your local server
npx ngrok http 3000

# Update your .env
PAYWAY_NOTIFY_URL=https://<your-ngrok-id>.ngrok.io/api/payment/notify
```

---

## Resources

| Resource | Link |
|---|---|
| Sandbox Portal | [checkout-sandbox.payway.com.kh](https://checkout-sandbox.payway.com.kh/) |
| Production Portal | [checkout.payway.com.kh](https://checkout.payway.com.kh/) |
| Developer Docs | [developer.payway.com.kh](https://developer.payway.com.kh/) |
| Support | [support@payway.com.kh](mailto:support@payway.com.kh) |

---

<div align="center">

© 2026 **ProStore**. All rights reserved.  
Provided for educational and integration purposes. Commercial use requires compliance with ABA PayWay terms of service.

*Empowering Cambodian commerce — one seamless payment at a time.* 🇰🇭

</div>
