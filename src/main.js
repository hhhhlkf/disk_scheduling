import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/reset.css'
import '@/assets/css/new.css'
import { createPinia } from 'pinia';
import router from './router/router'
const pinia = createPinia();
createApp(App).use(ElementPlus).use(router).use(pinia).mount('#app')
