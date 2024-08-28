<script setup lang="ts">
import { Header } from '@/components/ui/header'
import { useErrors } from '@/composables/useErrors';
import ErrorModal from '@/components/modals/ErrorModal.vue'
const errors = useErrors()
</script>

<template>
  <div class="base-page">
    <Header title="Ledger" />
    <RouterView />
    <ErrorModal v-if="errors.isError" />
  </div>
</template>
