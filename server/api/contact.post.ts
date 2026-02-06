// server/api/contact.post.ts
import type { H3Event } from 'h3'
import { sendEmail } from '../utils/email'
import { readMultipartFormData } from 'h3'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  'g-recaptcha-response'?: string
  emailTo?: string
}

// Function to determine MIME type based on file extension
const getMimeType = (filename: string): string => {
  const extension = filename.toLowerCase().split('.').pop() || '';

  const mimeTypes: Record<string, string> = {
    // Document formats
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

    // Image formats
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'svg': 'image/svg+xml',
    'webp': 'image/webp',

    // Text formats
    'txt': 'text/plain',
    'csv': 'text/csv',
    'html': 'text/html',
    'htm': 'text/html',

    // Archive formats
    'zip': 'application/zip',
    'rar': 'application/vnd.rar',
    'tar': 'application/x-tar',
    'gz': 'application/gzip',

    // Audio formats
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',

    // Video formats
    'mp4': 'video/mp4',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',

    // Default fallback
    'default': 'application/octet-stream'
  };

  return mimeTypes[extension] || mimeTypes.default;
};

export default defineEventHandler(async (event: H3Event) => {
  try {
    let formData: ContactFormData;
    let fileBuffer: Buffer | null = null;
    let fileName: string | null = null;

    // Check if the request is multipart/form-data (for file uploads)
    const contentType = event.node.req.headers['content-type'] || '';

    if (contentType.toLowerCase().includes('multipart/form-data')) {
      // Handle multipart form data with file upload
      const parts = await readMultipartFormData(event);

      const formFields: Record<string, any> = {};

      for (const part of parts) {
        if (part.name && part.data) {
          // Check if this is a file by looking at the presence of a filename
          // Sometimes the type might not be 'file' but the presence of a filename indicates a file
          if (part.type === 'file' || part.filename) {
            // Handle file attachment
            fileBuffer = Buffer.from(part.data);
            fileName = part.filename || 'attachment';
          } else {
            // Handle regular form fields
            formFields[part.name] = part.data.toString();
          }
        }
      }

      // Convert form fields to the expected format
      formData = {
        name: formFields.name,
        email: formFields.email,
        phone: formFields.phone || undefined,
        subject: formFields.subject,
        message: formFields.message,
        'g-recaptcha-response': formFields['g-recaptcha-response'],
        emailTo: formFields.emailTo
      };

    } else {
      // Handle regular JSON request (no file upload)
      const body = await readBody(event) as ContactFormData;
      formData = body;
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }

    // Check if the file is too large for the email provider
    if (fileBuffer && fileName) {
      const maxSizeForEmail = 25 * 1024 * 1024; // 25MB, typical limit for most email providers
      if (fileBuffer.length > maxSizeForEmail) {
        throw createError({
          statusCode: 400,
          statusMessage: `File size too large. Maximum allowed size is ${maxSizeForEmail / (1024 * 1024)}MB`
        });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    // Verify reCAPTCHA if present
    if (formData['g-recaptcha-response']) {
      const recaptchaResponse = formData['g-recaptcha-response'];

      // Skip verification for dummy token used in development
      if (recaptchaResponse === 'dummy-token-for-development') {
        console.warn('Using dummy reCAPTCHA token - skipping verification (development mode)');
        // In a real implementation, you might want to skip reCAPTCHA verification in development
      } else {
        const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
        if (!recaptchaSecret) {
          throw new Error('reCAPTCHA secret key is not configured')
        }

        const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaResponse}`
        const recaptchaResponseData = await $fetch(recaptchaVerifyUrl, {
          method: 'POST'
        })

        // Type guard for recaptchaResponseData
        if (typeof recaptchaResponseData !== 'object' || recaptchaResponseData === null || !('success' in recaptchaResponseData)) {
          throw createError({
            statusCode: 500,
            statusMessage: 'Invalid response from reCAPTCHA service'
          })
        }

        if (recaptchaResponseData.success !== true) {
          throw createError({
            statusCode: 400,
            statusMessage: 'reCAPTCHA verification failed'
          })
        }
      }
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'reCAPTCHA verification required'
      })
    }

    // Format a beautiful HTML email with text alternative
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #ffffff; padding: 30px; border: 1px solid #e9ecef; }
            .footer { background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 0.9em; color: #6c757d; }
            .field { margin: 15px 0; }
            .field-label { font-weight: bold; color: #495057; }
            .field-value { margin-top: 5px; }
            .highlight { background-color: #e7f3ff; padding: 15px; border-left: 4px solid #0d6efd; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; color: #0d6efd;">New Contact Form Submission</h1>
            </div>

            <div class="content">
              <div class="highlight">
                <p style="margin: 0; font-size: 1.1em;"><strong>Subject:</strong> ${formData.subject}</p>
              </div>

              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${formData.name}</div>
              </div>

              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value">${formData.email}</div>
              </div>

              <div class="field">
                <div class="field-label">Phone</div>
                <div class="field-value">${formData.phone || 'Not provided'}</div>
              </div>

              <div class="field">
                <div class="field-label">Message</div>
                <div class="field-value" style="white-space: pre-line;">${formData.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>

            <div class="footer">
              <p>Sent from Solid Rock Business Solutions Contact Form</p>
              <p style="margin-top: 10px;">This email was automatically generated. Please do not reply directly to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Create a plain text version for email clients that don't support HTML
    const textEmail = `
      New Contact Form Submission

      Subject: ${formData.subject}

      Name: ${formData.name}

      Email: ${formData.email}

      Phone: ${formData.phone || 'Not provided'}

      Message:
      ${formData.message}

      --
      Sent from Solid Rock Business Solutions Contact Form
      This email was automatically generated. Please do not reply directly to this email.
    `;

    // Determine the recipient email address
    const recipientEmail = formData.emailTo || process.env.DEFAULT_EMAIL_TO || 'info@solid-rock.co.za';

    // Send email with both HTML and text versions using the new email system
    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: `Contact Form: ${formData.subject}`,
      html: htmlEmail,
      text: textEmail,
      from: process.env.DEFAULT_EMAIL_FROM,
      attachments: fileBuffer ? [{
        filename: fileName!,
        content: fileBuffer,
        contentType: getMimeType(fileName!)
      }] : undefined,
      spamIdentifier: event.node.req.socket.remoteAddress || 'unknown'
    })

    return {
      success: true,
      messageId: emailResult.messageId,
      message: 'Your message has been sent successfully!'
    }
  } catch (error: any) {
    console.error('Error processing contact form:', error)

    // Return error response
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Error processing contact form'
    })
  }
})