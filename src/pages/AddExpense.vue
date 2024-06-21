<template>
  <div class="add-expense-container flex items-center">
    <Card class="border-none shadow-none w-full my-6">
      <CardContent>
        <form>
          <div class="grid items-center w-full gap-4">
            <div class="flex">
              <ExpenseModal
                :expense-types="expenseTypes"
                :current-expense="currentExpense"
                @save:expense-type="selectExpenseType"
              />
              <Input
                id="name"
                v-model="userInputExpenseType"
                placeholder="Enter a description"
              />
              <!-- @input="determineExpenseType" -->
            </div>
            <div class="flex">
              <CurrencyModal
                :currencies="listCurrencies"
                :current-currency="currentCurrency"
                @save:currency="setCurrentCurrency"
              />
              <Input
                id="name"
                placeholder="0.00"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    <ExpenseFooter
      :current-date="currentExpense.time"
      @save:calendar="setCurrentExpenseDate"
      @save:data="saveData"
    />
  </div>
</template>
<script setup lang="ts">
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ExpenseFooter from "@/components/expenses/ExpenseFooter.vue";
import ExpenseModal from "@/components/modals/ExpenseModal.vue";
import CurrencyModal from "@/components/modals/CurrencyModal.vue";
import { useExpenses } from "@/composables/useExpenses";
import { useCurrencies } from "@/composables/useCurrencies";


const { currentCurrency } = useCurrencies()
const { 
  setCurrentExpenseDate,
  expenseTypes, 
  selectExpenseType, 
  userInputExpenseType, 
  addExpense,
  currentExpense
} = useExpenses()

const router = useRouter()

const { loadCurrencies, listCurrencies, setCurrentCurrency } = useCurrencies()

const saveData = async () => {
  try {
    await addExpense()
  } catch (error) {
    // TODO: Error Handling in Future
    // console.error(error)
  }
}

loadCurrencies()
</script>
