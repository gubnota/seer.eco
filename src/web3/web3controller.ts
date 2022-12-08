import PayController from './paycontroller'
declare const window: any
export default class Web3Controller extends PayController {
	addressPartially(address) {
		if (!address) address = this.store.state.address
		if (typeof address != 'string') {
			this.logout()
			return
		}
		if (window.innerWidth < 571)
			return `${address.substring(0, 3)}...${address.substring(
				address.length - 2
			)}`
		return `${address.substring(0, 5)}.....${address.substring(
			address.length - 5
		)}`
	}

	async logout() {
		await super.logout()
		window.location.reload()
	}

	async restoreWeb3() {
		await super.restoreWeb3()
		if (this.store.state.address) {
			// console.log('restoreWeb3')
			// if it's defined (already logged on)
			let a = await this.enable()
			// if (a) {
			// 	let b = await window.ethereum.request({ method: 'eth_requestAccounts' })
			// 	if (b[0] != this.store.state.address) {
			// 		//address is not the same
			// 	}
			// }
		}
	}

	constructor() {
		super()
		let isLocal =
			window.location.host.substring(0, 9) === 'localhost' ||
			window.location.host.substring(0, 1) === '1'
		this.branch = isLocal ? 'dev' : 'dev' // local || dev || release
	}

	fetchRelated = async () => {
		this.rewardInfo()
		if (this.store.state.daoInfo && this.store.state.daoInfo.isDao) {
			let a = await this.rewardInfo()
			this.store.dispatch('save', { k: 'rewardInfo', v: a })
		}
	}

	async login(cb?: () => {}) {
		try {
			const connect = await this.connect(() => {
				cb()
				this.fetchRelated()
				return Promise.resolve(true)
			})
			if (!connect) return Promise.resolve(false)
		} catch (error) {
			if (error.code == 4001) {
				// logout
				this.logout()
				this.store.dispatch('save', { k: 'walletLoading', v: false })
				this.popup({ text: error.message })
				return Promise.resolve(false)
			}
		}

		// setTimeout(async () => {
		if (this.store.state.path == '/dao') {
			const info = await this.info()
		}
		if (this.store.state.path == '/dsn') {
			this.store.dispatch('unset', ['notAppUser'])
			console.log("this.store.state.path == '/dsn'")
			const info = await this.MyDSNs()
		}
		// setTimeout(async () => {
		const tickets = await this.ticketsNumber()
		// const events = await this.eventList()
		if (this.onLogin) this.onLogin()

		return true
		// console.log({ connect, info, tickets, events })
	}
}
