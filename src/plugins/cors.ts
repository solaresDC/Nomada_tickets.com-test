/**
 * CORS Plugin
 * 
 * CORS (Cross-Origin Resource Sharing) controls which websites
 * can make requests to our API.
 * 
 * In production, this should only allow requests from our frontend domain.
 */

import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

export async function registerCors(app: FastifyInstance): Promise<void> {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5500';
  
  await app.register(cors, {
    // In development, allow all origins for easier testing
    // In production, only allow the configured frontend origin
    origin: isDevelopment ? true : frontendOrigin,
    
    // Allow these HTTP methods
    methods: ['GET', 'POST', 'OPTIONS'],
    
    // Allow these headers in requests
    allowedHeaders: ['Content-Type', 'Authorization'],
    
    // Allow credentials (cookies, authorization headers)
    credentials: true,
    
    // Cache preflight requests for 24 hours
    maxAge: 86400
  });
  
  console.log(`[CORS] Configured for ${isDevelopment ? 'development (all origins)' : `production (${frontendOrigin})`}`);
}