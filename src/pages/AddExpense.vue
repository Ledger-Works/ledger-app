<template>
  <div class="add-expense-container h-[300px] flex items-center">
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
                    <ShoppingCartIcon class="w-10 h-10" />
                  </Button>
                </template>
                <template #content>
                  <ExpenseTypeList />
                </template>
              </FullScreenModal>
              <Input
                id="name"
                placeholder="Enter a description"
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
                    <DollarIcon class="w-10 h-10" />
                  </Button>
                </template>
                <template #content>
                  <CurrencyList />
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
    <ExpenseFooter />
  </div>
</template>
<script setup lang="ts">
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon.vue";
import { Button } from "@/components/ui/button";
import DollarIcon from "@/components/icons/DollarIcon.vue";
import { FullScreenModal } from "@/components/ui/modal"
import ExpenseTypeList from "@/components/expenses/ExpenseTypeList.vue";
import CurrencyList from "@/components/expenses/CurrencyList.vue";
import ExpenseFooter from "@/components/expenses/ExpenseFooter.vue";
</script>
