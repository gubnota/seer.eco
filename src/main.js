import { createApp } from 'vue'
import './css/reset.css'
import './css/style.css'
// import './css/mobile.css'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import store from './store'
import routes from './routes'
import { comingSoon } from './common/helper'
// const p1 = { template: Page1 }
// const p2 = { template: Page2 }

const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHistory(),
	routes, // short for `routes: routes`
})
router.afterEach((to, from) => {
	if (to.path.search('/https://') === 0) {
		window.open(to.path.substring(1), '_blank')
		router.back()
	}
	// console.log('guard', to, from)
	// ...
	// explicitly return false to cancel the navigation
	// return false
})

export { router }

// 5. Create and mount the root instance.
const app = createApp(App)

app.config.globalProperties.window = window
app.config.globalProperties.comingSoon = comingSoon
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)
app.use(store)

app.mount('#app')
