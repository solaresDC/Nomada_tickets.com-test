/**
 * Pricing Service
 * 
 * Calculates ticket prices and fees.
 * Prices are in CAD (Canadian Dollars).
 * 
 * Current pricing:
 * - Female ticket: $1.00 CAD
 * - Male ticket: $2.00 CAD
 * - Fee: 8% of subtotal (TODO: Replace with real payment processor fee)
 */

// Price per ticket type in dollars
const FEMALE_TICKET_PRICE = 1.00; // CAD
const MALE_TICKET_PRICE = 2.00;   // CAD

// Fee percentage (TODO: Replace with actual Stripe fee calculation later)
const FEE_PERCENTAGE = 0.08; // 8%

export interface PricingResult {
  subtotal: number;  // Total before fees (in dollars)
  fee: number;       // Processing fee (in dollars)
  total: number;     // Final amount (in dollars)
}

/**
 * Calculates the pricing breakdown for a ticket order.
 * 
 * @param femaleQty - Number of female tickets
 * @param maleQty - Number of male tickets
 * @returns Pricing breakdown with subtotal, fee, and total
 */
export function calculatePricing(femaleQty: number, maleQty: number): PricingResult {
  // Calculate subtotal
  const subtotal = (femaleQty * FEMALE_TICKET_PRICE) + (maleQty * MALE_TICKET_PRICE);
  
  // Calculate fee (rounded to 2 decimal places)
  const fee = Math.round(subtotal * FEE_PERCENTAGE * 100) / 100;
  
  // Calculate total
  const total = subtotal + fee;
  
  return {
    subtotal,
    fee,
    total
  };
}

/**
 * Converts a dollar amount to cents (for Stripe).
 * Stripe requires amounts in the smallest currency unit.
 * 
 * @param dollars - Amount in dollars
 * @returns Amount in cents
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}