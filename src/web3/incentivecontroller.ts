import axios from 'axios'
import TestController from './testcontroller'

export default class IncentiveController extends TestController {
	daily = async (signature: string) => {
		axios
			.post(
				this.servers.business[this.branch] + 'api/dao/daily',
				{},
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
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return Promise.resolve(false)
			})
	}

	/* Returns {
        "daily": 2,
        "votes": 15,
        "voteTickets": 30
    }
  */

	rewardInfo = async (signature: string) => {
		axios
			.post(
				this.servers.business[this.branch] + 'api/dao/RewardInfo',
				{},
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
					return Promise.resolve(res.data.data)
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
