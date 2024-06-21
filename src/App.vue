<script setup lang="ts"></script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>


<script setup lang="ts">
import useGoogleSheets from "@/composables/useGoogleSheets.ts";

const { loadGapiScript, loadGisClientScript } = useGoogleSheets();

loadGapiScript()
loadGisClientScript()
</script>
