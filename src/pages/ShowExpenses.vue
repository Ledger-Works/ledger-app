<template>
  <div class="expense-list-container p-4 bg-white dark:bg-gray-900 h-[calc(100vh-64px)]">
    <div
      v-for="(monthExpenses, month) in groupedExpenses"
      :key="month"
      class="mb-6"
    >
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {{ month }}
        </h2>
        <button class="text-sm text-blue-500 hover:underline">
          View printable summary
        </button>
      </div>
      <ul class="space-y-2">
        <li
          v-for="expense in monthExpenses"
          :key="expense.id" 
          class="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="flex items-center w-1/2">
            <div class="w-10 h-10 flex-shrink-0 mr-3 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <i :class="`fas fa-${expense.expenseType.icon} text-green-500`" />
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(expense.time) }}
              </p>
              <p class="font-medium text-gray-800 dark:text-gray-200">
                {{ expense.description }}
              </p>
            </div>
          </div>
          <div class="flex-grow" />
          <div class="text-right">
            <p class="font-semibold text-gray-800 dark:text-gray-200">
              {{ expense.currency.code }}{{ expense.amount.toFixed(2) }}
            </p>
            <p
              class="text-sm"
              :class="expense.paidBy.id === currentUserId ? 'text-green-500' : 'text-orange-500'"
            >
              {{ getPaidOrLentText(expense) }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useExpenses } from '@/composables/useExpenses';
import { useRoute } from 'vue-router';

const expenses = ref([]);
const route = useRoute();
const currentUserId = ref('your-user-id-here'); // Replace with actual user ID

onMounted(async () => {
  const groupId = route.params.groupId as string;
  expenses.value = await useExpenses().fetchExpenses(groupId);
});

const groupedExpenses = computed(() => {
  const groups = {};
  expenses.value.forEach(expense => {
    const month = new Date(expense.time).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!groups[month]) groups[month] = [];
    groups[month].push(expense);
  });
  return groups;
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('default', { month: 'short', day: 'numeric' });
};

const getPaidOrLentText = (expense) => {
  if (expense.paidBy.id === currentUserId.value) {
    return `you paid`;
  } else {
    const split = expense.splits.find(s => s.user_id === currentUserId.value);
    return split ? `${expense.paidBy.name} lent you` : `you lent ${expense.paidBy.name}`;
  }
};
</script>