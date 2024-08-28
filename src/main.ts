import { createPinia } from 'pinia';
import { createApp } from 'vue';

import './assets/main.css';
import App from './App.vue'
import { router } from '@/router.ts';
import { useSupabase } from '@/composables/useSupabase';
const supabase = useSupabase()
supabase.init()

const pinia = createPinia()


createApp(App).use(router).use(pinia).mount('#app')
