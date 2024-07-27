<template>
  <table class="w-full border-collapse">
    <thead>
      <tr class="bg-gray-100">
        <th 
          v-for="(header, index) in headers" 
          :key="index"
          class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-200"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="(row, rowIndex) in dataRows" 
        :key="rowIndex"
        class="hover:bg-gray-50"
      >
        <td 
          v-for="(cell, cellIndex) in row" 
          :key="cellIndex"
          class="px-4 py-2 text-sm text-white border border-gray-200"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import useGoogleSheets from '@/composables/useGoogleSheets';

const headers = ref([]);
const dataRows = ref([]);

// import MyExpensesList from '@/components/expenses/ExpensesList.vue'
const { listSheetData } = useGoogleSheets()
const route = useRoute()
// console.log(route.query?.id)
onMounted(async () => {
  console.log('hello')
});
</script>