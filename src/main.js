import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './css/styles.css'

createApp(App).use(store).use(router).mount('#app')

// Инициализируем данные при старте
store.dispatch('initializeFavorites')
store.dispatch('initializeItems')
