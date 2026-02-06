<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 gradient-bg text-white">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
        <p class="text-xl opacity-90 max-w-3xl mx-auto">
          Comprehensive Finance and HR solutions tailored to drive your business forward with practical, measurable results.
        </p>
      </div>
    </section>

    <!-- Services Grid Section -->
    <section class="py-20 bg-white dark:bg-dark-950 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 fade-in">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Expertise</h2>
          <div class="h-1 w-20 bg-trust-blue-600 mx-auto"></div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mt-6 max-w-3xl mx-auto">
            We offer integrated Finance and HR solutions designed to meet your unique business needs.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            v-for="(service, index) in services"
            :key="index"
            :service="service"
          />
        </div>
      </div>
    </section>

    <!-- Industries We Serve Section -->
    <section class="py-20 bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 fade-in">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Industries We Serve</h2>
          <div class="h-1 w-20 bg-trust-blue-600 mx-auto"></div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mt-6 max-w-3xl mx-auto">
            We provide specialized Finance and HR solutions across various sectors.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(industry, index) in industries" :key="index" class="fade-in text-center">
            <div class="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center text-white mx-auto mb-4">
              <i :class="industry.icon" class="text-xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ industry.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 gradient-bg text-white">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto fade-in">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p class="text-xl opacity-90 mb-10">
            Let's discuss how our integrated Finance and HR solutions can help you achieve your business goals.
          </p>
          <NuxtLink to="/contact" class="px-8 py-3 bg-white text-trust-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-block">
            Get Started
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ServiceCard from '@/components/ServiceCard.vue'
import {
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  BriefcaseIcon
} from '@heroicons/vue/24/solid'

const services = [
  {
    icon: ChartBarIcon,
    title: 'Financial Strategy',
    description: 'Developing comprehensive financial strategies that align with your business objectives and ensure sustainable growth.',
    details: 'Our financial strategy services include budget planning, financial modeling, cash flow management, investment planning, and financial risk assessment.'
  },
  {
    icon: UserGroupIcon,
    title: 'HR Consulting',
    description: 'Providing expert guidance on human resources matters to ensure your workforce is engaged, productive, and compliant.',
    details: 'Our HR consulting services include policy development, compliance auditing, performance management systems, employee engagement strategies, and organizational development.'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Financial Governance',
    description: 'Strengthening financial governance frameworks to ensure transparency, accountability, and regulatory compliance.',
    details: 'We help establish robust financial controls, internal audit processes, board reporting mechanisms, and regulatory compliance frameworks.'
  },
  {
    icon: AcademicCapIcon,
    title: 'Training & Development',
    description: 'Offering tailored training programs to enhance the skills and capabilities of your finance and HR teams.',
    details: 'Our training services include financial literacy programs, HR best practices workshops, leadership development, and compliance training.'
  },
  {
    icon: BuildingOfficeIcon,
    title: 'Organizational Design',
    description: 'Designing organizational structures that optimize performance and align with your strategic objectives.',
    details: 'We provide services in organizational restructuring, role definition, reporting relationships, and change management.'
  },
  {
    icon: BriefcaseIcon,
    title: 'Strategic Planning',
    description: 'Facilitating strategic planning processes that translate vision into executable plans with measurable outcomes.',
    details: 'Our strategic planning services include vision and mission development, SWOT analysis, goal setting, KPI development, and strategy execution planning.'
  }
]

const industries = [
  { name: 'Corporate', icon: 'fas fa-building' },
  { name: 'SMME', icon: 'fas fa-store' },
  { name: 'Finance', icon: 'fas fa-coins' },
  { name: 'Healthcare', icon: 'fas fa-heartbeat' },
  { name: 'Education', icon: 'fas fa-graduation-cap' },
  { name: 'Manufacturing', icon: 'fas fa-industry' },
  { name: 'Retail', icon: 'fas fa-shopping-cart' },
  { name: 'Non-Profit', icon: 'fas fa-hand-holding-heart' }
]

useHead({
  title: 'Our Services - Solid Rock Business Solutions',
  meta: [
    {
      name: 'description',
      content: 'Discover our comprehensive Finance and HR services including financial strategy, HR consulting, financial governance, training & development, organizational design, and strategic planning.'
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