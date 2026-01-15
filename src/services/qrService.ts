/**
 * QR Code Service
 * 
 * Generates secure QR code tokens and images.
 * QR codes are only generated after payment confirmation.
 */

import crypto from 'node:crypto';
import QRCode from 'qrcode';

/**
 * Generates a cryptographically secure random token.
 * This token will be encoded in the QR code.
 * 
 * @returns A 64-character hexadecimal string
 */
export function generateQRToken(): string {
  // Generate 32 random bytes = 64 hex characters
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Generates a QR code image as a data URL.
 * The image can be displayed directly in an <img> tag.
 * 
 * @param token - The token to encode in the QR code
 * @returns A data URL string (data:image/png;base64,...)
 */
export async function generateQRCodeDataUrl(token: string): Promise<string> {
  try {
    // Generate PNG image as data URL
    const dataUrl = await QRCode.toDataURL(token, {
      errorCorrectionLevel: 'M',  // Medium error correction
      type: 'image/png',
      width: 300,                  // 300x300 pixels
      margin: 2,                   // White border
      color: {
        dark: '#000000',           // Black QR code
        light: '#FFFFFF'           // White background
      }
    });
    
    return dataUrl;
  } catch (error) {
    console.error('[QRService] Failed to generate QR code:', error);
    throw new Error('Failed to generate QR code image');
  }
}