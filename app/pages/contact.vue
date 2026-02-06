<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 gradient-bg text-white">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
        <p class="text-xl opacity-90 max-w-3xl mx-auto">
          Ready to transform your business with our integrated Finance and HR solutions? We're here to help.
        </p>
      </div>
    </section>

    <!-- Contact Content Section -->
    <section class="py-20 bg-white dark:bg-dark-950 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div class="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">Let's Start a Conversation</h2>
            <div class="h-1 w-20 bg-trust-blue-600 mb-8"></div>

            <p class="text-lg text-gray-700 dark:text-gray-300 mb-10">
              Have questions about our Finance and HR services or ready to start a project? Reach out to us and our team will get back to you as soon as possible.
            </p>

            <div class="space-y-8">
              <div class="flex items-start">
                <div class="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white mr-6 flex-shrink-0">
                  <MapPinIcon class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Address</h3>
                  <p class="text-gray-600 dark:text-gray-400">Pretoria, South Africa</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white mr-6 flex-shrink-0">
                  <EnvelopeIcon class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Email</h3>
                  <p class="text-gray-600 dark:text-gray-400">info@solid-rock.co.za</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white mr-6 flex-shrink-0">
                  <PhoneIcon class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Phone</h3>
                  <p class="text-gray-600 dark:text-gray-400">083 387 9951 / 082 793 9655</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white mr-6 flex-shrink-0">
                  <ClockIcon class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Business Hours</h3>
                  <p class="text-gray-600 dark:text-gray-400">Monday - Friday: 8:00 AM - 4:30 PM</p>
                </div>
              </div>
            </div>

            <!-- Directors Contact -->
            <div class="mt-12">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6">Meet Our Directors</h3>
              <div class="space-y-6">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-trust-blue-100 dark:bg-trust-blue-900/30 flex items-center justify-center text-trust-blue-800 dark:text-trust-blue-200 mr-4">
                    <i class="fas fa-user-tie"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800 dark:text-white">Thabisile Macoba - Director: Finance</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-trust-blue-100 dark:bg-trust-blue-900/30 flex items-center justify-center text-trust-blue-800 dark:text-trust-blue-200 mr-4">
                    <i class="fas fa-user-tie"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800 dark:text-white">Amanda Mokoena - Director: Human Resources</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Media Links -->
            <div class="mt-12">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6">Follow Us</h3>
              <div class="flex space-x-4">
                <a href="#" class="w-12 h-12 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-trust-blue-600 hover:text-white transition-colors">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="w-12 h-12 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-trust-blue-600 hover:text-white transition-colors">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="w-12 h-12 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-trust-blue-600 hover:text-white transition-colors">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="w-12 h-12 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-trust-blue-600 hover:text-white transition-colors">
                  <i class="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="fade-in">
            <ContactForm />
          </div>
        </div>

        <!-- Map Section -->
        <div class="mt-20">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Our Location</h2>
          <div class="bg-gray-200 dark:bg-dark-800 rounded-xl h-96 flex items-center justify-center">
            <p class="text-gray-600 dark:text-gray-400">Map showing our location in Pretoria, South Africa</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { MapPinIcon, EnvelopeIcon, PhoneIcon, ClockIcon } from '@heroicons/vue/24/solid'
import ContactForm from '@/components/ContactPage/ContactForm.vue'

useHead({
  title: 'Contact Us - Solid Rock Business Solutions',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with Solid Rock Business Solutions. Contact us at info@solid-rock.co.za or call 083 387 9951 / 082 793 9655.'
    },
    {
      property: 'og:title',
      content: 'Contact Us - Solid Rock Business Solutions'
    },
    {
      property: 'og:description',
      content: 'Get in touch with Solid Rock Business Solutions. Contact us at info@solid-rock.co.za or call 083 387 9951 / 082 793 9655.'
    },
    {
      property: 'og:url',
      content: `${process.env.SITE_URL || 'https://solid-rock.co.za'}/contact`
    },
    {
      name: 'twitter:title',
      content: 'Contact Us - Solid Rock Business Solutions'
    },
    {
      name: 'twitter:description',
      content: 'Get in touch with Solid Rock Business Solutions. Contact us at info@solid-rock.co.za or call 083 387 9951 / 082 793 9655.'
    }
  ]
})

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.gradient-bg {
  background: linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%); /* Trust Blue to Aquamarine */
}
</style>