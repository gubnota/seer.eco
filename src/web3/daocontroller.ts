import axios from 'axios'
import { daoInfoT } from './common'
import UserController from './usercontroller'
import { store } from '../main'
declare const window: any
// interaction with 9993 Business API
export default class DaoController extends UserController {
	public voteToken: string = ''
	public daoInfo: daoInfoT

	vote = async (showId) => {
		var x = new Date()
		var stamp = Math.floor(
			(x.getTime() + x.getTimezoneOffset() * 60 * 1000) / 1000
		) // UTC seconds
		var nonce = Math.floor(Math.random() * 100000)
		var chain = 1
		var address = this.address
		var signature = await this.signVote({
			chain,
			event: showId, //100002
			vote: true,
			nonce,
			stamp,
		})
		// TODO axios
		return {
			address,
			nonce,
			stamp,
			signature,
			chainId: chain,
			version: '1',
			id: showId,
			result: true,
		}
	}

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
		console.log('stamp', stamp, 'seerToken', window.seerToken)
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
						this.info()
					}, 1000)
					return
				} else if (response.data.message == 'UserNotFound') {
					this.popup({
						text: `<p>Please, go to <a href="//app.seer.eco" target=_blank>app.seer.eco</a> and register an account first</p>`,
						timeout: 5000,
					})
					this.store.dispatch('save', { k: 'address', v: null })
					this.address = null
					return
				} else {
					this.store.dispatch('save', {
						k: 'daoInfo',
						v: response.data.data,
					})
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
}
