<template>
    <header :class="['bg-white shadow-md', headerClass]">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <!-- Logo Slot -->
        <slot name="logo">
          <div class="flex items-center space-x-4">
            <img v-if="logoSrc" :src="logoSrc" alt="Logo" class="h-8 w-8" />
            <span class="text-xl font-bold text-gray-900">{{ title }}</span>
          </div>
        </slot>
  
        <!-- Navigation Links -->
        <nav class="hidden md:flex space-x-8">
          <slot name="nav-links">
            <template v-if="navItems">
                <a v-for="item in navItems" :key="item.text" :href="item.link" class="text-gray-700 hover:text-gray-900">
                    {{ item.text }}
                </a>
            </template>
          </slot>
        </nav>
  
        <!-- Mobile Menu Button -->
        <div v-if="navItems" class="md:hidden flex items-center">
          <button class="text-gray-700 focus:outline-none" @click="toggleMobileMenu">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
  
      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <nav class="px-4 py-2 space-y-2">
          <slot name="mobile-nav-links">
            <template v-if="navItems">
                <a v-for="item in navItems" :key="item.text" :href="item.link" class="block text-gray-700 hover:text-gray-900">
                    {{ item.text }}
                </a>
            </template>
          </slot>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  
  // Define component props
  defineProps({
    title: {
      type: String,
    },
    logoSrc: {
      type: String,
    },
    headerClass: {
      type: String,
      default: '',
    },
    navItems: {
      type: Array<{text: string; link: string}>,
    },
  });
  
  // Define component emits
  const emit = defineEmits(['toggle']);
  
  // State for mobile menu
  const mobileMenuOpen = ref(false);
  
  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    emit('toggle', mobileMenuOpen.value);
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  