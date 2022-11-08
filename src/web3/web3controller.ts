import EventsController from './eventscontroller'

declare const window: any

export default class Web3Controller extends EventsController {
	addressPartially(address) {
		if (!address) address = this.store.state.address
		return `${address.substr(0, 5)}.....${address.substr(address.length - 5)}`
	}
}
