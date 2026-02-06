// server/utils/email.ts
import { type Transporter, type SendMailOptions } from 'nodemailer';
import { initSmtpTransporter, validateSmtpConfig, type SmtpProvider } from './smtp-config';
import { canSendEmail, validateEmailContent, validateRecipients } from './antispam';

let transporter: Transporter | null = null;

export const initEmailTransporter = (): Transporter => {
  if (transporter) {
    return transporter;
  }

  // Check if SMTP configuration is valid
  if (!validateSmtpConfig()) {
    console.warn('SMTP configuration not valid. Email sending will be simulated.');
    // Create a transport that simulates sending email without actually sending
    return {
      sendMail: async (options: any) => {
        console.log('Email simulation (not sent due to missing or invalid SMTP configuration):', {
          from: options.from,
          to: options.to,
          subject: options.subject,
          html: options.html,
          attachments: options.attachments
        });
        return {
          messageId: 'simulated-message-id',
          response: '250 Email simulated successfully'
        };
      }
    } as any;
  }

  try {
    transporter = initSmtpTransporter();
    return transporter;
  } catch (error) {
    console.error('Failed to initialize SMTP transporter:', error);
    console.warn('Email sending will be simulated due to transporter initialization failure.');
    // Create a transport that simulates sending email without actually sending
    return {
      sendMail: async (options: any) => {
        console.log('Email simulation (not sent due to transporter initialization failure):', {
          from: options.from,
          to: options.to,
          subject: options.subject,
          html: options.html,
          attachments: options.attachments
        });
        return {
          messageId: 'simulated-message-id',
          response: '250 Email simulated successfully'
        };
      }
    } as any;
  }
};

// Interface for email options including attachments
export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  attachments?: {
    filename: string;
    path?: string;
    content?: Buffer;
    contentType?: string;
  }[];
  // Anti-spam identifier (e.g., user ID or IP address)
  spamIdentifier?: string;
}

// Enhanced email sending function with attachment support and anti-spam measures
export const sendEmail = async (options: EmailOptions): Promise<{ success: boolean; messageId?: string; message: string }> => {
  // Use the provided spam identifier or default to a generic identifier
  const spamIdentifier = options.spamIdentifier || 'default';

  // Anti-spam: Check rate limiting
  const canSend = await canSendEmail(spamIdentifier);
  if (!canSend) {
    throw new Error(`Rate limit exceeded for identifier: ${spamIdentifier}. Please try again later.`);
  }

  // Anti-spam: Validate email content
  const contentValidation = validateEmailContent(options.subject, options.html, options.text);
  if (!contentValidation.isValid) {
    throw new Error(`Email content validation failed: ${contentValidation.reason}`);
  }

  // Anti-spam: Validate recipients
  const recipientValidation = validateRecipients(options.to);
  if (!recipientValidation.isValid) {
    throw new Error(`Recipient validation failed: ${recipientValidation.reason}`);
  }

  const emailTransporter = initEmailTransporter();

  // Prepare mail options with attachment support
  const mailOptions: SendMailOptions = {
    from: options.from || process.env.DEFAULT_EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments
  };

  try {
    const info = await emailTransporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    // Check if the error is related to attachment size
    if ((error as Error).message.toLowerCase().includes('size') ||
        (error as Error).message.toLowerCase().includes('message too large') ||
        (error as Error).message.toLowerCase().includes('oversized')) {
      console.error('Possible attachment size issue. Current attachment size might exceed SMTP provider limits.');
    }
    throw new Error(`Failed to send email: ${(error as Error).message}`);
  }
};

// Legacy function signature support for backward compatibility
export const sendEmailLegacy = async (to: string, subject: string, html: string, from?: string, text?: string) => {
  return sendEmail({
    to,
    subject,
    html,
    from,
    text
  });
};