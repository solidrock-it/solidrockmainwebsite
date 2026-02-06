import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiter to prevent spam - limits emails per IP or user
const emailRateLimiter = new RateLimiterMemory({
  points: parseInt(process.env.ANTISPAM_EMAIL_LIMIT || '10'), // Number of emails allowed
  duration: parseInt(process.env.ANTISPAM_EMAIL_DURATION || '3600'), // Per duration in seconds (default: 1 hour)
});

// Function to check if an email can be sent based on rate limiting
export const canSendEmail = async (identifier: string): Promise<boolean> => {
  try {
    // Check if the identifier (e.g., IP address or user ID) has exceeded the rate limit
    await emailRateLimiter.consume(identifier);
    return true;
  } catch (rejRes) {
    // Rate limit exceeded
    return false;
  }
};

// Function to reset rate limiting for an identifier (useful for testing)
export const resetEmailRateLimit = async (identifier: string): Promise<void> => {
  await emailRateLimiter.delete(identifier);
};

// Function to validate email content for spam indicators
export const validateEmailContent = (subject: string, html: string, text?: string): { isValid: boolean; reason?: string } => {
  // Check for spam indicators in the email content
  const spamIndicators = [
    /free money/i,
    /click here now/i,
    /urgent action required/i,
    /congratulations you won/i,
    /viagra/i,
    /casino/i,
    /lottery/i,
    /nigerian prince/i,
    /make money fast/i,
    /\$\$\$|!!!/g, // excessive special characters
  ];

  const content = `${subject} ${html} ${text || ''}`.toLowerCase();

  for (const indicator of spamIndicators) {
    if (indicator.test(content)) {
      return {
        isValid: false,
        reason: `Spam indicator detected: ${indicator.toString()}`
      };
    }
  }

  // Check for excessive links (potential spam)
  const linkCount = (content.match(/http/gi) || []).length;
  if (linkCount > parseInt(process.env.ANTISPAM_MAX_LINKS || '5')) {
    return {
      isValid: false,
      reason: `Too many links in email (${linkCount} links, max allowed: ${process.env.ANTISPAM_MAX_LINKS || '5'})`
    };
  }

  // Check for excessive capitalization (potential spam)
  const capitalizationRatio = calculateCapitalizationRatio(content);
  if (capitalizationRatio > parseFloat(process.env.ANTISPAM_MAX_CAPS_RATIO || '0.7')) {
    return {
      isValid: false,
      reason: `Too much capitalization (${(capitalizationRatio * 100).toFixed(2)}%, max allowed: ${(parseFloat(process.env.ANTISPAM_MAX_CAPS_RATIO || '0.7') * 100).toFixed(2)}%)`
    };
  }

  return { isValid: true };
};

// Helper function to calculate the ratio of capitalized letters
const calculateCapitalizationRatio = (text: string): number => {
  const letters = text.match(/[a-zA-Z]/g);
  if (!letters || letters.length === 0) {
    return 0;
  }

  const capitalized = letters.filter(char => char === char.toUpperCase());
  return capitalized.length / letters.length;
};

// Function to validate email recipient list
export const validateRecipients = (recipients: string | string[]): { isValid: boolean; reason?: string } => {
  const recipientList = Array.isArray(recipients) ? recipients : [recipients];

  // Check if we have too many recipients (potential spam)
  if (recipientList.length > parseInt(process.env.ANTISPAM_MAX_RECIPIENTS || '10')) {
    return {
      isValid: false,
      reason: `Too many recipients (${recipientList.length}, max allowed: ${process.env.ANTISPAM_MAX_RECIPIENTS || '10'})`
    };
  }

  // Validate each email address format
  for (const recipient of recipientList) {
    if (!isValidEmail(recipient)) {
      return {
        isValid: false,
        reason: `Invalid email address format: ${recipient}`
      };
    }
  }

  return { isValid: true };
};

// Helper function to validate email address format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};