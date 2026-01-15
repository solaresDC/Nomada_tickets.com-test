/**
 * Stripe Plugin
 * 
 * Initializes the Stripe client with our secret key.
 * Also provides helper functions for Stripe operations.
 */

import Stripe from 'stripe';

// Validate that STRIPE_SECRET_KEY is set
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

// Create Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',  // Use the latest API version
  typescript: true,
});

console.log('[Stripe] Client initialized');

/**
 * Verifies a Stripe webhook signature.
 * 
 * IMPORTANT: This must be called with the RAW request body (Buffer),
 * NOT the parsed JSON. Stripe's signature verification requires
 * the exact bytes that were sent.
 * 
 * @param payload - Raw request body (Buffer)
 * @param signature - Stripe-Signature header value
 * @returns The verified Stripe Event
 * @throws Error if signature verification fails
 */
export function verifyWebhookSignature(
  payload: Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required');
  }
  
  // This will throw an error if verification fails
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}