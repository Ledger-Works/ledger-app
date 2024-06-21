import { createPinia } from 'pinia';
import { createApp } from 'vue';

import './assets/main.css';
import App from './App.vue'
import { router } from '@/router.ts';

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
