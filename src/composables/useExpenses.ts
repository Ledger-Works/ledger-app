import { ref, computed } from 'vue';
import { useCurrencies } from '@/composables/useCurrencies';
import type { ExpenseType, ExpenseWithDetails, NewExpense, ExpenseSplit, Expense, Group } from '@/types';
import { generateUUID } from '@/lib/utils';
import { useSupabase } from '@/composables/useSupabase';
import { useErrors } from '@/composables/useErrors';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function useExpenses() {
  const expenses = ref<ExpenseWithDetails[]>([]);
  const currencyStore = useCurrencies();
  const supabase = useSupabase();
  const errors = useErrors();

  const expenseTypes = ref<Record<string, ExpenseType>>({
    rent: { id: generateUUID(), value: 'rent', label: 'Rent', icon: '🏠' },
    utilities: { id: generateUUID(), value: 'utilities', label: 'Utilities', icon: '💡' },
    groceries: { id: generateUUID(), value: 'groceries', label: 'Groceries', icon: '🛍️' },
    restaurants: { id: generateUUID(), value: 'restaurants', label: 'Restaurants', icon: '🍽️' },
    transportation: { id: generateUUID(), value: 'transportation', label: 'Transportation', icon: '🚗' },
    travel: { id: generateUUID(), value: 'travel', label: 'Travel', icon: '✈️' },
    entertainment: { id: generateUUID(), value: 'entertainment', label: 'Entertainment', icon: '🎥' },
    shopping: { id: generateUUID(), value: 'shopping', label: 'Shopping', icon: '🛍️' },
    personalCare: { id: generateUUID(), value: 'personalCare', label: 'PersonalCare', icon: '💆' },
    loans: { id: generateUUID(), value: 'loans', label: 'Loans', icon: '💰' },
    gifts: { id: generateUUID(), value: 'gifts', label: 'Gifts', icon: '🎁' },
    miscellaneous: { id: generateUUID(), value: 'miscellaneous', label: 'Miscellaneous', icon: '📦' },
  });

  const currentExpense = ref<NewExpense>({
    groupId: '',
    description: '',
    expenseTypeId: '',
    currencyCode: '',
    amount: 0,
    time: new Date(),
    paidBy: '',
    splits: []
  });

  const addExpense = async (groupId: string): Promise<string | undefined> => {
    try {
      if (currentExpense.value) {
        const newExpense: NewExpense = {
          ...currentExpense.value,
          groupId,
          currencyCode: currencyStore.currentCurrency.value.code
        };
        const addedExpense: Expense = await supabase.addExpense(newExpense);
        if (addedExpense && addedExpense.id) {
          await fetchExpenses(groupId);
          return (addedExpense as Expense).id;
        } else {
          throw new Error('Failed to add expense: No ID returned');
        }
      }
    } catch (error) {
      errors.showError('Failed to add expense', getErrorMessage(error));
    }
  };
  const getExpense = (id: string): ExpenseWithDetails | undefined => {
    return expenses.value.find(expense => expense.id === id);
  };

  const fetchExpenses = async (groupId: string): Promise<void> => {
    try {
      const allExpenses = await supabase.getExpenses() || [];
      expenses.value = allExpenses.filter(expense => expense.groupId === groupId);
    } catch (error) {
      errors.showError('Failed to fetch expenses', getErrorMessage(error));
    }
  };

  const fetchGroups = async (): Promise<Group[]> => {
    let groups: Group[] = []
    try {
      const groupResponse = await supabase.getGroups() || [];
      groups = groupResponse.map((g) => {
        return {
          ...g,
          isPersonalSpace: g.is_personal_space,
        }
      })
    } catch (error) {
      errors.showError('Failed to fetch expenses', getErrorMessage(error));
    }
    return groups
  };

  const setCurrentExpenseDate = (newTime: Date): void => {
    currentExpense.value.time = newTime;
  };

  const selectExpenseType = (expenseTypeId: string): void => {
    currentExpense.value.expenseTypeId = expenseTypeId;
  };

  const addExpenseSplit = (split: ExpenseSplit): void => {
    currentExpense.value.splits.push(split);
  };

  const clearExpenseSplits = (): void => {
    currentExpense.value.splits = [];
  };

  const resetCurrentExpense = (): void => {
    currentExpense.value = {
      groupId: '',
      description: '',
      expenseTypeId: '',
      currencyCode: '',
      amount: 0,
      time: new Date(),
      paidBy: '',
      splits: []
    };
  };

  const setExpenseDescription = (description: string): void => {
    currentExpense.value.description = description;
  };

  const setExpenseAmount = (amount: number): void => {
    currentExpense.value.amount = amount;
  };

  const setExpensePaidBy = (userId: string): void => {
    currentExpense.value.paidBy = userId;
  };

  const listExpenses = computed(() => expenses.value);
  const listExpenseTypes = computed(() => Object.values(expenseTypes.value));

  return {
    expenses,
    currentExpense,
    expenseTypes,
    addExpense,
    getExpense,
    fetchExpenses,
    fetchGroups,
    setCurrentExpenseDate,
    selectExpenseType,
    addExpenseSplit,
    clearExpenseSplits,
    resetCurrentExpense,
    setExpenseDescription,
    setExpenseAmount,
    setExpensePaidBy,
    listExpenses,
    listExpenseTypes
  };
}