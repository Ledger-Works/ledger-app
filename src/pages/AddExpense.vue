<template>
  <div class="add-expense-container min-h-screen p-8 bg-white dark:bg-gray-900">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
      Add Expense
    </h1>
    <Card class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <CardContent class="p-6">
        <form @submit.prevent="saveData">
          <div class="space-y-4">
            <div class="flex flex-row sm:flex-row gap-4">
              <ExpenseModal
                :expense-types="expenseTypes"
                :current-expense="currentExpense"
                class="w-full sm:w-1/3"
                @save:expense-type="selectExpenseType"
              />
              <Input
                v-model="currentExpense.description"
                placeholder="Expense description"
                class="w-full sm:w-2/3"
              />
            </div>
            <div class="flex flex-row sm:flex-row gap-4">
              <CurrencyModal
                :currencies="listCurrencies"
                :current-currency="currentCurrency"
                class="w-full sm:w-1/3"
                @save:currency="setCurrentCurrency"
              />
              <Input
                v-model="currentExpense.amount"
                placeholder="Amount"
                class="w-full sm:w-2/3"
              />
            </div>
          </div>
          <Button
            class="mt-6 w-full sm:w-auto"
            type="submit"
          >
            Save Expense
          </Button>
        </form>
      </CardContent>
    </Card>
    <ExpenseFooter
      :current-date="currentExpense.time"
      class="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
      @save:calendar="setCurrentExpenseDate"
    />
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ExpenseFooter from "@/components/expenses/ExpenseFooter.vue";
import ExpenseModal from "@/components/modals/ExpenseModal.vue";
import CurrencyModal from "@/components/modals/CurrencyModal.vue";
import { useExpenses } from "@/composables/useExpenses";
import { useCurrencies } from "@/composables/useCurrencies";
import { ROUTE_NAMES } from "@/constants";
import { generateUUID } from "@/lib/utils";
import { useRouter } from 'vue-router';

const router = useRouter();
const { currentCurrency } = useCurrencies();
const {
  setCurrentExpenseDate,
  expenseTypes,
  selectExpenseType,
  addExpense,
  currentExpense
} = useExpenses();

const { loadCurrencies, listCurrencies, setCurrentCurrency } = useCurrencies();

const saveData = async () => {
  try {
    await addExpense(generateUUID());
    router.replace({ name: ROUTE_NAMES.EXPENSES });
  } catch (error) {
    console.error('Error saving expense:', error);
    // Here you might want to show an error message to the user
  }
};

loadCurrencies();
</script>

<style scoped>
/* Any component-specific styles can go here */
</style>