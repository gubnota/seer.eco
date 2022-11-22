import IncentiveController from './incentivecontroller'
import axios from 'axios'
import {
	NodeWithdraw,
	EIP712Domain,
	verifyingContract,
	contents,
} from './common'
import { getAlias, getFQN } from '../common/helper'

declare const window: any
export default class DSNController extends IncentiveController {
	DSNList = async (
		from: number = 1,
		limit: number = 9,
		search: string = ''
	) => {
		const payload = {
			from,
			limit,
			search,
		}
		let res2 = await axios
			.post(this.servers.business[this.branch] + 'api/Node/DSNList', payload, {
				headers: {
					Domain: this.node,
					Language: 'en',
					Terminal: 'web',
				},
			})
			.then((res) => {
				if (res.data.message != 'Success') {
					this.popup({ text: `<p><b>Error</b><br />${res.data.message}</p>` })
					return null //Promise.resolve(null)
				}
				return res //Promise.resolve()
			})
			.catch((error) => {
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return null //Promise.resolve(null)
			})
		this.store.dispatch('save', { k: 'dsnList', v: res2.data.data }) //initially, store first page of the DSNs
		return res2.data.data || ''
		/*
{
  cpu_average: 6
  daily_active_users: 104
  daily_income_seer: 2.264353
  daily_income_usdt: 0
  daily_user_type_native: 21// number of registered users today
  homeserver: "genesis.seer.eco"
  memory_rss: 0.0325
  monthly_active_users: 4513
  monthly_income_seer: 3.055587
  monthly_income_usdt: 0
  no: 105
  total_users: 4561
}
*/
	}

	signWithdraw = async (param: {
		chain: string | number
		token: string
		node: string
		nonce: number
		stamp: number
	}) => {
		var msgParams = {
			domain: {
				chainId: parseInt(param.chain.toString()),
				name: 'SEER',
				verifyingContract,
				version: '1',
			},
			message: {
				contents, //固定
				action: 'node withdraw', //固定
				node: param.node, //要提现的节点名
				nonce: param.nonce, //用户的Nonce
				stamp: param.stamp, //时间戳
				token: param.token, //币种名 USDT or SEER
			},
			primaryType: 'NodeWithdraw',
			types: {
				EIP712Domain,
				NodeWithdraw,
			},
		}
		let hash = await this.web3js.currentProvider.request({
			method: 'eth_signTypedData_v4',
			params: [
				(
					await window.ethereum.enable()
				)[0], //window.ethereum.selectedAddress.toLocaleLowerCase(),
				JSON.stringify(msgParams),
			],
		})
		return hash
	}

	Withdraw = async (node: string, token: string) => {
		node = getFQN(node)
		var x = new Date()
		var stamp = Math.floor(
			(x.getTime() + x.getTimezoneOffset() * 60 * 1000) / 1000
		) // UTC seconds
		var nonce = Math.floor(Math.random() * 100000)
		var chain = 1
		var address = this.address
		var signature = await this.signWithdraw({
			node,
			token,
			chain,
			nonce,
			stamp,
		})
		// console.log(signature) // FIXME: remove after testing
		// return Promise.resolve(null) // FIXME: remove after testing

		const payload = {
			address: this.address,
			nonce,
			stamp,
			node,
			token,
			signature,
			chainId: chain,
			version: '1',
		}

		// TODO: axios
		const res2 = await axios
			.post(this.servers.business[this.branch] + 'api/Node/Withdraw', payload, {
				headers: {
					SeerToken: this.store.state.seerToken,
					Domain: this.node,
					Language: 'en',
					Terminal: 'web',
				},
			})
			.then((res) => {
				// console.log('/api/Node/Vote then', res)
				if (res.data.message != 'Success') {
					this.popup({ text: `<p><b>Error</b><br />${res.data.message}</p>` })
					return null
				}
				return res.data
			})
			.catch((error) => {
				// console.log('error', error.message)
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return null
			})
		let res3 = res2.message == 'Success'
		return Promise.resolve(res3)
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

	MyDSNs = async (from: number = 1, limit: number = 1, search: string = '') => {
		const payload = {
			from,
			limit,
			search,
		}
		let res2 = await axios
			.post(this.servers.business[this.branch] + 'api/Node/MyDSNs', payload, {
				headers: {
					SeerToken: this.store.state.seerToken,
					Domain: this.node,
					Language: 'en',
					Terminal: 'web',
				},
			})
			.then((res) => {
				if (res.data.message != 'Success') {
					this.popup({ text: `<p><b>Error</b><br />${res.data.message}</p>` })
					return null //Promise.resolve(null)
				}
				return res //Promise.resolve()
			})
			.catch((error) => {
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return null //Promise.resolve(null)
			})
		// when from=1, limit = 1, it fetches only enabled NFT for My DSN Data widget
		this.store.dispatch('save', {
			k: from == 1 && limit == 1 ? 'MyDSNData' : 'MyDSNs',
			v: from == 1 && limit == 1 ? res2.data.data.list[0] : res2.data.data,
		}) //initially, store first page of the DSNs
		return res2.data.data || ''
	}

	Rewards = async (node: string = '') => {
		node = getFQN(node)
		const payload = {
			node,
		}
		let res2 = await axios
			.post(this.servers.business[this.branch] + 'api/Node/Rewards', payload, {
				headers: {
					SeerToken: this.store.state.seerToken,
					Domain: this.node,
					Language: 'en',
					Terminal: 'web',
				},
			})
			.then((res) => {
				if (res.data.message != 'Success') {
					this.popup({ text: `<p><b>Error</b><br />${res.data.message}</p>` })
					return null //Promise.resolve(null)
				}
				return res //Promise.resolve()
			})
			.catch((error) => {
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return null //Promise.resolve(null)
			})
		this.store.dispatch('save', {
			k: 'Rewards',
			v: { node, data: res2.data.data.list },
		}) //initially, store first page of the DSNs
		return res2.data.data || ''
	}

	SetNodeName = async (tokenId: number, name: string) => {
		const payload = {
			tokenId,
			name,
		}
		let res2 = await axios
			.post(
				this.servers.business[this.branch] + 'api/Node/SetNodeName',
				payload,
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
					return null //Promise.resolve(null)
				}
				return res //Promise.resolve()
			})
			.catch((error) => {
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return null //Promise.resolve(null)
			})
		return res2.data.message == 'Success'
	}

	Show = async (tokenId: number) => {
		const payload = {
			tokenId,
		}
		let res2 = await axios
			.post(this.servers.business[this.branch] + 'api/Node/Show', payload, {
				headers: {
					SeerToken: this.store.state.seerToken,
					Domain: this.node,
					Language: 'en',
					Terminal: 'web',
				},
			})
			.then((res) => {
				if (res.data.message != 'Success') {
					this.popup({ text: `<p><b>Error</b><br />${res.data.message}</p>` })
					return null //Promise.resolve(null)
				}
				return res //Promise.resolve()
			})
			.catch((error) => {
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return null //Promise.resolve(null)
			})
		return res2.data.message == 'Success'
	}
}
