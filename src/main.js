import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/style/base.scss'
import '../src/style/iconfont.css'

createApp(App).use(router).mount('#app')