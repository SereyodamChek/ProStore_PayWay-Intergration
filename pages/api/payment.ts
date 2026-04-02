import type { NextApiRequest, NextApiResponse } from 'next';
import { generateHash, generateTransactionId, PAYWAY_CONFIG } from '../../lib/payway';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, firstName, lastName, email, phone, returnParams } = req.body;

  if (!amount || !firstName || !lastName || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const reqTime = Math.floor(Date.now() / 1000).toString();
  const transactionId = generateTransactionId();
  const merchantId = PAYWAY_CONFIG.merchantId;

  const hashStr = reqTime + merchantId + transactionId + amount + firstName + lastName + email + phone + (returnParams || '');
  const hash = generateHash(hashStr);

  res.status(200).json({
    hash,
    transactionId,
    reqTime,
    merchantId,
    apiUrl: PAYWAY_CONFIG.apiUrl,
    amount,
    firstName,
    lastName,
    email,
    phone,
    returnParams: returnParams || '',
  });
}
