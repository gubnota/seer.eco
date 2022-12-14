import Web3Controller from './web3/web3controller'
import MetaController from './web3/metacontroller'
import { createApp } from 'vue'
import './css/reset.css'
import './css/style.css'
// import './css/mobile.css'
import {
	createRouter,
	createWebHistory,
	createWebHashHistory,
} from 'vue-router'
import App from './App.vue'
import store from './store'
import routes from './routes'
import { openLink } from './routes'
import { comingSoon, isLocal, popup, setTitle } from './common/helper'
import { questions_zh, questions_en } from './assets/reviewer/questions'
import { ui } from './assets/reviewer/ui'
export { store }

export const isDev = () => {
	return (window.env || 'production').includes('dev') // production || release
}

let ui_ = new ui()

declare const window: any
// ui_.lang = 'zh'

// const p1 = { template: Page1 }
// const p2 = { template: Page2 }

const router = createRouter({
	history: createWebHashHistory(), //hash instead
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	// history: createWebHistory(),
	routes, // short for `routes: routes`
})
router.beforeEach((to, from) => {
	store.dispatch('save', { k: 'path', v: to.path })
	// if (!['/sdid', '/coming-soon', '/pay', '/dsn', '/dao'].includes(to.path)) {
	// 	// console.log('beforeEach', to, from)
	// 	// document.body.classList.add('loading')
	// 	document.querySelector('#app').style.opacity = 0
	// 	setTimeout(() => {
	// 		// document.body.classList.remove('loading')
	// 		document.querySelector('#app').style.opacity = 1
	// 	}, 500)
	// }
})

router.afterEach((to, from) => {
	setTitle(to)

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
app.config.globalProperties.popup = popup
app.config.globalProperties.router = router
app.config.globalProperties.questions_zh = questions_zh
app.config.globalProperties.questions_en = questions_en
app.config.globalProperties.ui = ui_
app.config.globalProperties.web3 = new Web3Controller()
app.config.globalProperties.openLink = openLink
app.config.globalProperties.isDev = isDev
let web3obj = app.config.globalProperties.web3
// a.load()
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)
app.use(store)
store.dispatch('load', [
	'address',
	'daoInfo',
	'seerToken',
	'ticketsNumber',
	'eventsTab',
	'daoRulesVisited',
	'dsnListTop',
	'dsnList',
	'paySellInfo',
	'notAppUser',
	// 'loading',
	'comingSoon',
])
store.dispatch('save', { k: 'eventsPage', v: 1 })

store.dispatch('save', {
	k: 'modal',
	v: 'none',
})
store.dispatch('save', {
	k: 'chooseConnect',
	v: 'none',
})
store.dispatch('save', {
	k: 'eventList',
	v: { list: [], total: 0 },
})

app.mount('#app')
window.onload = () => {
	const docEnd = new Date().getTime()
	const docStart = window.docStart ?? docEnd
	const delay = isLocal()
		? 0
		: docEnd - docStart > 1000
		? 0
		: 1000 - (docEnd - docStart)
	window.delay = delay
	setTimeout(() => {
		document.querySelector('#app').style.opacity = ''
		document.body.classList.remove('loading')
	}, delay)
}
