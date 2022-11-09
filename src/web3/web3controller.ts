import EventsController from './eventscontroller'

declare const window: any

export default class Web3Controller extends EventsController {
	addressPartially(address) {
		if (!address) address = this.store.state.address
		return `${address.substr(0, 5)}.....${address.substr(address.length - 5)}`
	}
	constructor() {
		super()
		this.branch = 'dev' // local || dev || release
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
