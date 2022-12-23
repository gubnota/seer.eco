import { version } from 'vue'
import axios from 'axios'
import { daoInfoT } from './common'
import UserController from './usercontroller'
import { store } from '../main'
declare const window: any
// interaction with 9993 Business API
export default class DaoController extends UserController {
	public voteToken: string = ''
	public daoInfo: daoInfoT

	vote = async (showId: number, vote: boolean) => {
		// console.log('showId', showId)
		// return Promise.resolve(vote)
		// return vote
		// var signature = await this.signVote({
		// 	chain: 1,
		// 	showId,
		// 	vote,
		// 	nonce: 1,
		// 	stamp: 1,
		// })
		// console.log('signature', signature)
		var x = new Date()
		var stamp = Math.floor(
			(x.getTime() + x.getTimezoneOffset() * 60 * 1000) / 1000
		) // UTC seconds
		var nonce = Math.floor(Math.random() * 100000)
		var chain = this.getChainId() || 1
		var address = this.address()
		var signature = await this.signVote({
			chain,
			showId, //100002
			vote,
			nonce,
			stamp,
		})
		// console.log(signature) // FIXME: remove after testing
		// return Promise.resolve(null) // FIXME: remove after testing
		if (!signature) return Promise.resolve(false)
		const payload = {
			address: this.address(),
			nonce,
			stamp,
			signature,
			chainId: parseInt(this.getChainId()),
			version: '1',
			id: showId,
			result: vote,
		}

		// TODO: axios
		let res2 = await axios
			.post(this.servers.business[this.branch] + 'api/dao/Vote', payload, {
				headers: this.store.state.notAppUser
					? { Domain: this.node, Language: 'en', Terminal: 'web' }
					: {
							SeerToken: this.store.state.seerToken,
							Domain: this.node,
							Language: 'en',
							Terminal: 'web',
					  },
			})
			.then((res) => {
				// console.log('/api/dao/Vote then', res)
				if (res.data.message != 'Success') {
					this.popup({ text: `<p><b>Error</b><br />${res.data.message}</p>` })
					return false
				}
				return vote
			})
			.catch((error) => {
				// console.log('error', error.message)
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return false
			})
		return Promise.resolve(res2)
		// return {
		// 	address,
		// 	nonce,
		// 	stamp,
		// 	signature,
		// 	chainId: chain,
		// 	version: '1',
		// 	id: showId,
		// 	result: true,
		// }
	}

	// vote = async (showId) => {

	// }

	async info() {
		// console.log('info()')
		if (!this.store.state.seerToken) {
			// console.log('info() !this.store.state.seerToken')
			setTimeout(async () => {
				return Promise.resolve(await this.info())
			}, 1000)
			return
		}
		let x = new Date()
		let stamp = Math.floor(
			(x.getTime() + x.getTimezoneOffset() * 60 * 1000) / 1000
		) // UTC seconds
		let nonce = Math.floor(Math.random() * 100000)
		axios
			.get(this.servers.business[this.branch] + 'api/dao/Info', {
				headers: {
					SeerToken: this.store.state.seerToken,
					Domain: this.node,
					Language: 'en',
					Terminal: 'web',
				},
			})
			.then((response) => {
				this.daoInfo = response.data.data
				if (response.data.message == 'SystemBusy') {
					setTimeout(() => {
						;async () => {
							this.popup({
								text: `<p>System is busy, trying again…</p>`,
								timeout: 500,
							})
							return Promise.resolve(await this.info())
						}
					}, 1000)
					return Promise.resolve(false)
				} else if (response.data.message == 'UserNotFound') {
					// this.popup({
					// 	text: `<p>Please, go to <a href="//app.seer.eco" target=_blank>app.seer.eco</a> and register an account first</p>`,
					// 	timeout: 5000,
					// })
					this.store.dispatch('save', { k: 'notAppUser', v: true }) // make a mark this user isn't registered on app.seer.eco
					this.store.dispatch('save', { k: 'walletLoading', v: false })
					// this.store.dispatch('save', { k: 'address', v: null })
					// this.address = null
					return Promise.resolve(false)
				} else {
					this.store.dispatch('save', {
						k: 'daoInfo',
						v: response.data.data,
					})
					this.store.dispatch('save', { k: 'notAppUser', v: false })
					return Promise.resolve(response.data.data)
				}
			})
			.catch((error) => {
				return Promise.resolve(false)
				// console.log(error.message)
				//     {
				//     "code": 10000,
				//     "message": "InvalidParameter",
				//     "data": {}
				// }
			})
	}

	ticketsNumber = async () => {
		if (!this.store.state.seerToken || !this.store.state.daoInfo) {
			setTimeout(() => {
				this.ticketsNumber()
			}, 100)
			return
		}
		const Contract = this.web3js2.eth.Contract
		this.DSNContract = new Contract(
			this.vote_abi,
			this.daoInfo.configs.dsnContract //'0x2102342b5b6e4ca45e32edca2790620e8fdd7f87' contract, address
		)

		let balance = await this.DSNContract.methods
			.balanceOf(this.store.state.address) // '0x95e6FeeeBDD83a44EB7Ca87F3EEeC4632F4218A5' is 4
			.call()
		this.store.dispatch('save', {
			k: 'ticketsNumber',
			v: balance,
		})

		return balance
	}

	PreTwitter = async () => {
		let res2 = await axios
			.get(this.servers.business[this.branch] + 'api/dao/PreTwitter', {
				headers: this.store.state.notAppUser
					? {
							Domain: this.node,
							Language: 'en',
							Terminal: 'web',
					  }
					: {
							SeerToken: this.store.state.seerToken,
							Domain: this.node,
							Language: 'en',
							Terminal: 'web',
					  },
			})
			.then((response) => {
				if (response.data.message == 'Success') {
					return response.data.data
				} else {
					this.popup(response.data.message)
					return false
				}
			})
			.catch((error) => {
				this.popup(error.message)
			})
		return Promise.resolve(res2)
	}
}
