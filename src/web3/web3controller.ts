import IncentiveController from './incentivecontroller'
declare const window: any
export default class Web3Controller extends IncentiveController {
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
		this.eventList({ tab: 0, from: 0, limit: 8 })
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
		const connect = await this.connect(() => {
			cb()
			this.fetchRelated()
			return true
		})
		// setTimeout(async () => {
		const info = await this.info()
		// setTimeout(async () => {
		const tickets = await this.ticketsNumber()
		// const events = await this.eventList()

		if (this.onLogin) this.onLogin()
		return true
		// console.log({ connect, info, tickets, events })
	}
}
