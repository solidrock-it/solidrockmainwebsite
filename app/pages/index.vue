<template>
  <div>
    <Hero />

    <!-- Features Section -->
    <section class="py-20 bg-white dark:bg-dark-950 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 fade-in">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Why Choose Solid Rock Business Solutions</h2>
          <div class="h-1 w-20 bg-trust-blue-600 mx-auto"></div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mt-6 max-w-3xl mx-auto">
            We are an independent professional services firm delivering integrated Finance, Compensation and Benefits solutions to businesses, development programmes, funds, and employer groups.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gray-50 dark:bg-dark-900 p-8 rounded-xl service-card transition-all duration-300 fade-in flex flex-col items-center text-center">
            <div class="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white mb-6">
              <i class="fas fa-chart-line text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Finance Solutions</h3>
            <p class="text-gray-600 dark:text-gray-400">External CFO, financial management, tax compliance, and project-based finance services for SMMEs and organizations.</p>
          </div>

          <div class="bg-gray-50 dark:bg-dark-900 p-8 rounded-xl service-card transition-all duration-300 fade-in flex flex-col items-center text-center">
            <div class="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white mb-6">
              <i class="fas fa-users text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Compensation & Benefits</h3>
            <p class="text-gray-600 dark:text-gray-400">Employee benefits, retirement funds, job evaluation, remuneration, and beneficiary tracing services.</p>
          </div>

          <div class="bg-gray-50 dark:bg-dark-900 p-8 rounded-xl service-card transition-all duration-300 fade-in flex flex-col items-center text-center">
            <div class="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white mb-6">
              <i class="fas fa-shield-alt text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Trusted Expertise</h3>
            <p class="text-gray-600 dark:text-gray-400">Led by seasoned professionals with 20+ years of experience across diverse industries, ensuring excellence.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section (Hidden for future use) -->
    <section class="py-20 gradient-bg text-white" v-if="false">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="fade-in">
            <div class="text-4xl md:text-5xl font-bold mb-2">50+</div>
            <div class="text-lg opacity-90">Projects Completed</div>
          </div>
          <div class="fade-in">
            <div class="text-4xl md:text-5xl font-bold mb-2">15+</div>
            <div class="text-lg opacity-90">Happy Clients</div>
          </div>
          <div class="fade-in">
            <div class="text-4xl md:text-5xl font-bold mb-2">10+</div>
            <div class="text-lg opacity-90">Years Experience</div>
          </div>
          <div class="fade-in">
            <div class="text-4xl md:text-5xl font-bold mb-2">12+</div>
            <div class="text-lg opacity-90">Experts Team</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section (Hidden for future use) -->
    <HomePageTestimonials v-if="false" />

    <!-- CTA Section -->
    <section class="py-20 bg-white dark:bg-dark-950 transition-colors duration-300">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto fade-in">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">Ready to Transform Your Business?</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-10">
            Let's discuss how our integrated Finance, Compensation and Benefits solutions can help you achieve your business goals and drive growth.
          </p>
          <NuxtLink to="/contact" class="px-8 py-3 gradient-bg text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg inline-block">
            Get Started
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Hero from '@/components/Hero.vue'
import HomePageTestimonials from '@/components/HomePage/Testimonials.vue'

useHead({
  title: 'Solid Rock Business Solutions - Integrated Finance and Compensation & Benefits Solutions',
  meta: [
    {
      name: 'description',
      content: 'Solid Rock Business Solutions delivers integrated Finance, Compensation and Benefits solutions that are practical, tailored, and directly aligned to strategy execution—driving measurable, sustainable results.'
    },
    {
      property: 'og:title',
      content: 'Solid Rock Business Solutions - Integrated Finance and Compensation & Benefits Solutions'
    },
    {
      property: 'og:description',
      content: 'Solid Rock Business Solutions delivers integrated Finance, Compensation and Benefits solutions that are practical, tailored, and directly aligned to strategy execution—driving measurable, sustainable results.'
    },
    {
      property: 'og:url',
      content: process.env.SITE_URL || 'https://solid-rock.co.za'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Solid Rock Business Solutions - Integrated Finance and Compensation & Benefits Solutions'
    },
    {
      name: 'twitter:description',
      content: 'Solid Rock Business Solutions delivers integrated Finance, Compensation and Benefits solutions that are practical, tailored, and directly aligned to strategy execution—driving measurable, sustainable results.'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: process.env.SITE_URL || 'https://solid-rock.co.za'
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