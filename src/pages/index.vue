<template>
  <div>
    <button @click="authenticateUser">
      Sign in with google
    </button>
  </div>
</template>

<script setup lang="ts">
import useGooglSheets from '@/composables/useGoogleSheets';

const {authenticateUser} = useGooglSheets()
</script>