# Ticket Backend API

Backend API for the ticket site, built with Node.js, TypeScript, and Fastify.

## Prerequisites

- Node.js 18+ installed
- Stripe account (test mode)
- Stripe CLI (for testing webhooks locally)

## Setup

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```

3. Copy environment file:
```bash
   cp .env.example .env
```

4. Edit `.env` and add your Stripe keys:
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (starts with `sk_test_`)
   - `STRIPE_WEBHOOK_SECRET`: Webhook secret (see below)

## Getting the Webhook Secret

For local development, use Stripe CLI:
```bash
# Start webhook forwarding
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the webhook signing secret that appears (starts with whsec_)
# Add it to your .env file
```

## Running Locally

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm run build
npm run start
```

## API Endpoints

### POST /api/checkout/create-intent
Creates a Stripe PaymentIntent.

Request:
```json
{
  "femaleQty": 2,
  "maleQty": 1,
  "language": "en"
}
```

Response:
```json
{
  "clientSecret": "pi_..._secret_...",
  "paymentIntentId": "pi_...",
  "pricing": {
    "subtotal": 4.00,
    "fee": 0.32,
    "total": 4.32
  }
}
```

### POST /api/webhooks/stripe
Receives Stripe webhook events. Handles `payment_intent.succeeded`.

### GET /api/orders/:paymentIntentId/qr
Gets QR code for completed order.

Response (pending):
```json
{
  "status": "pending"
}
```

Response (ready):
```json
{
  "status": "ready",
  "qrToken": "abc123...",
  "qrImageDataUrl": "data:image/png;base64,..."
}
```

### GET /health
Health check endpoint.

## Deployment (Render)

1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm run start`
5. Add environment variables:
   - `NODE_ENV`: `production`
   - `STRIPE_SECRET_KEY`: Your production Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Webhook secret from Stripe Dashboard
   - `FRONTEND_ORIGIN`: Your frontend URL

## Future Database Migration

To replace in-memory storage with PostgreSQL:

1. Create `src/services/postgresOrderStore.ts` implementing `OrderStore` interface
2. Update imports in `webhook.ts` and `orders.ts` to use the new store
3. Add database connection configuration

Files to modify:
- `src/services/postgresOrderStore.ts` (new file)
- `src/routes/webhook.ts` (change import)
- `src/routes/orders.ts` (change import)
```

5. **Save the file**

---

## Section D: Run It

### Step 16: Verify Your Files

Your project structure should look like this:
```
backend/
├── node_modules/
├── src/
│   ├── plugins/
│   │   ├── cors.ts
│   │   ├── helmet.ts
│   │   ├── rateLimit.ts
│   │   └── stripe.ts
│   ├── routes/
│   │   ├── checkout.ts
│   │   ├── orders.ts
│   │   └── webhook.ts
│   ├── services/
│   │   ├── inMemoryOrderStore.ts
│   │   ├── orderStore.ts
│   │   ├── pricingService.ts
│   │   └── qrService.ts
│   └── server.ts
├── .env
├── .env.example
├── package.json
├── README.md
└── tsconfig.json
```

Check this by looking at the Explorer panel in VS Code.

---

### Step 17: Run the Server in Development Mode

1. **Make sure your `.env` file has your Stripe secret key:**
   - Click on `.env` in the Explorer
   - Verify `STRIPE_SECRET_KEY=sk_test_...` has your actual key

2. **Open the Terminal in VS Code:**
   - Click Terminal > New Terminal (or press `` Ctrl + ` ``)

3. **Run the development server:**
```
   npm run dev
```

4. **What you should see:**
```
   [Server] Registering plugins...
   [Webhook] ... (some logs)
   [CORS] Configured for development (all origins)
   [RateLimit] Configured: 100 requests per minute per IP
   [Helmet] Security headers configured
   [Server] Registering routes...
   ==================================================
   🚀 Server running at http://0.0.0.0:3000
   📋 Environment: development
   🔒 CORS Origin: all (development)
   ==================================================
```

**❌ If you see errors:**

| Error | Fix |
|-------|-----|
| `Cannot find module` | Run `npm install` again |
| `STRIPE_SECRET_KEY environment variable is required` | Make sure your `.env` file has `STRIPE_SECRET_KEY=sk_test_...` |
| `EADDRINUSE: address already in use` | Another program is using port 3000. Close it or change PORT in `.env` |

---

### Step 18: Test the Health Endpoint

1. **Open your web browser**

2. **Go to:**
```
   http://localhost:3000/health