<template>
  <div>
    {{ token }}<br>
    <button @click="authenticateUser">
      Sign in with google
    </button>
    <br>
    <button @click="listSheets">
      List Sheets
    </button>
  </div>
</template>

<script setup lang="ts">
import useGooglSheets from '@/composables/useGoogleSheets';

const { authenticateUser, listSheets, getGoogleToken } = useGooglSheets()
const token = ref()

async function init() {
  token.value = await getGoogleToken()
}
init()
</script>