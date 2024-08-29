import { ROUTE_NAMES } from '@/constants';
import BasePage from '@/layouts/BasePage.vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BasePage,
    children: [
      {
        name: ROUTE_NAMES.ADD,
        path: 'add',
        component: () => import('@/pages/AddExpense.vue')
      },
      {
        name: ROUTE_NAMES.EXPENSE_DETAILS,
        path: 'expenses/:id',
        component: () => import('@/pages/ExpenseDetails.vue'),
      },
      {
        name: ROUTE_NAMES.EXPENSES,
        path: 'expenses',
        component: () => import('@/pages/ShowExpenses.vue'),
      },
      {
        name: ROUTE_NAMES.GROUPS,
        path: 'groups',
        component: () => import('@/pages/ShowGroups.vue'),
      }
    ]
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});