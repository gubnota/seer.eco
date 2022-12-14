import { store } from '../main'

declare const window: any
export type messageType = {
	timeout?: number
	text?: string
	type?: string
	code?: number
	inevitable?: boolean
}

export const popup = (message?: messageType) => {
	store.dispatch('save', {
		k: 'modal',
		v: 'block',
	})
	store.dispatch('save', {
		k: 'comingSoon',
		v: message,
	})

	let a = document.querySelector('.modal') as HTMLDivElement
	if (!a) return
	a.style.display = ''
	// console.log('popup', message)
	if (
		(message && message.text && message.text.includes('UserNotFound')) ||
		(message && message.code === 10002)
	) {
		a.querySelector(
			'.actual-message'
		).innerHTML = `<p>Please, go to <a href="//app.seer.eco" target=_blank>app.seer.eco</a> and register an account first</p>`
	} else if (typeof message == 'object' && message.text) {
		a.querySelector('.actual-message').innerHTML = message.text
	} else {
		a.querySelector('.actual-message').innerHTML = '<h2>Coming soon</h2>'
	}
	if (message && message.timeout === 0) return
	let timeout = 1000
	timeout = !!message ? 3000 : 1000
	if (message && message.timeout) timeout = message.timeout
	if (message && message.type) timeout = 1000 // passed click event – coming soon condition
	if (
		(message && message.text && message.text.includes('UserNotFound')) ||
		(message && message.code === 10002)
	)
		timeout = 5000
	setTimeout(() => {
		// a.style.display = 'none'
		store.dispatch('save', {
			k: 'modal',
			v: 'none',
		})
		store.dispatch('save', {
			k: 'loading',
			v: false,
		})
	}, timeout)

	// setTimeout(() => {
	// 	a.style.display = 'none'
	// }, 1000)
}
const comingSoon = (message?: messageType) => {
	popup(message)
}

export const numberWithCommas = (x: number | string | boolean) => {
	if (!x) return ''
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatNumber = (num, dec = 2, thousands = true) => {
	var out = (
		Math.round(parseFloat(num) * Math.pow(10, dec)) / Math.pow(10, dec)
	).toFixed(dec)
	if (thousands) out = numberWithCommas(out)
	return out
}

const getFQN = (alias: string) => {
	// aaa -> aaa.seer.eco
	const ind = alias.indexOf('.')
	if (ind != -1) return alias
	return `${alias}.seer.eco`.toLowerCase()
}
const getAlias = (fqn: string) => {
	// aaa.seer.eco -> aaa
	const ind = fqn.indexOf('.')
	if (ind == -1) return fqn
	return fqn.substring(0, ind).toLowerCase()
}

export const copyToClipboard = (textToCopy) => {
	// navigator clipboard api needs a secure context (https)
	if (navigator.clipboard && window.isSecureContext) {
		// navigator clipboard api method'
		return navigator.clipboard.writeText(textToCopy)
	} else {
		// text area method
		let textArea = document.createElement('textarea')
		textArea.value = textToCopy
		// make the textarea out of viewport
		textArea.style.position = 'fixed'
		textArea.style.left = '-999999px'
		textArea.style.top = '-999999px'
		document.body.appendChild(textArea)
		textArea.focus()
		textArea.select()
		return new Promise((res, rej) => {
			// here the magic happens
			document.execCommand('copy') ? res(true) : rej()
			textArea.remove()
		})
	}
}
const setWindowTitle = (title) => {
	window.top.document.title = title
}
export const setTitle = (to) => {
	if (
		to.path.includes('reviewer') ||
		to.path.includes('dao') ||
		to.path.includes('incentive-center')
	)
		setWindowTitle('Seer DAO')
	else if (to.path == '/dsn' || to.path == '/my_dsn') setWindowTitle('Seer DSN')
	else setWindowTitle('Seer')
}

export const scroll = () => {
	const db = document.querySelector('section.database') as HTMLElement
	if (db) window.scrollTo(0, db.offsetTop)
	return
	// let a = this.$refs
	// var b = Object.keys(a)
	// for (let i = 0; i < b.length; i++) {
	// 	this.sync.push(b[i] == 'head' ? a[b[i]] : a[b[i]][0])
	// }
	// window.a = this.sync
	// let c = this.sync
	let c = Array.prototype.slice.call(
		document.querySelectorAll('tr.head,tr.item'),
		0
	)
	for (let i = 0; i < c.length; i++) {
		if (i > 0) {
			let d = c.filter((el, j) => {
				return j != i
			})
			c[i].onscroll = (e) => {
				c[0].scrollTo(e.target.scrollLeft, 0)

				for (let j = 0; j < d.length; j++) {
					if (j == 0) continue
					d[j].scrollTo(e.target.scrollLeft, 0)
				}
			}
		}
	}
}
export const fancyError = (error: { message: string; code?: number }) => {
	// if (error.message === 'EventStop') return 'This event has been stopped'
	// if (error.message === 'DSNNameHasBeenSet')
	// 	return 'The node name is already in use, please reset it'
	// if (error.message === 'VoteExist')
	// 	return 'This event has already been voted on'
	// if (error.message === 'SignatureInvalid')
	// 	return 'Please sign with the corresponding wallet account'

	if (error.message.includes('code 401')) {
		return 'Please connect to your wallet account first'
	}
	return error.message
}
export const countdownFormatter = (time: number) => {
	let mins = Math.floor(time / 60)
	let secs = time % 60
	return `${mins}m ${secs}s`
}
export const countdownObj = (time: number) => {
	// days, hrs, mins, secs
	let days = Math.floor(time / (24 * 3600))
	let hours = Math.floor((time - days * 24 * 3600) / 3600)
	let mins = Math.floor((time - days * 24 * 3600 - hours * 3600) / 60)
	let secs = time % 60
	return { days, hours, mins, secs }
}

export const pause = async (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
export const convertUTCString = (time: number) => {
	const a = new Date(time * 1000)
	return `${a.getUTCFullYear()}/${(a.getUTCMonth() + 1)
		.toString()
		.padStart(2, '0')}/${a.getUTCDate().toString().padStart(2, '0')} ${a
		.getUTCHours()
		.toString()
		.padStart(2, '0')}:${a.getUTCMinutes().toString().padStart(2, '0')} (UTC)`
	// 1670234400
}
export const addressPartially = (address: string) => {
	if (window.innerWidth < 571)
		return `${address.substring(0, 3)}...${address.substring(
			address.length - 2
		)}`
	return `${address.substring(0, 5)}.....${address.substring(
		address.length - 5
	)}`
}

window.numberWithCommas = numberWithCommas
export const countUp = (v: {
	no: number
	total: number
	shown: number
	goal: number
	interval: number
}) => {
	let count = Math.ceil(v.total / v.interval) // how many steps
	v.shown = Math.round((v.goal * v.no) / count)
	if (v.no >= count) {
		v.shown = v.goal
	}
	return {
		no: v.no + 1,
		total: v.total,
		shown: v.shown,
		goal: v.goal,
		interval: v.interval,
	}
}
window.countUp = countUp
export function isLocal() {
	return (
		window.location.host.substring(0, 9) === 'localhost' ||
		window.location.host.substring(0, 1) === '1'
	)
}
export { comingSoon, getFQN, getAlias }
