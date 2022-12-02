import PayController from './paycontroller'
declare const window: any
export default class Web3Controller extends PayController {
	addressPartially(address) {
		if (!address) address = this.store.state.address
		if (typeof address != 'string') {
			this.logout()
			return
		}
		return `${address.substring(0, 5)}.....${address.substring(
			address.length - 5
		)}`
	}

	async logout() {
		await super.logout()
		// this.eventList({ tab: 0, from: 0, limit: 8 })
		window.location.reload()
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

	login = async (cb?: () => {}) => {
		try {
			const connect = await this.connect(() => {
				cb()
				this.fetchRelated()
				return true
			})
			// console.log('login connect', connect)
			if (!connect) return Promise.resolve(false)
		} catch (error) {
			if (error.code == 4001) {
				this.store.dispatch('save', { k: 'walletLoading', v: false })
				this.popup({ text: error.message })
			}
		}

		// setTimeout(async () => {
		const info = await this.info()
		// setTimeout(async () => {
		const tickets = await this.ticketsNumber()
		const events = await this.eventList()
		if (this.onLogin) this.onLogin()
		return true
		// console.log({ connect, info, tickets, events })
	}
}
