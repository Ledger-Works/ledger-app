import { createRouter, createWebHistory } from 'vue-router'
import BasePage from 'layouts/BasePage.vue'
import AddExpense from './pages/AddExpense.vue'

const routes = [
  { 
		path: '/', 
		component: BasePage, 
		children: [
			{
				name: 'add',
				path: 'add',
				component: AddExpense
			}
		]
	},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})