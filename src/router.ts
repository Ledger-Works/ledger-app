import BasePage from '@/layouts/BasePage.vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import AddExpense from '@/pages/AddExpense.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BasePage,
    children: [
      {
        name: 'add',
        path: 'add',
        component: AddExpense
      },
      {
        name: 'my-expenses',
        path: 'my-expenses',
        component: () => import('@/pages/ShowExpenses.vue'),
      }
    ]
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
