import axios from 'axios';

const apiKey = '4237d530d812fdb49c7998ce';

export const fetchCurrencies = async (): Promise<Record<string, Currency>> => {
  try {
    const response = await axios.get<Currency[]>(`currencies.json`);
    return response.data
  } catch (error) {
    console.error('Error fetching currencies:', error);
    throw error;
  }
};

const getCurrencySymbol = (code: string): string => {
  const symbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    // Add more currency symbols as needed
  };
  return symbols[code] || code;
};
