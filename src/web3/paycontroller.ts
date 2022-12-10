import { pause } from '../common/helper'
import { isDev } from '../main'
import { Polygon, PolygonDev } from './common'
import DSNController from './dsncontroller'
import dsnAbi from '../common/dsn_sell_abi.json'
import usdtAbi from '../common/usdt_abi.json'
import web3 from 'web3'

declare const window: any
export default class PayController extends DSNController {
	USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7' //'0xa8c497D6A54fbe3cce944417C87d1cFba0419B3E'
	PayDSN = '0x2688a99Cf53Bbaac107c9e2B4F300888FC84B07F' //'0xf91b84c72F7800C575Ecce3e50A0A587C9EB1540'
	public PayDSNContract: any
	public USDTContract: any

	async createPayContracts() {
		const web = this.web3js //new web3('https://rpc.ankr.com/eth') // only to check ticketsNumber(): window.ethereum release, Polygon test dev
		//https://rpc.ankr.com/eth_goerli'
		const Contract = web.eth.Contract // @ts-ignore
		this.PayDSNContract = new Contract(dsnAbi, this.PayDSN) // @ts-ignore
		this.USDTContract = new Contract(usdtAbi, this.USDT)
		window.PayDSNContract = this.PayDSNContract
		window.USDTContract = this.USDTContract
	}
	async testPayNetwork() {
		return true
		try {
			if (!window.ethereum) {
				var a = await this.enable()
				if (!a) return Promise.resolve(false)
				// console.log('this.enable()', a)
				// this.popup({ text: 'Use Metamask enabled browser' })
				// setTimeout(() => {
				// 	return Promise.resolve(false)
				// }, 1000)
			}
			// Try to switch to the Mumbai testnet
			if (window.ethereum.chainId != '0x5') {
				const res1 = await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x5' }], // Check networks.js for hexadecimal network ids
				})
			}
			// change contract to write (Metamask-backed one)
			const Contract = this.web3js.eth.Contract // @ts-ignore
			this.PayDSNContract = new Contract(dsnAbi, this.PayDSN) // @ts-ignore
			this.USDTContract = new Contract(usdtAbi, this.USDT)

			return Promise.resolve(true)
		} catch (error) {
			console.log('testPayNetwork err', error)
			if (error.code === 4001) {
				this.popup({ text: error.message, code: error.code }) //{ text: 'User rejected' })
				return Promise.reject(false)
			} //user rejected
		}
	}

	async paySellInfo() {
		const a = this.store.state.paySellInfo,
			b = Math.ceil(new Date().getTime() / 1000)

		if (a && a.expiry > b) {
			return Promise.resolve(this.store.state.paySellInfo.data)
		}

		try {
			const c = await this.PayDSNContract.methods.sellInfo().call()
			this.store.dispatch('save', {
				k: 'paySellInfo',
				v: {
					expiry: b + 30,
					data: c,
				},
			})
			return Promise.resolve(c)
		} catch (e) {
			this.popup({ text: e.toString() })
			return Promise.resolve({
				price: '0',
				selled: '0',
				startTime: '0',
				stopTime: '0',
				total: '0',
			})
		}
	}

	async payPrice() {
		//get unit price
		const a = await this.paySellInfo()
		return Promise.resolve(
			parseFloat(this.web3js.utils.fromWei(a['price'], 'mwei'))
		)
	}
	async payDiscount(coupon: string) {
		//get multiplier, multi*price = totalPrice
		try {
			console.log('discount call', coupon)
			const a = await this.PayDSNContract.methods.discount(coupon).call()
			return Promise.resolve(parseInt(a) / 10000)
		} catch (e) {
			this.popup({ text: e.toString() })
			return Promise.resolve(1)
		}
	}
	async payAllowance() {
		let a = await this.USDTContract.methods
			.allowance(this.address, this.PayDSN)
			.call() //'1500000000'
		return Promise.resolve(parseFloat(this.web3js.utils.fromWei(a, 'mwei'))) // 1500
	}

	async payBuy(qty: number = 1, coupon: string = '') {
		//, ref: string = ''
		// if (ref == '' || !this.web3js.utils.isAddress(ref))
		// 	ref = `0x${new Array(40).fill(0).join('')}`
		// console.log('buy', qty.toString(), coupon, ref)
		try {
			const a = await this.PayDSNContract.methods
				.buy(qty.toString(), coupon) //buy(数量，口令) before ref邀请人)
				.send({ from: this.address })
			return Promise.resolve(true)
		} catch (e) {
			this.popup({ text: e.code + ' ' + e.message })
			console.log('payBuy false')
			this.store.dispatch('save', {
				k: 'loading',
				v: false,
			})

			return Promise.reject(false)
		}
	}

	async payApprove(amount: number) {
		let amnt = this.web3js.utils.toWei(amount.toString(), 'mwei')
		try {
			const a = await this.USDTContract.methods
				.approve(this.PayDSN, amnt)
				.send({ from: this.address })
			return Promise.resolve(true)
		} catch (e) {
			this.popup({ text: e.code + ' ' + e.message })
			return Promise.reject(false)
		}
	}

	async payBalance() {
		try {
			let a = await this.USDTContract.methods.balanceOf(this.address).call()
			return Promise.resolve(parseFloat(this.web3js.utils.fromWei(a, 'mwei')))
		} catch (e) {
			this.popup({ text: e.code + ' ' + e.message })
			return Promise.reject(false)
		}
	}

	async swichBackNetwork() {
		try {
			// Try to switch to the Mumbai testnet
			const res1 = await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: isDev() ? PolygonDev.chainId : Polygon.chainId }], // Check networks.js for hexadecimal network ids
			})
		} catch (error) {
			if (error.code === 4001) {
				this.popup({ text: error.message, code: error.code }) //{ text: 'User rejected' })
				this.store.dispatch('save', {
					k: 'loading',
					v: false,
				})
				return Promise.resolve(false)
			} //user rejected
		}
	}
}
