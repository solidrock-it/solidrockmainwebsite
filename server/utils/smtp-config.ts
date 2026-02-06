import { createTransport, type Transporter, type SendMailOptions } from 'nodemailer';
import type { Options } from 'nodemailer/lib/smtp-transport';

// Define the supported SMTP providers
export type SmtpProvider = 'gmail' | 'mailtrap' | 'mailgun' | 'sendgrid' | 'zoho' | 'ses';

// Define the configuration interface for each provider
export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean; // true for 465, false for other ports
  auth: {
    user: string;
    pass: string;
  };
  fromName?: string;
}

// Function to get the configuration for a specific provider
export const getSmtpConfig = (provider: SmtpProvider): SmtpConfig => {
  const prefix = `SMTP_${provider.toUpperCase()}`;

  const config: SmtpConfig = {
    host: process.env[`${prefix}_HOST`] || '',
    port: parseInt(process.env[`${prefix}_PORT`] || '587', 10),
    secure: process.env[`${prefix}_SECURE`] === 'true',
    auth: {
      user: process.env[`${prefix}_USER`] || '',
      pass: process.env[`${prefix}_PASS`] || '',
    },
    fromName: process.env[`${prefix}_FROM_NAME`],
  };

  // Validate required configuration
  if (!config.host || !config.auth.user || !config.auth.pass) {
    throw new Error(
      `Missing required SMTP configuration for ${provider}. Please set ${prefix}_HOST, ${prefix}_USER, and ${prefix}_PASS in your environment variables.`
    );
  }

  return config;
};

// Function to initialize the transporter based on the default provider
export const initSmtpTransporter = (): Transporter => {
  const defaultProvider = (process.env.DEFAULT_SMTP_PROVIDER || 'gmail').toLowerCase() as SmtpProvider;

  // Validate that the provider is supported
  const supportedProviders: SmtpProvider[] = ['gmail', 'mailtrap', 'mailgun', 'sendgrid', 'zoho', 'ses'];
  if (!supportedProviders.includes(defaultProvider)) {
    throw new Error(
      `Unsupported SMTP provider: ${defaultProvider}. Supported providers are: ${supportedProviders.join(', ')}`
    );
  }

  try {
    const config = getSmtpConfig(defaultProvider);
    return createTransport(config);
  } catch (error) {
    console.error(`Failed to initialize SMTP transporter for provider: ${defaultProvider}`, error);
    throw error;
  }
};

// Function to validate if all required environment variables are set for the default provider
export const validateSmtpConfig = (): boolean => {
  const defaultProvider = (process.env.DEFAULT_SMTP_PROVIDER || 'gmail').toLowerCase() as SmtpProvider;

  try {
    getSmtpConfig(defaultProvider);
    return true;
  } catch (error) {
    console.error('SMTP Configuration validation failed:', error);
    return false;
  }
};