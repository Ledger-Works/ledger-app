import { fetchCurrencies } from '@/services/api';
import type { Currency } from '@/types';
import { ref, computed } from 'vue';

const currentCurrency = ref<Currency>(
  {
    symbol: "₹",
    name: "Indian Rupee",
    code: "INR",
  }
);

export function useCurrencies() {
  const currencies = ref<Record<string, Currency>>();

  const setCurrentCurrency = (currency: Currency) => {
    currentCurrency.value = currency
  }

  const loadCurrencies = async () => {
    try {
      currencies.value = await fetchCurrencies();
    } catch (error) {
      console.error('Failed to load currencies:', error);
    }
  };

  const listCurrencies = computed(() => currencies.value);

  return {
    loadCurrencies,
    setCurrentCurrency,
    currentCurrency,
    listCurrencies,
  };
}
