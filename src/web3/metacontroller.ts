import { pause } from './../common/helper'
import web3 from 'web3'
// import login from './login'
// import vote from './vote'
import vote_abi from './vote_abi.json'
import { isDev, store } from '../main'
import { popup } from '../common/helper'
import {
	servers,
	Polygon,
	PolygonDev,
	web3js2NetDev,
	web3js2Net,
	pay,
	payDev,
	eth,
	ethDev,
} from './common'
import WalletController from './walletcontroller'

declare const window: any
window.web3j = web3

export default class MetaController extends WalletController {
	public DSNContract: any
	protected vote_abi
	public servers
	public branch: string = 'local' //dev
	public node: string = 'genesis.seer.eco'
	public seerToken: string
	public onLogout: () => void
	public onLogin: () => void
	constructor() {
		super()
		this.vote_abi = vote_abi
		this.servers = servers
	}
	async logout(forceReload: boolean = true) {
		if (this.onLogout) this.onLogout()

		this.store.dispatch('unset', [
			'address',
			'daoInfo',
			'seerToken',
			'rewardInfo',
			'rewardDetail',
			'ticketsNumber',
			'eventList',
		])
	}

	async switch() {
		// check if 0x13881 polygon Mumbai testnet
		try {
			// Try to switch to the Mumbai testnet
			const res1 = await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: isDev() ? PolygonDev.chainId : Polygon.chainId }], // Check networks.js for hexadecimal network ids
			})
			await pause(1000)
		} catch (error) {
			if (error.code === 4001) {
				this.popup({ text: error.message, code: error.code }) //{ text: 'User rejected' })
				return Promise.resolve(false)
			} //user rejected
			// This error code means that the chain we want has not been added to MetaMask
			// In this case we ask the user to add it to their MetaMask
			if (error.code === 4902) {
				try {
					window.ethereum
						.request({
							method: 'wallet_addEthereumChain',
							params: [isDev() ? PolygonDev : Polygon],
						})
						.then(async (res3) => {
							// console.log('res3', res3)
							const res4 = await window.ethereum.request({
								method: 'wallet_switchEthereumChain',
								params: [
									{ chainId: isDev() ? PolygonDev.chainId : Polygon.chainId },
								], // Check networks.js for hexadecimal network ids
							})
							// console.log('res4', res4)
						})
						.then(() => {
							return Promise.resolve(true)
						})
				} catch (error) {
					console.log(error)
				}
			}
		}
		return Promise.resolve(true)
	}

	async enable(cb?: () => {}) {
		if (!this.isMetamask() && this.connector) {
			if (this.connector.connected) {
				return Promise.resolve(true)
			}
			this.walletconnect()
			return Promise.resolve(false)
		}

		// STAGE 3: add a contract to read possible tickets value from balanceOf the contract
		// this.restoreWeb3()
		if (this.isMetamask() && window.ethereum) {
			// STAGE 1: check if connected to Polygon testnet ethereum.chainId == isDev() ? PolygonDev.chainId : Polygon.chainId
			const switchRes = await this.switch()
			if (!switchRes) return Promise.resolve(false)

			// STAGE 2: TODO: clean acc info after account has been changed
			window.ethereum.on('accountsChanged', (accounts) => {
				this.logout(false)
				// window.location.reload()
			})
			window.ethereum.on('chainChanged', (chainId) => {
				this.logout(false)
			})

			window.ethereum.on('message', (message) => {
				console.log('eth.message', message)
			})

			try {
				let address = (
					await window.ethereum.request({ method: 'eth_requestAccounts' })
				)[0]
				// // STAGE 4: add a contract to read possible tickets value from balanceOf the contract
				store.dispatch('save', {
					k: 'address',
					v: address, // or await window.ethereum.enable() and window.ethereum.selectedAddress.toLocaleLowerCase()
				})
				// this.address = this.store.state.address
				// if (cb) {
				// 	window.localStorage.setItem(
				// 		'cb',
				// 		setInterval(() => {
				// 			if (this.store.state.daoInfo) {
				// 				clearInterval(window.localStorage['cb'])
				// 				window.localStorage.removeItem('cb')
				// 				cb()
				// 			}
				// 		}, 1000)
				// 	)
				// }
				Promise.resolve(true)
			} catch (error: any) {
				this.popup({
					timeout: 5000,
					text: `<p>Oops! Something went wrong:<br /><b>${error.message}</b></p>`,
				})
				// console.log(error.message)
			}
			this.web3js = new web3(window.ethereum) // restore MetaMask rpc to sign requests
			window.web3js = this.web3js
			//
			return Promise.resolve(true)
		} else {
			this.popup({
				timeout: 5000,
				text: `<p>Please, install <a href="https://metamask.io/download/" target=_blank>Metamask</a></p>`,
			})
		}
		return Promise.resolve(false)
	}
}
