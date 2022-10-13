import { createApp } from 'vue'
import './css/reset.css'
import './css/style.css'
// import './css/mobile.css'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import store from './store'
import routes from './routes'
// const p1 = { template: Page1 }
// const p2 = { template: Page2 }

const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHistory(),
	routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = createApp(App)

app.config.globalProperties.window = window
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)
app.use(store)

app.mount('#app')
