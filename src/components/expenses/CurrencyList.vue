<template>
  <div class="flex-1 flex flex-col gap-2 p-4 pt-0 pb-11">
    <Button
      v-for="(currency, index) in currencies"
      :key="index"
      type="submit"
      variant="outline"
      @click="emits('save:currency', currency)"
    >
      <div class="flex justify-between w-[100%]">
        <div class="currency-name max-w-[200px] text-ellipsis overflow-hidden">
          {{ currency.name }}({{ currency.symbol }})
        </div>
        <div class="currency-code">
          {{ currency.code }}
        </div>
      </div>
    </Button>
  </div>
</template>
    
<script setup lang="ts">
import { Button } from '../ui/button';
defineProps<{
  currencies: Record<string, Currency>
}>()

const emits = defineEmits<{
  'save:currency': [value: Currency]
}>()
</script>