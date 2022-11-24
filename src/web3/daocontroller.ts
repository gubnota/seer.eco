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
		var chain = window.ethereum.chainId || 1
		var address = this.address
		var signature = await this.signVote({
			chain,
			showId, //100002
			vote,
			nonce,
			stamp,
		})
		// console.log(signature) // FIXME: remove after testing
		// return Promise.resolve(null) // FIXME: remove after testing

		const payload = {
			address: this.address,
			nonce,
			stamp,
			signature,
			chainId: parseInt(window.ethereum.chainId),
			version: '1',
			id: showId,
			result: vote,
		}

		// TODO: axios
		axios
			.post(this.servers.business[this.branch] + 'api/dao/Vote', payload, {
				headers: {
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
					return Promise.resolve(null)
				}
				return Promise.resolve(vote)
			})
			.catch((error) => {
				// console.log('error', error.message)
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return Promise.resolve(null)
			})

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

	info = async () => {
		if (!this.store.state.seerToken) {
			setTimeout(() => {
				return this.info()
			}, 100)
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
						;() => {
							this.info()
							this.popup({
								text: `<p>System is busy, trying again…</p>`,
								timeout: 500,
							})
						}
					}, 1000)
					return
				} else if (response.data.message == 'UserNotFound') {
					this.popup({
						text: `<p>Please, go to <a href="//app.seer.eco" target=_blank>app.seer.eco</a> and register an account first</p>`,
						timeout: 5000,
					})
					this.store.dispatch('save', { k: 'walletLoading', v: false })

					this.store.dispatch('save', { k: 'address', v: null })
					this.address = null
					return
				} else {
					this.store.dispatch('save', {
						k: 'daoInfo',
						v: response.data.data,
					})
					return response.data.data
				}
			})
			.catch((error) => {
				console.log(error.message)
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
			.balanceOf(this.address) // '0x95e6FeeeBDD83a44EB7Ca87F3EEeC4632F4218A5' is 4
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
				headers: {
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
