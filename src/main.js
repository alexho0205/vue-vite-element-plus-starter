import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './style.css'
import App from './App.vue'
import router from "./router/index";

createApp(App).use(router).use(ElementPlus).mount('#app')
