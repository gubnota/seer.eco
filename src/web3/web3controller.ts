import { addressPartially, isLocal } from '../common/helper'
import PayController from './paycontroller'
declare const window: any
export default class Web3Controller extends PayController {
	addressPartially(address) {
		if (!address) address = this.store.state.address
		if (typeof address != 'string') {
			this.logout()
			return
		}
		return addressPartially(address)
	}

	chooseConnect() {
		if (window.ethereum) {
			//choose between Metamask Wallet connect
			this.store.dispatch('save', {
				k: 'chooseConnect',
				v: 'block',
			})
			return
		} else {
			this.walletconnect()
			return
		}
	}
	async logout(forceReload: boolean = true) {
		await super.logout()
		if (!this.isMetamask()) this.onwalletdisconnect()
		if (forceReload) window.location.reload()
	}

	async onwalletconnect() {
		await super.onwalletconnect()
		this.login(true) //arg means to force show QR for 2nd call
		console.log('onwalletconnect cb')
	}
	async onwalletdisconnect() {
		super.onwalletdisconnect()
	}

	async restoreWeb3() {
		await super.restoreWeb3()
		if (this.store.state.address && !this.store.state.seerToken) {
			this.store.dispatch('unset', ['address'])
		}
		if (
			!!this.connector &&
			this.connector.connected &&
			!this.store.state.address
		) {
			this.connector.killSession()
		}
		if (this.store.state.address) {
			// console.log('restoreWeb3')
			// if it's defined (already logged on)
			let a = await this.enable()
			// if (a) {
			// 	let b = await window.ethereum.request({ method: 'eth_requestAccounts' })
			// 	if (b[0] != this.store.state.address) {
			// 		//address is not the same
			// 	}
			// }
		}
	}

	constructor() {
		super()
		this.branch = isLocal() ? 'dev' : 'dev' // local || dev || release
	}

	fetchRelated = async () => {
		this.rewardInfo()
		if (this.store.state.daoInfo && this.store.state.daoInfo.isDao) {
			let a = await this.rewardInfo()
			this.store.dispatch('save', { k: 'rewardInfo', v: a })
		}
	}

	async login(forceQR: boolean = false, cb?: () => {}) {
		try {
			this.store.dispatch('save', { k: 'loading', v: true })
			const connect = await this.connect(forceQR, () => {
				cb()
				this.fetchRelated()
				return Promise.resolve(true)
			})
			this.store.dispatch('save', { k: 'loading', v: false })
			if (!connect) return Promise.resolve(false)
		} catch (error) {
			this.store.dispatch('save', { k: 'loading', v: false })
			if (error.code == 4001) {
				// logout
				this.logout()
				this.store.dispatch('save', { k: 'walletLoading', v: false })
				console.log('login error', error)
				this.popup({ text: error.message })
				return Promise.resolve(false)
			}
		}

		// setTimeout(async () => {
		if (this.store.state.path == '/dao') {
			const info = await this.info()
			const tickets = await this.ticketsNumber()
		}
		if (this.store.state.path == '/dsn') {
			this.store.dispatch('unset', ['notAppUser'])
			const myDSNs = await this.MyDSNs()
		}
		// setTimeout(async () => {

		// const events = await this.eventList()
		if (this.onLogin) this.onLogin()

		return true
		// console.log({ connect, info, tickets, events })
	}
}
