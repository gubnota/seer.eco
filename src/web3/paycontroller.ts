import { pause } from '../common/helper'
import { isDev } from '../main'
import { Polygon, PolygonDev } from './common'
import DSNController from './dsncontroller'
import dsnAbi from '../common/dsn_sell_abi.json'
import usdtAbi from '../common/usdt_abi.json'

declare const window: any
export default class PayController extends DSNController {
	USDT = '0xa8c497D6A54fbe3cce944417C87d1cFba0419B3E'
	PayDSN = '0xf2Aa7DE215b15Ce42f41ABfC49268B9F0Cb8B416'
	public PayDSNContract: any
	public USDTContract: any

	async testPayNetwork() {
		try {
			// Try to switch to the Mumbai testnet
			if (window.ethereum.chainId != '0x5') {
				const res1 = await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x5' }], // Check networks.js for hexadecimal network ids
				})
			}

			const Contract = this.web3js.eth.Contract // @ts-ignore
			this.PayDSNContract = new Contract(dsnAbi, this.PayDSN) // @ts-ignore
			this.USDTContract = new Contract(usdtAbi, this.USDT)
			window.PayDSNContract = this.PayDSNContract
			window.USDTContract = this.USDTContract
			return Promise.resolve(true)
		} catch (error) {
			console.log('testPayNetwork err', error)
			if (error.code === 4001) {
				this.popup({ text: 'User rejected' })
				return Promise.reject(false)
			} //user rejected
		}
	}

	async payPrice() {
		//get unit price
		try {
			const a = await this.PayDSNContract.methods.price().call()
			return Promise.resolve(parseFloat(this.web3js.utils.fromWei(a, 'mwei')))
		} catch (e) {
			this.popup({ text: e.toString() })
			return Promise.resolve(0)
		}
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

	async payBuy(qty: number = 1, coupon: string = '', ref: string = '') {
		if (ref == '' || !this.web3js.utils.isAddress(ref))
			ref = `0x${new Array(40).fill(0).join('')}`
		console.log('buy', qty.toString(), coupon, ref)
		try {
			const a = await this.PayDSNContract.methods
				.buy(qty.toString(), coupon, ref) //buy(数量，口令，邀请人)
				.send({ from: this.address })
			return Promise.resolve(true)
		} catch (e) {
			this.popup({ text: e.code + ' ' + e.message })
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
				this.popup({ text: 'User rejected' })
				this.store.dispatch('save', {
					k: 'loading',
					v: false,
				})
				return Promise.resolve(false)
			} //user rejected
		}
	}
}
