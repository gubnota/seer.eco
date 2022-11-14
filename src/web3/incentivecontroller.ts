import axios from 'axios'
import TestController from './testcontroller'

export default class IncentiveController extends TestController {
	//RewardDetail
	/*
	"list": [
		{
				"date": "2022-09",
				"dailyReward": 2, // 每日签到奖励 Punch rewards
				"voteSumReward": 0, // 评审累计奖励  Review reward
				"poolReward": 19.89 // 奖池奖励 Divide the price pool
		},
		{
				"date": "2022-10",
				"dailyReward": 40,
				"voteSumReward": 20,
				"poolReward": 99.09
		}
]
got: number // claim
unGot: number // can be claimed
*/

	/* call: daily|rewardInfo|RewardDetail */
	incentives = async (call: string) => {
		if (
			call != 'daily' &&
			call != 'RewardInfo' &&
			call != 'RewardDetail' &&
			call != 'ClaimReward'
		)
			throw new Error('unknown method')
		let res = axios
			.post(
				this.servers.business[this.branch] + 'api/dao/' + call,
				{},
				{
					headers: {
						SeerToken: this.store.state.seerToken,
						Domain: this.node,
						Language: 'zh',
						Terminal: 'web',
					},
				}
			)
			.then((res) => {
				if (res.data.message != 'Success') {
					this.popup({ text: `<p><b>Error</b><br />${res.data.message}</p>` })
					return false
				}
				return call == 'daily' || call == 'ClaimReward' ? true : res.data.data
			})
			.catch((error) => {
				console.log('error', error.message)
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return false
			})
		return Promise.resolve(res)
	}
	daily = async () => {
		return this.incentives('daily')
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
		this.store.dispatch('save', { k: 'rewardDetail', v: res })
		return res
	}
	claimReward = async () => {
		let res = await this.incentives('ClaimReward')
		return res
	}

	rewardInfo = async () => {
		let res = await this.incentives('RewardInfo')
		this.store.dispatch('save', { k: 'rewardInfo', v: res })
		return res
	}
}
