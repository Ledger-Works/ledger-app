<template>
  <div class="add-expense-container flex items-center">
    <Card class="border-none shadow-none w-full my-6">
      <CardContent>
        <form>
          <div class="grid items-center w-full gap-4">
            <div class="flex">
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
                    <template v-if="currentExpenseType">
                      {{ expenseTypes[currentExpenseType] }}
                    </template>
                    <div v-else>
                      🛍️
                    </div>
                  </Button>
                </template>
                <template #content>
                  <ExpenseTypeList
                    :expense-types="expenseTypes"
                    @save:expense-type="selectExpenseType"
                  />
                </template>
                <template #close>
                  <div class="bg-background footer-bar p-4 px-5 w-[100vw] fixed bottom-0 left-0 border-solid border-2 flex flex-col-reverse">
                    <Button
                      type="submit"
                      variant="outline"
                    >
                      Save changes
                    </Button>
                  </div>
                </template>
              </FullScreenModal>
              <Input
                id="name"
                v-model="userInputExpenseType"
                placeholder="Enter a description"
                @input="determineExpenseType"
              />
            </div>
            <div class="flex">
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
                    @save:currency="setCurrentCurrency"
                  />
                </template>
                <template #close>
                  <div class="bg-background footer-bar p-4 px-5 w-[100vw] fixed bottom-0 left-0 border-solid border-2 flex flex-col-reverse">
                    <Button
                      type="submit"
                      variant="outline"
                    >
                      Save changes
                    </Button>
                  </div>
                </template>
              </FullScreenModal>
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
      :current-date="currentExpenseDate"
      @save:calendar="setCurrentExpenseDate"
    />
  </div>
</template>
<script setup lang="ts">
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FullScreenModal } from "@/components/ui/modal"
import ExpenseTypeList from "@/components/expenses/ExpenseTypeList.vue";
import CurrencyList from "@/components/expenses/CurrencyList.vue";
import ExpenseFooter from "@/components/expenses/ExpenseFooter.vue";
import { useExpenses } from "@/composables/useExpenses";
import { useCurrencies } from "@/composables/useCurrencies";


const { currentCurrency } = useCurrencies()
const { setCurrentExpenseDate, currentExpenseDate, expenseTypes, selectExpenseType, currentExpenseType, determineExpenseType, userInputExpenseType } = useExpenses()

const { loadCurrencies, listCurrencies: currencies, setCurrentCurrency } = useCurrencies()

loadCurrencies()
</script>
