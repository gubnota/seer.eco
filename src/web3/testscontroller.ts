import axios from 'axios'
import EventsController from './eventscontroller'

export default class TestsController extends EventsController {
	examResult = async (signature: string) => {
		axios
			.post(
				this.servers.business[this.branch] + 'api/dao/ExamResult',
				{
					msg: signature,
				},
				{
					headers: {
						SeerToken: this.store.state.seerToken,
						Domain: this.node,
						Language: 'en',
						Terminal: 'web',
					},
				}
			)
			.then((res) => {
				if (res.data.message != 'Success') {
					this.popup({ text: `<p><b>Error</b><br />${res.data.message}</p>` })
					this.address = null
					this.store.dispatch('save', {
						k: 'address',
						v: null,
					})
					return Promise.resolve(false)
				}
				return Promise.resolve(true)
			})
			.catch((error) => {
				console.log('error', error.message)
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return Promise.resolve(false)
			})
	}
}
