<script setup lang="ts"></script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>


<script setup lang="ts">
import useGoogleSheets from "@/composables/useGoogleSheets.ts";

const { loadGapiScript, loadGisClientScript, listSheets } = useGoogleSheets();

async function init() {
  try {
    await loadGapiScript()
    await loadGisClientScript()
  } catch (error) {
    console.log(error)
  }
}

init()
</script>
