import { ROUTE_NAMES } from '@/constants';
import BasePage from '@/layouts/BasePage.vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BasePage,
    children: [
      {
        path: ROUTE_NAMES.INDEX,
        name: 'index',
        component: () => import('@/pages/index.vue')
      },
      {
        name: ROUTE_NAMES.ADD,
        path: 'add',
        component: () => import('@/pages/AddExpense.vue')
      },
      {
        name: ROUTE_NAMES.SIGN_UP,
        path: 'sign-up',
        component: () => import('@/pages/SignUp.vue')
      },
      {
        name: ROUTE_NAMES.LIST_SHEETS,
        path: 'list-sheets',
        component: () => import('@/pages/ListSheets.vue')
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
      }
    ]
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
