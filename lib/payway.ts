import crypto from 'crypto';

export const PAYWAY_CONFIG = {
  merchantId: 'ec000262',
  apiKey: '308f1c5f450ff6d971bf8a805b4d18a6ef142464',
  apiUrl: 'https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase',
};

export function generateHash(str: string): string {
  return crypto
    .createHmac('sha512', PAYWAY_CONFIG.apiKey)
    .update(str)
    .digest('base64');
}

export function generateTransactionId(): string {
  return Date.now().toString();
}
