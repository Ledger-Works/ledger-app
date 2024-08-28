<template>
  <HalfScreenModal
    :title="errorData.title"
    :description="errorData.description"
  />
</template>
<script setup lang="ts">
import HalfScreenModal from "@/components/ui/modal/HalfScreenModal.vue";
import { useErrors } from "@/composables/useErrors";

const errors = useErrors()
const errorData = computed(() => {
    return {
        title: errors.errorTitle.value,
        description: errors.errorDescription.value,
    }
})
  </script>