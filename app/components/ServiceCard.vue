<template>
  <div class="bg-gray-50 dark:bg-dark-900 p-8 rounded-xl service-card transition-all duration-300 fade-in">
    <div class="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center text-white mb-6">
      <component :is="service.icon" class="w-6 h-6" />
    </div>
    <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">{{ service.title }}</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-6">{{ service.description }}</p>
    <details class="mt-4">
      <summary class="cursor-pointer text-trust-blue-600 font-medium flex items-center">
        More details
        <ChevronDownIcon class="ml-1 w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" />
      </summary>
      <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
        {{ service.details }}
      </div>
    </details>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const isOpen = ref(false)

// Toggle the open state when the details element is clicked
const toggleDetails = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
details > summary {
  list-style: none;
}

details > summary::-webkit-details-marker {
  display: none;
}
</style>