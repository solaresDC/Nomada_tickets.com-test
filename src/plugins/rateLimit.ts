/**
 * Rate Limit Plugin
 * 
 * Prevents abuse by limiting how many requests a single IP can make.
 * This protects against:
 * - Denial of Service (DoS) attacks
 * - Brute force attacks
 * - API abuse
 */

import rateLimit from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';

export async function registerRateLimit(app: FastifyInstance): Promise<void> {
  await app.register(rateLimit, {
    // Maximum 100 requests per minute per IP
    max: 100,
    
    // Time window in milliseconds (1 minute)
    timeWindow: 60 * 1000,
    
    // Custom error message
    errorResponseBuilder: function (request, context) {
      return {
        statusCode: 429,
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Try again in ${Math.round(context.ttl / 1000)} seconds.`
      };
    }
  });
  
  console.log('[RateLimit] Configured: 100 requests per minute per IP');
}