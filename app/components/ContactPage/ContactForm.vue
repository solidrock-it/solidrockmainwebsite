<template>
  <div class="bg-gray-50 dark:bg-dark-900 p-8 rounded-xl">
    <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send us a Message</h3>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
        <input
          v-model="formData.name"
          type="text"
          id="name"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-trust-blue-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          placeholder="Your name"
        >
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-trust-blue-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          placeholder="your@email.com"
        >
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
        <input
          v-model="formData.phone"
          type="tel"
          id="phone"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-trust-blue-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          placeholder="Your phone number"
        >
      </div>

      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label>
        <select
          v-model="formData.subject"
          id="subject"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-trust-blue-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
        >
          <option value="" disabled>Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="finance">Finance Solutions</option>
          <option value="hr">HR Consulting</option>
          <option value="governance">Financial Governance</option>
          <option value="training">Training & Development</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
        <textarea
          v-model="formData.message"
          id="message"
          required
          rows="5"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-trust-blue-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          placeholder="Your message..."
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full px-6 py-3 gradient-bg text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
        >
          <span v-if="!isSubmitting">Send Message</span>
          <span v-else class="flex items-center">
            <i class="fas fa-circle-notch fa-spin mr-2"></i>
            Sending...
          </span>
        </button>
      </div>

      <div v-if="submitStatus" :class="submitStatusClass" class="p-4 rounded-lg text-center">
        {{ submitStatus.message }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null)

// Function to execute reCAPTCHA
const executeRecaptcha = (action) => {
  return new Promise((resolve, reject) => {
    const config = useRuntimeConfig()
    const recaptchaSiteKey = config.public.recaptchaSiteKey
    if (!recaptchaSiteKey) {
      console.error('reCAPTCHA site key is not configured in runtime config');
      // For development or if reCAPTCHA key is not configured, return a dummy token
      resolve('dummy-token-for-development');
      return;
    }

    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(() => {
        grecaptcha.execute(recaptchaSiteKey, { action })
          .then(resolve)
          .catch(error => {
            console.error('reCAPTCHA execution error:', error);
            // If reCAPTCHA fails due to invalid key, return a dummy token for development
            resolve('dummy-token-for-development');
          })
      })
    } else {
      console.error('reCAPTCHA is not loaded');
      // For development or if reCAPTCHA library fails to load, return a dummy token
      resolve('dummy-token-for-development');
    }
  })
}

const submitForm = async () => {
  isSubmitting.value = true
  submitStatus.value = null

  try {
    // Execute reCAPTCHA
    const config = useRuntimeConfig()
    const recaptchaSiteKey = config.public.recaptchaSiteKey

    // Only execute reCAPTCHA if it's configured
    let token = 'dummy-token-for-development';
    if (recaptchaSiteKey) {
      token = await executeRecaptcha('contact_form')
    } else {
      console.warn('reCAPTCHA is not configured, using dummy token for development');
    }

    // Prepare form data with reCAPTCHA token
    const formDataWithRecaptcha = {
      ...formData,
      'g-recaptcha-response': token,
      // Use the default email from environment variable if available
      emailTo: undefined  // Let the backend use the default from environment variables
    }

    // Send form data to backend API
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: formDataWithRecaptcha
    })

    // Reset form
    Object.keys(formData).forEach(key => {
      formData[key] = ''
    })

    submitStatus.value = {
      type: 'success',
      message: response.message || 'Thank you for your message! We will get back to you soon.'
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    submitStatus.value = {
      type: 'error',
      message: error.data?.message || 'There was an error sending your message. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}

const submitStatusClass = computed(() => {
  if (!submitStatus.value) return '';
  return submitStatus.value.type === 'success'
    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
})
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%); /* Trust Blue to Aquamarine */
}
</style>