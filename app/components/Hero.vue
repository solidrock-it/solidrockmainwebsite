<template>
  <section class="hero-section relative py-32 text-white overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-trust-blue-900/80 to-trust-blue-600/70 z-0"></div>  <!-- Adjusted for better HR SOLUTIONS visibility -->

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-3xl mx-auto text-center fade-in">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Putting People on Good Grounds
        </h1>

        <div class="text-xl md:text-2xl lg:text-3xl mb-10 min-h-[2.5rem]">
          <span class="animated-word" :class="{ active: currentWordIndex === index, 'finance-word': index === 0, 'hr-word': index === 1, 'strategy-word': index === 2 }"
                v-for="(word, index) in words" :key="index">
            {{ word }}
          </span>
        </div>

        <p class="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
          At Solid Rock Business Solutions, we deliver integrated Finance and HR solutions that are practical, tailored, and directly aligned to strategy execution—driving measurable, sustainable results.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink to="/contact" class="px-8 py-3 bg-white text-trust-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
            Get Started
          </NuxtLink>
          <NuxtLink to="/services" class="px-8 py-3 bg-trust-blue-800 hover:bg-trust-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg">
            Our Services
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const words = ref(['FINANCE', 'HR SOLUTIONS', 'STRATEGY'])
const currentWordIndex = ref(0)

let interval

onMounted(() => {
  // Set up the word rotation animation
  interval = setInterval(() => {
    currentWordIndex.value = (currentWordIndex.value + 1) % words.value.length
  }, 3000) // Change word every 3 seconds

  // Set up intersection observer for fade-in animation
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

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),  /* Adjusted for better HR SOLUTIONS visibility */
              url('/images/background.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.animated-word {
  position: absolute;
  left: 0;
  right: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.animated-word.active {
  opacity: 1;
  transform: translateY(0);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* Subtle shadow for better visibility */
}

/* Different colors for each animated word */
.finance-word {
  color: #0d9488; /* aquamarine */
}

.hr-word {
  color: #3b82f6; /* bright blue - better contrast */
}

.strategy-word {
  color: #f59e0b; /* amber/yellow */
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>