<script setup lang="ts">
import { Header } from '@/components/ui/header'
</script>

<template>
  <div class="base-page flex flex-col h-screen">
    <Header title="Ledger" />
    <RouterView class="flex-grow" />
  </div>
</template>
