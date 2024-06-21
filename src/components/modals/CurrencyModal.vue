<template>
  <FullScreenModal
    title="Currency"
    description="Choose your preferred currency to manage and view your expenses accurately."
  >
    <template #trigger>
      <Button
        variant="outline"
        size="icon"
        class="mr-2 shadow-md p-2"
      >
        {{ currentCurrency?.symbol }}
      </Button>
    </template>
    <template #content>
      <CurrencyList
        v-if="currencies"
        :currencies="currencies"
        @save:currency="emits('save:currency', $event)"
      />
    </template>
    <template #close>
      <div
        class="bg-background footer-bar p-4 px-5 w-[100vw] fixed bottom-0 left-0 border-solid border-2 flex flex-col-reverse"
      >
        <Button
          type="submit"
          variant="outline"
        >
          Save changes
        </Button>
      </div>
    </template>
  </FullScreenModal>
</template>
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import CurrencyList from "@/components/expenses/CurrencyList.vue";
import FullScreenModal from "@/components/ui/modal/FullScreenModal.vue";
import type { Currency } from '@/types';

defineProps<{
    currencies?: Record<string, Currency>
    currentCurrency: Currency
}>()

const emits = defineEmits<{
  'save:currency': [value: Currency]
}>()
</script>