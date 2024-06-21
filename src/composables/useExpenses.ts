import { ref, computed, type InputHTMLAttributes } from 'vue';
import { type DateValue } from '@internationalized/date'
import { useCurrencies } from '@/composables/useCurrencies';
import type { Currency, Expense, ExpenseType } from '@/types';
import { generateUUID } from '@/lib/utils';


export function useExpenses() {
  const expenses = ref<Expense[]>([]);
  const currencyStore = useCurrencies()
  // Define a more flexible mapping where keys are arrays of keywords or regex patterns
  const flexibleExpenseTypeMappings = [
    { keywords: ['restaurant', 'dining', 'food'], type: 'restaurants' },
    { keywords: ['grocery', 'supermarket', 'market'], type: 'groceries' },
  ];
  const expenseTypes = ref<Record<string, ExpenseType>>({
    rent: { value: 'rent', label: 'Rent', icon: '🏠' },
    utilities: { value: 'utilities', label: 'Utilities', icon: '💡' },
    groceries: { value: 'groceries', label: 'Groceries', icon: '🛍️' },
    restaurants: { value: 'restaurants', label: 'Restaurants', icon: '🍽️' },
    transportation: { value: 'transportation', label: 'Transportation', icon: '🚗' },
    travel: { value: 'travel', label: 'Travel', icon: '✈️' },
    entertainment: { value: 'entertainment', label: 'Entertainment', icon: '🎥' },
    shopping: { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    personalCare: { value: 'personalCare', label: 'PersonalCare', icon: '💆' },
    loans: { value: 'loans', label: 'Loans', icon: '💰' },
    gifts: { value: 'gifts', label: 'Gifts', icon: '🎁' },
    miscellaneous: { value: 'miscellaneous', label: 'Miscellaneous', icon: '📦' },
  });


  const currencies = ref<Currency[]>();
  const currentExpense = ref<Expense>({
    id: '',
    expenseType: {
      value: '',
      label: '',
      icon: ''
    },
    currency: {
      name: '',
      code: '',
      symbol: ''
    },
    expenseValue: 0,
    time: ''
  })
  const userInputExpenseType = ref()
  const isError = ref(false)

  const addExpense = async (): Promise<string> => {
    const id = generateUUID()
    if (currentExpense.value) {
      const expense = currentExpense.value
      expenses.value.push({
        ...expense,
        id,
        currency: currencyStore.currentCurrency.value,
      });
      console.log(expenses)
    }
    else {
      // TODO: Create handle flow
      isError.value = true
    }
    return id
  }

  const getExpense = (id: string) => {
    return expenses.value.find(expense => expense.id === id)
  }

  // const determineExpenseType = (): void => {
  //   const input = userInputExpenseType.value
  //   const normalizedInput = input.trim().toLowerCase();

  //   // Check against predefined categories first
  //   for (const category in expenseTypes.value) {
  //     if (normalizedInput.includes(category)) {
  //       currentExpense.value.expenseType = category;
  //     }
  //   }

  //   // Check against flexible mappings
  //   for (const mapping of flexibleExpenseTypeMappings) {
  //     for (const keyword of mapping.keywords) {
  //       if (normalizedInput.includes(keyword)) {
  //         currentExpenseType.value = mapping.type as keyof typeof expenseTypes.value;
  //       }
  //     }
  //   }

  //   // Default to 'miscellaneous' if no match found
  //   currentExpenseType.value = 'miscellaneous';
  // };

  const setCurrentExpenseDate = (newTime: DateValue) => {
    const current = newTime;
    currentExpense.value.time = current
  };

  const selectExpenseType = (expenseTypeId: ExpenseType['value']) => {
    currentExpense.value.expenseType = expenseTypes.value[expenseTypeId]
  };

  const listExpenses = computed(() => expenses.value);
  const listExpenseTypes = computed(() => expenseTypes.value);
  const listCurrencies = computed(() => currencies.value);

  return {
    addExpense,
    expenseTypes,
    userInputExpenseType,
    selectExpenseType,
    setCurrentExpenseDate,
    currentExpense,
    getExpense,
    // determineExpenseType,
    listExpenses,
    listExpenseTypes,
    listCurrencies,
  };
}
