/**
 * Order Store Interface
 * 
 * Defines the contract for storing order data.
 * This interface allows us to easily swap the implementation
 * from in-memory storage to a database (like Postgres) later.
 */

/**
 * Represents a completed order with QR code
 */
export interface Order {
  paymentIntentId: string;  // Stripe PaymentIntent ID
  qrToken: string;          // Random token encoded in QR code
  status: 'valid' | 'used' | 'cancelled';  // Order status
  createdAt: Date;          // When the order was created
  femaleQty: number;        // Number of female tickets
  maleQty: number;          // Number of male tickets
}

/**
 * Interface for order storage operations.
 * Implement this interface to create different storage backends.
 */
export interface OrderStore {
  /**
   * Save a new order
   * @param order - The order to save
   */
  saveOrder(order: Order): Promise<void>;
  
  /**
   * Get an order by PaymentIntent ID
   * @param paymentIntentId - The Stripe PaymentIntent ID
   * @returns The order if found, null otherwise
   */
  getOrderByPaymentIntentId(paymentIntentId: string): Promise<Order | null>;
  
  /**
   * Check if a PaymentIntent has already been processed
   * Used for webhook idempotency
   * @param paymentIntentId - The Stripe PaymentIntent ID
   * @returns true if already processed
   */
  isPaymentIntentProcessed(paymentIntentId: string): Promise<boolean>;
  
  /**
   * Mark a PaymentIntent as processed
   * @param paymentIntentId - The Stripe PaymentIntent ID
   */
  markPaymentIntentProcessed(paymentIntentId: string): Promise<void>;
}