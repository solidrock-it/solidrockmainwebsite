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

      // Skip verification for dummy tokens used in development/testing
      if (recaptchaResponse === 'dummy-token-for-development' || recaptchaResponse === 'dummy-token-for-testing') {
        console.warn('Using dummy reCAPTCHA token - skipping verification (development/testing mode)');
        // In development/testing mode, we skip the verification but continue processing
      } else {
        const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
        if (!recaptchaSecret) {
          throw createError({
            statusCode: 500,
            statusMessage: 'reCAPTCHA secret key is not configured in environment variables'
          })
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
          console.error('reCAPTCHA verification failed:', recaptchaResponseData['error-codes']);
          throw createError({
            statusCode: 400,
            statusMessage: 'reCAPTCHA verification failed: ' + (recaptchaResponseData['error-codes']?.join(', ') || 'Unknown error')
          })
        }

        console.log('reCAPTCHA verification successful');
      }
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'reCAPTCHA verification required'
      })
    }

    // Format a beautiful HTML email with text alternative that matches website styling
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 0; 
              background-color: #f5f7fa;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
              background-color: #ffffff;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background: linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%); 
              padding: 30px 20px; 
              text-align: center; 
              color: white;
              border-radius: 8px 8px 0 0;
            }
            .logo { 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 10px;
              color: white;
            }
            .title { 
              font-size: 22px; 
              margin: 0; 
              color: white;
            }
            .content { 
              background-color: #ffffff; 
              padding: 30px; 
              border: 1px solid #e9ecef; 
              border-top: none;
            }
            .footer { 
              background-color: #f8fafc; 
              padding: 20px; 
              text-align: center; 
              border-radius: 0 0 8px 8px; 
              font-size: 0.9em; 
              color: #64748b; 
              border-top: 1px solid #e2e8f0;
            }
            .field { 
              margin: 20px 0; 
              padding: 15px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            .field:last-child { 
              border-bottom: none;
            }
            .field-label { 
              font-weight: bold; 
              color: #1e293b; 
              font-size: 16px;
              display: block;
              margin-bottom: 8px;
            }
            .field-value { 
              margin-top: 5px; 
              color: #334155;
              font-size: 16px;
              line-height: 1.5;
            }
            .highlight { 
              background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%); 
              padding: 20px; 
              border-radius: 8px; 
              margin: 20px 0; 
              border-left: 4px solid #3b82f6;
            }
            .highlight strong { 
              color: #1e3a8a; 
            }
            .contact-info {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: 15px;
              margin-top: 20px;
            }
            .contact-item {
              flex: 1;
              min-width: 200px;
              background: #f8fafc;
              padding: 15px;
              border-radius: 6px;
              border-left: 3px solid #3b82f6;
            }
            .contact-label {
              font-weight: 600;
              color: #1e293b;
              margin-bottom: 5px;
              font-size: 14px;
            }
            .contact-value {
              color: #475569;
              font-size: 15px;
            }
            .disclaimer {
              margin-top: 25px;
              padding-top: 15px;
              border-top: 1px solid #e2e8f0;
              font-style: italic;
              color: #64748b;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Solid Rock Business Solutions</div>
              <h1 class="title">New Contact Form Submission</h1>
            </div>

            <div class="content">
              <div class="highlight">
                <p style="margin: 0; font-size: 18px;"><strong>Subject:</strong> ${formData.subject}</p>
              </div>

              <div class="field">
                <span class="field-label">Name</span>
                <div class="field-value">${formData.name}</div>
              </div>

              <div class="field">
                <span class="field-label">Email</span>
                <div class="field-value">${formData.email}</div>
              </div>

              <div class="field">
                <span class="field-label">Phone</span>
                <div class="field-value">${formData.phone || 'Not provided'}</div>
              </div>

              <div class="field">
                <span class="field-label">Message</span>
                <div class="field-value" style="white-space: pre-line;">${formData.message.replace(/\n/g, '<br>')}</div>
              </div>

              <div class="contact-info">
                <div class="contact-item">
                  <div class="contact-label">EMAIL</div>
                  <div class="contact-value">info@solid-rock.co.za</div>
                </div>
                <div class="contact-item">
                  <div class="contact-label">PHONE</div>
                  <div class="contact-value">083 387 9951 / 082 793 9655</div>
                </div>
                <div class="contact-item">
                  <div class="contact-label">ADDRESS</div>
                  <div class="contact-value">Edenvale, Johannesburg, South Africa</div>
                </div>
              </div>

              <div class="disclaimer">
                This email was automatically generated from the Solid Rock Business Solutions contact form. Please do not reply directly to this email.
              </div>
            </div>

            <div class="footer">
              <p>&copy; 2026 Solid Rock Business Solutions. All rights reserved.</p>
              <p style="margin-top: 10px;">Transforming businesses with integrated Finance and HR solutions</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Create a plain text version for email clients that don't support HTML
    const textEmail = `
      ==================================================
                   SOLID ROCK BUSINESS SOLUTIONS
      ==================================================
      
      NEW CONTACT FORM SUBMISSION
      --------------------------------------------------
      
      SUBJECT: ${formData.subject}
      
      NAME: ${formData.name}
      
      EMAIL: ${formData.email}
      
      PHONE: ${formData.phone || 'Not provided'}
      
      MESSAGE:
      ${formData.message}
      
      --------------------------------------------------
      CONTACT INFORMATION:
      Email: info@solid-rock.co.za
      Phone: 083 387 9951 / 082 793 9655
      Address: Edenvale, Johannesburg, South Africa
      --------------------------------------------------
      
      This email was automatically generated from the Solid Rock Business Solutions contact form.
      Please do not reply directly to this email.
      
      © 2026 Solid Rock Business Solutions. All rights reserved.
      Transforming businesses with integrated Finance and HR solutions
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