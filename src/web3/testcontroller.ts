import axios from 'axios'
import { fancyError } from '../common/helper'
import EventsController from './eventscontroller'

export default class TestController extends EventsController {
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
					return Promise.resolve(false)
				}
				return Promise.resolve(true)
			})
			.catch((error) => {
				console.log('error', error.message)
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${fancyError(error)}</p>`,
				})
				return Promise.resolve(false)
			})
	}
}
