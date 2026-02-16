<template>
  <section class="py-20 bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16 fade-in">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">What Our Clients Say</h2>
        <div class="h-1 w-20 bg-trust-blue-600 mx-auto"></div>
        <p class="text-lg text-gray-600 dark:text-gray-400 mt-6 max-w-3xl mx-auto">
          Hear from businesses that have transformed their Finance, Compensation and Benefits operations with our solutions.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg fade-in">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
              <span class="text-gray-500 text-xs">{{ getInitials(testimonial.name) }}</span>
            </div>
            <div>
              <h4 class="font-bold text-gray-800 dark:text-white">{{ testimonial.name }}</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">{{ testimonial.role }}</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-400 italic">"{{ testimonial.quote }}"</p>
          <div class="flex mt-4 text-yellow-400">
            <StarIcon v-for="star in 5" :key="star" class="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/24/solid'

const testimonials = [
  {
    name: 'John Smith',
    role: 'CEO, TechCorp',
    quote: 'Solid Rock Business Solutions helped us streamline our compensation and benefits processes and strengthen our financial controls. Their integrated approach saved us time and improved our bottom line.'
  },
  {
    name: 'Sarah Johnson',
    role: 'HR Director, Global Inc',
    quote: 'The Compensation and Benefits solutions provided by Solid Rock were tailored to our specific needs. They truly understand how to put people on good grounds for success.'
  },
  {
    name: 'Michael Brown',
    role: 'Finance Manager, Enterprise Ltd',
    quote: 'Their financial governance framework helped us achieve better compliance and transparency. Highly recommended for any business looking to strengthen their financial foundation.'
  }
]

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}
</script>