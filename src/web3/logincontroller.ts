import { isDev, store } from '../main'
import axios from 'axios'

declare const window: any
import {
	Login,
	Vote,
	EIP712Domain,
	verifyingContract,
	verifyingContractDev,
	contents,
} from './common'
import MetaController from './metacontroller'

export default class LoginController extends MetaController {
	signLogin = async (param: {
		chain: string | number
		nonce: number
		stamp: number
	}) => {
		var msgParams = {
			domain: {
				chainId: parseInt(param.chain.toString()),
				name: 'SEER',
				verifyingContract: isDev() ? verifyingContractDev : verifyingContract,
				version: '1',
			},
			message: {
				contents,
				node: this.node, //假节点
				action: 'connect',
				nonce: param.nonce, //用户的Nonce nonces
				stamp: param.stamp, //时间戳 UTCseconds
			},
			primaryType: 'Login',
			types: {
				EIP712Domain,
				Login,
			},
		}
		let hash = await this.signTypedData(msgParams)
		if (hash.length < 130) return Promise.resolve(false) // not correct
		return Promise.resolve(hash)
	}

	async connect(forceQR: boolean = false, cb?: () => {}) {
		var res = await this.enable(forceQR, cb)
		// console.log('connect enable 1', res)
		// console.log('await enable', res)
		if (!res) return Promise.resolve(false)
		var x = new Date()
		var stamp = Math.floor(
			(x.getTime() + x.getTimezoneOffset() * 60 * 1000) / 1000
		) // UTC seconds
		var nonce = Math.floor(Math.random() * 100000)
		// console.log('this.enable res', res)
		var chain = this.getChainId() || 1
		// var address = window.ethereum.selectedAddress.toLocaleLowerCase()
		let signature = false
		try {
			signature = await this.signLogin({
				chain,
				nonce,
				stamp,
			})
		} catch (e) {
			// console.log('signature error', e)//{ code: 4001, message: "MetaMask Message Signature: User denied message signature." }
			if (e.code == 4001) {
				this.logout(false)
			}
			this.popup({ text: e.message })
		}
		console.log('signature', signature)
		if (!signature) return Promise.resolve(false)
		let res2 = await axios
			.post(this.servers.user[this.branch] + 'api/User/Connect', {
				address: this.address(),
				node: this.node,
				nonce: nonce,
				stamp: stamp,
				signature,
				chainId: parseInt(this.getChainId()),
			})
			.then((res) => {
				if (res.data.message != 'Success') {
					this.popup({
						text: `<p><b>Error</b><br />${res.data.message}</p>`,
						code: res.data.code,
					})
					this.store.dispatch('save', {
						k: 'address',
						v: null,
					})
					return false
				}
				this.seerToken = res.data.data
				store.dispatch('save', {
					k: 'seerToken',
					v: res.data.data,
				})
				// console.log('this.seerToken', this.store.state.seerToken)
				return res.data.data
				// return true
				//   {
				//     "code": 0,
				//     "message": "Success",
				//     "data": "e14e6c9b665e4fe0a7aa5afee5053926"
				// }
			})
			.catch((error) => {
				console.log('error', error.message)
				this.popup({
					timeout: 5000,
					text: `<p><b>Error</b><br />${error.message}</p>`,
				})
				return false
			})
		// console.log('connect', res2)
		return Promise.resolve(res2)
		return false
	}
}
