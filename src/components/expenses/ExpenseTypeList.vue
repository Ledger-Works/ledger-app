<template>
  <div>
    <div class="flex-1 flex flex-col gap-2 p-4 pt-0 pb-11">
      <Button
        v-for="(expenseType, index) in expenseTypeOptions"
        :key="index"
        type="submit"
        variant="outline"
        @click="emits('save:expense-type', expenseType)"
      >
        <div class="flex justify-between w-[100%]">
          <div class="expense-name max-w-[200px] text-ellipsis overflow-hidden">
            {{ props.expenseTypes[expenseType] }}
          </div>
          <div class="currency-code">
            {{ capitalized(expenseType) }}
          </div>
        </div>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '../ui/button';
type EmojiMapping = {
  [key: string]: string;
}

const emits = defineEmits<{
  'save:expense-type': [value: string]
}>()

const userInput = ref('');

const capitalized = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Array of explicit options for selection
const expenseTypeOptions: (keyof typeof props.expenseTypes)[] = [
  'rent',
  'utilities',
  'groceries',
  'restaurants',
  'transportation',
  'travel',
  'entertainment',
  'shopping',
  'personalCare',
  'loans',
  'gifts',
  'miscellaneous',
];

const props = defineProps<{
  expenseTypes: Record<string, string>
}>()
</script>