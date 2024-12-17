import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || '0.0.0.0',
  maxMessages: process.env.MAX_MESSAGES || 100,
  maxUsers: process.env.MAX_USERS || 50,
  appName: process.env.APP_NAME || "Chat en Tiempo Real",
  appUrl: process.env.APP_URL || "http://localhost:8080"
}; 