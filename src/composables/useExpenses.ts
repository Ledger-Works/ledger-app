import { ref, computed } from 'vue';
import { type DateValue } from '@internationalized/date'

export function useExpenses() {
  const expenses = ref<Expense[]>([]);
  const expenseTypes = ref<ExpenseType[]>([
    { type: 'food', label: 'Food', icon: '🍔' },
    { type: 'transport', label: 'Transport', icon: '🚗' },
    // Add more expense types as needed
  ]);
  const currencies = ref<Currency[]>();
  const currentExpenseType = ref<ExpenseType>();
  const currentExpenseDate = ref<DateValue>()

  const addExpense = (expense: Expense) => {
    expenses.value.push(expense);
  }

  const setCurrentExpenseDate = (newTime: DateValue) => {
    const current = newTime;
    currentExpenseDate.value = current
  };

  const listExpenses = computed(() => expenses.value);
  const listExpenseTypes = computed(() => expenseTypes.value);
  const listCurrencies = computed(() => currencies.value);

  return {
    addExpense,
    currentExpenseType,
    currentExpenseDate,
    setCurrentExpenseDate,
    listExpenses,
    listExpenseTypes,
    listCurrencies,
  };
}
