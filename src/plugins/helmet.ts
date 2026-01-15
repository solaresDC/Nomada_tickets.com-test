/**
 * Helmet Plugin
 * 
 * Adds security headers to all responses.
 * These headers help protect against common web vulnerabilities.
 */

import helmet from '@fastify/helmet';
import { FastifyInstance } from 'fastify';

export async function registerHelmet(app: FastifyInstance): Promise<void> {
  await app.register(helmet, {
    // Content Security Policy
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      }
    },
    
    // Prevent clickjacking
    frameguard: { action: 'deny' },
    
    // Hide X-Powered-By header
    hidePoweredBy: true,
    
    // Prevent MIME type sniffing
    noSniff: true,
    
    // XSS protection
    xssFilter: true
  });
  
  console.log('[Helmet] Security headers configured');
}