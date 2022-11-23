import { store } from '../main'

export type messageType = {
	timeout?: number
	text?: string
}

const comingSoon = (message?: messageType) => {
	store.dispatch('save', {
		k: 'modal',
		v: 'block',
	})
	console.log('comingSoon', message)
	store.dispatch('save', {
		k: 'comingSoon',
		v: message,
	})

	let a = document.querySelector('.modal') as HTMLDivElement
	if (!a) return
	a.style.display = ''
	if (typeof message == 'object' && message.text) {
		a.querySelector('.actual-message').innerHTML = message.text
	} else {
		a.querySelector('.actual-message').innerHTML = '<h2>Coming soon</h2>'
	}
	if (message.timeout === 0) return
	setTimeout(
		() => {
			// a.style.display = 'none'
			store.dispatch('save', {
				k: 'modal',
				v: 'none',
			})
		},
		message.timeout ? message.timeout : 1000
	)

	// setTimeout(() => {
	// 	a.style.display = 'none'
	// }, 1000)
}
export const numberWithCommas = (x: number | string) => {
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

export { comingSoon, getFQN, getAlias }
