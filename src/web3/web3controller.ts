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
	constructor() {
		super()
		let isLocal =
			window.location.host.substring(0, 9) === 'localhost' ||
			window.location.host.substring(0, 1) === '1'
		this.branch = isLocal ? 'dev' : 'dev' // local || dev || release
	}
	login = async () => {
		const connect = await this.connect()
		// setTimeout(async () => {
		const info = await this.info()
		// setTimeout(async () => {
		const tickets = await this.ticketsNumber()
		const events = await this.eventList()

		// console.log({ connect, info, tickets, events })
	}
}
