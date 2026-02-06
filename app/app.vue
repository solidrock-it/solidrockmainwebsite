<template>
  <div :class="[$colorMode.value === 'dark' ? 'dark' : '']">
    <NuxtLayout>
      <NuxtLoadingIndicator color="linear-gradient(to right, #1d4ed8, #0d9488)" :height="3" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
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
.gradient-bg {
  background: linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%); /* Trust Blue to Aquamarine */
}
.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
.dark .service-card:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}
</style>