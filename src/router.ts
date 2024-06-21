import BasePage from '@/layouts/BasePage.vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BasePage,
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('@/pages/index.vue')
      },
      {
        name: 'add',
        path: 'add',
        component: () => import('@/pages/AddExpense.vue')
      },
      {
        name: 'expenseDetails',
        path: 'expenses/:id',
        component: () => import('@/pages/ExpenseDetails.vue'),
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
