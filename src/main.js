import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import router from '../src/router/router.js'
import store from '../src/store/index.js'
import 'element-plus/lib/theme-chalk/index.css';
import './index.css'


var app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')