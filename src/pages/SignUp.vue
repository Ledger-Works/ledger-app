<template>
  <div class="flex items-center justify-center h-screen">
    <Button
      variant="outline"
      class="shadow-md p-4 px-8"
      @click="authenticateUser"
    >
      Sign in with google
    </Button>
  </div>
</template>
  
  
  <script setup lang="ts">
  import useGooglSheets from '@/composables/useGoogleSheets';
  import { Button } from "@/components/ui/button";
  const { authenticateUser } = useGooglSheets()
  </script>
  