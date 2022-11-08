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

export { comingSoon }
