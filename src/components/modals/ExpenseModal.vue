<template>
  <FullScreenModal
    title="Category"
    description="Add your expenses under the appropriate categories for more accurate financial insights."
  >
    <template #trigger>
      <Button
        variant="outline"
        size="icon"
        class="mr-2 p-2"
      >
        <template v-if="currentExpense.expenseType.value">
          {{ expenseTypes[currentExpense.expenseType.value].icon }}
        </template>
        <div v-else>
          🛍️
        </div>
      </Button>
    </template>
    <template #content>
      <ExpenseTypeList
        :expense-types="expenseTypes"
        @save:expense-type="emits('save:expense-type', $event)"
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
import ExpenseTypeList from "@/components/expenses/ExpenseTypeList.vue";
import type { Expense, ExpenseType } from "@/types";
import { Button } from "@/components/ui/button";
import FullScreenModal from "@/components/ui/modal/FullScreenModal.vue";

const emits = defineEmits<{
  'save:expense-type': [value: string]
}>()

defineProps<{
   expenseTypes: Record<string, ExpenseType>
   currentExpense: Expense
}>()
</script>