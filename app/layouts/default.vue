<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="py-2 bg-white dark:bg-dark-950 shadow-sm">
      <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center">
            <img src="/images/logo.png" alt="Solid Rock Business Solutions Logo" class="w-auto max-h-[62.5px]" />
          </NuxtLink>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex space-x-8">
            <NuxtLink 
              to="/" 
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              About
            </NuxtLink>
            <NuxtLink 
              to="/services" 
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Services
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Contact
            </NuxtLink>
          </div>
          
          <!-- Dark Mode Toggle -->
          <div class="mr-4 hidden md:block">
            <ColorScheme placeholder="..." tag="span">
              <button @click="toggleDark()" class="text-gray-600 dark:text-gray-300 focus:outline-none">
                <MoonIcon v-if="$colorMode.preference === 'light'" class="w-6 h-6" />
                <SunIcon v-else class="w-6 h-6" />
              </button>
            </ColorScheme>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-gray-600 dark:text-gray-300 focus:outline-none"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </nav>
        
        <!-- Mobile Navigation -->
        <div v-show="mobileMenuOpen" class="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col space-y-4">
            <!-- Dark Mode Toggle for Mobile -->
            <div class="flex items-center">
              <span class="mr-3 text-gray-600 dark:text-gray-300">Theme:</span>
              <ColorScheme placeholder="..." tag="span">
                <button @click="toggleDark()" class="text-gray-600 dark:text-gray-300 focus:outline-none">
                  <MoonIcon v-if="$colorMode.preference === 'light'" class="w-6 h-6" />
                  <SunIcon v-else class="w-6 h-6" />
                </button>
              </ColorScheme>
            </div>

            <NuxtLink
              to="/"
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              About
            </NuxtLink>
            <NuxtLink
              to="/services"
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              Services
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              Contact
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="py-12 bg-gray-900 text-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="mb-4">
              <img src="/images/logo.png" alt="Solid Rock Business Solutions Logo" class="w-auto max-h-[80px]" />
            </div>
            <p class="text-gray-400">
              Delivering integrated Finance and HR solutions that are practical, tailored, and directly aligned to strategy execution.
            </p>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">Home</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-gray-400 hover:text-white transition-colors">About Us</NuxtLink></li>
              <li><NuxtLink to="/services" class="text-gray-400 hover:text-white transition-colors">Services</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-gray-400 hover:text-white transition-colors">Contact</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Services</h4>
            <ul class="space-y-2">
              <li class="text-gray-400">Financial Strategy</li>
              <li class="text-gray-400">HR Consulting</li>
              <li class="text-gray-400">Financial Governance</li>
              <li class="text-gray-400">Training & Development</li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Contact Info</h4>
            <ul class="space-y-2 text-gray-400">
              <li class="flex items-start">
                <EnvelopeIcon class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>info@solid-rock.co.za</span>
              </li>
              <li class="flex items-start">
                <PhoneIcon class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>083 387 9951 / 082 793 9655</span>
              </li>
              <li class="flex items-start">
                <MapPinIcon class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>Edenvale, Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} Solid Rock Business Solutions. All rights reserved.</p>
          <p class="mt-2">"Putting People on Good Grounds"</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline'
import {
  MoonIcon,
  SunIcon
} from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)

// Dark mode toggle function
const colorMode = useColorMode()

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Close mobile menu when route changes
const route = useRoute()

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>