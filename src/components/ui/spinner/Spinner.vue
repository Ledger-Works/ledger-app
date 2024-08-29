<template>
  <div class="flex items-center justify-center h-32">
    <div class="relative w-16 h-16">
      <div
        v-for="(_, index) in 8"
        :key="index"
        class="absolute w-3 h-3 bg-blue-500 rounded-full"
        :style="dotStyle(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'RevolvingLoader',
  setup() {
    const dotStyle = computed(() => (index: number) => ({
      animation: `revolve 1.5s linear infinite`,
      animationDelay: `${index * 0.1875}s`,
      transform: `rotate(${index * 45}deg) translateY(-10px)`,
    }))

    return { dotStyle }
  }
})
</script>

<style scoped>
@keyframes revolve {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>