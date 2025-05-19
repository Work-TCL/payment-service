require('dotenv').config();

export const PORT = process.env.PORT || 5005;
export const DB_URL = process.env.DB_URL || '';
export const ENCRYPT_DECRYPT_KEY = process.env.ENCRYPT_DECRYPT_KEY || '';
export const BACKEND_URL = process.env.BACKEND_URL || '';
export const SECRET_KEY = process.env.encrypt_decrypt_key || '';
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
export const FRONTEND_URL = process.env.FRONTEND_URL || "";