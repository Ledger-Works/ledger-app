<script setup lang="ts">
import ShoppingBagIcon from '@/components/icons/ShoppingBagIcon.vue';
</script>

<template>
  <div class="flex items-center w-full justify-between">
    <div class="flex gap-x-2">
      <ShoppingBagIcon class="w-10 h-10" />
      <div class="">
        <div class="text-md">
          Shopping
        </div>
        <div class="text-sm">
          Buy some grocery
        </div>
      </div>
    </div>
    <div>
      -$120
    </div>
  </div>
</template>