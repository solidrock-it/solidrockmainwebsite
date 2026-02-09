// Test script for contact form API endpoint
// Note: This test is primarily for development purposes
// In production, reCAPTCHA tokens must be obtained from the client-side reCAPTCHA API

import axios from 'axios';

async function testContactForm() {
  try {
    console.log('Testing contact form API endpoint...');

    // Test data for the contact form
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123-456-7890',
      subject: 'Test Subject',
      message: 'This is a test message from the contact form.',
      // For development/testing, we'll skip reCAPTCHA validation by using a dummy token
      // In production, the token would come from the client-side reCAPTCHA execution
      'g-recaptcha-response': 'dummy-token-for-testing',
      emailTo: 'info@solid-rock.co.za'
    };

    console.log('Sending POST request to /api/contact...');

    const response = await axios.post('http://localhost:3000/api/contact', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
    console.log('\n✓ Contact form test completed successfully!');
    console.log('The email should have been sent if SMTP is properly configured.');

  } catch (error) {
    console.error('Error occurred:');
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request Error:', error.request);
      console.error('This may indicate that the Nuxt server is not running on http://localhost:3000');
      console.error('Make sure to start the development server with: npm run dev');
    } else {
      console.error('General Error:', error.message);
    }
  }
}

// Run the test
testContactForm();