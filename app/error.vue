<template>
  <div class="container mx-auto px-4 py-20 text-center">
    <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">Oops, something went wrong!</h1>
    <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">We apologize for the inconvenience. Please try again later.</p>
    <NuxtLink to="/" class="px-6 py-3 gradient-bg text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
      Go Back Home
    </NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Error - Solid Rock Business Solutions',
})
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #2f93ff 0%, #0f70f5 100%);
}
</style>