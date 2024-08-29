<template>
  <div class="expense-list  m-4">
    <Button
      variant="outline"
      size="icon"
      class="shadow-md w-[150px] mb-4"
      @click="router.push(ROUTE_NAMES.ADD)"
    >
      Add Expense
    </Button>
    <br>
    Expenses
    {{ expenses }}
  </div>
</template>

<script setup lang="ts">
import { useExpenses } from '@/composables/useExpenses';
import { Button } from "@/components/ui/button";
import { ROUTE_NAMES } from '@/constants';
import { generateUUID } from '@/lib/utils';
const expenses = ref()
const router = useRouter()
onMounted(async () => {
   expenses.value = await useExpenses().fetchExpenses(generateUUID())
})
</script>