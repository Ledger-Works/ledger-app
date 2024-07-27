<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>


<script setup lang="ts">
import useGoogleSheets from "@/composables/useGoogleSheets.ts";
import { ROUTE_NAMES } from "./constants";

const router = useRouter()


const { loadGapiScript, loadGisClientScript, getGoogleToken } = useGoogleSheets();

async function init() {
  try {
    console.log('init')
    await loadGapiScript()
    await loadGisClientScript()
    const token = await getGoogleToken()
    if (!token.value) {
      router.push({ name: ROUTE_NAMES.SIGN_UP})
    }
  } catch (error) {
    console.log(error)
  }
}

init()
</script>
