import { ref, computed, type InputHTMLAttributes } from 'vue';
import { type DateValue } from '@internationalized/date'

export function useExpenses() {
  const expenses = ref<Expense[]>([]);
  // Define a more flexible mapping where keys are arrays of keywords or regex patterns
  const flexibleExpenseTypeMappings = [
    { keywords: ['restaurant', 'dining', 'food'], type: 'restaurants' },
    { keywords: ['grocery', 'supermarket', 'market'], type: 'groceries' },
  ];
  const expenseTypes = ref({
    rent: '🏠',
    utilities: '💡',
    groceries: '🛍️',
    restaurants: '🍽️',
    transportation: '🚗',
    travel: '✈️',
    entertainment: '🎥',
    shopping: '🛍️',
    personalCare: '💆',
    loans: '💰',
    gifts: '🎁',
    miscellaneous: '📦',
  });

  const currencies = ref<Currency[]>();
  const currentExpenseType = ref<string>();
  const currentExpenseDate = ref<DateValue>()
  const userInputExpenseType = ref()

  const addExpense = (expense: Expense) => {
    expenses.value.push(expense);
  }

  const determineExpenseType = (): void => {
    const input = userInputExpenseType.value
    const normalizedInput = input.trim().toLowerCase();

    // Check against predefined categories first
    for (const category in expenseTypes.value) {
      if (normalizedInput.includes(category)) {
        currentExpenseType.value = category as keyof typeof expenseTypes.value;
      }
    }

    // Check against flexible mappings
    for (const mapping of flexibleExpenseTypeMappings) {
      for (const keyword of mapping.keywords) {
        if (normalizedInput.includes(keyword)) {
          currentExpenseType.value = mapping.type as keyof typeof expenseTypes.value;
        }
      }
    }

    // Default to 'miscellaneous' if no match found
    currentExpenseType.value = 'miscellaneous';
  };

  const setCurrentExpenseDate = (newTime: DateValue) => {
    const current = newTime;
    currentExpenseDate.value = current
  };

  const selectExpenseType = (expenseType: string) => {
    currentExpenseType.value = expenseType
  };

  const listExpenses = computed(() => expenses.value);
  const listExpenseTypes = computed(() => expenseTypes.value);
  const listCurrencies = computed(() => currencies.value);

  return {
    addExpense,
    currentExpenseType,
    expenseTypes,
    currentExpenseDate,
    userInputExpenseType,
    selectExpenseType,
    setCurrentExpenseDate,
    determineExpenseType,
    listExpenses,
    listExpenseTypes,
    listCurrencies,
  };
}
