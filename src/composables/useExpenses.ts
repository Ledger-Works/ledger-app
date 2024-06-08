import { ref, computed } from 'vue';

type ExpenseType = {
  type: string;
  label: string;
  icon: string;
}

type Currency = {
  name: string;
  code: string;
  symbol: string;
}

type Expense = {
  expenseType: ExpenseType;
  currency: Currency;
  expenseValue: number;
  time: Date;
}

export function useExpenses() {
  const expenses = ref<Expense[]>([]);
  const expenseTypes = ref<ExpenseType[]>([
    { type: 'food', label: 'Food', icon: '🍔' },
    { type: 'transport', label: 'Transport', icon: '🚗' },
    // Add more expense types as needed
  ]);
  const currencies = ref<Currency[]>([
    { name: 'US Dollar', code: 'USD', symbol: '$' },
    { name: 'Euro', code: 'EUR', symbol: '€' },
    // Add more currencies as needed
  ]);

  const addExpense = (expense: Expense) => {
    expenses.value.push(expense);
  };

  const listExpenses = computed(() => expenses.value);
  const listExpenseTypes = computed(() => expenseTypes.value);
  const listCurrencies = computed(() => currencies.value);

  return {
    addExpense,
    listExpenses,
    listExpenseTypes,
    listCurrencies,
  };
}
