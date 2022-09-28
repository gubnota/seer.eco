import { createApp } from 'vue'
import './css/reset.css'
import './css/style.css'
import './css/mobile.css'
import Page1 from './pages/page.vue'
import Page2 from './pages/page2.vue'
import Page3 from './pages/page3.vue'
import Main from './pages/main.vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import store from './store'

const p1 = { template: Page1 }
const p2 = { template: Page2 }

const routes = [
	{ path: '/', component: Main },
	{ path: '/page1', component: Page1 },
	{ path: '/page2', component: Page2 },
	{ path: '/page2/page3.html', component: Page3 },
]
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
