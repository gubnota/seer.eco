import axios from 'axios'
import TestController from './testcontroller'

export default class IncentiveController extends TestController {
	//RewardDetail
	/*
	"list": [
		{
				"date": "2022-09",
				"dailyReward": 2, // Review reward
				"voteSumReward": 0, // 评审累计奖励  Punch rewards
				"poolReward": 19.89
		},
		{
				"date": "2022-10",
				"dailyReward": 40,
				"voteSumReward": 20,
				"poolReward": 99.09
		}
]*/

	/* call: daily|rewardInfo|RewardDetail */
	incentives = async (call: string) => {
		if (call != 'daily' && call != 'rewardInfo' && call != 'RewardDetail')
			throw new Error('unknown method')

		axios
			.post(
				this.servers.business[this.branch] + 'api/dao/' + call,
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
				return Promise.resolve(call == 'daily' ? true : res.data.data)
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
	daily = async () => {
		return Promise.resolve(this.incentives('daily'))
	}
	daily2 = async (signature: string) => {
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
	rewardDetail = async () => {
		let res = await this.incentives('RewardDetail')
		console.log('rewardDetail', res)
		return res
	}
	rewardInfo = async () => {
		return Promise.resolve(this.incentives('RewardInfo'))
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
