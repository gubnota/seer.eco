import { pause } from './../common/helper'
import web3 from 'web3'
// import login from './login'
// import vote from './vote'
import vote_abi from './vote_abi.json'
import { isDev, store } from '../main'
import { comingSoon, messageType } from '../common/helper'
import { provider } from 'web3-core'
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

declare const window: any
window.web3j = web3

export default class MetaController {
	public web3js: web3
	public web3js2: web3 // ticketsNumber contract
	public web3Pay: web3 // paycontroller related
	public DSNContract: any
	public address: String
	public store
	public popup
	protected vote_abi
	public servers
	public branch: string = 'local' //dev
	public node: string = 'genesis.seer.eco'
	public seerToken: string
	public onLogout: () => void
	public onLogin: () => void
	constructor() {
		this.store = store
		this.popup = comingSoon
		this.vote_abi = vote_abi
		this.servers = servers
	}
	async logout() {
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

	async restoreWeb3() {
		// 1. restore all read-only contracts to connect appropriate networks
		// 2. connect to a network if it's enabled (see in web3controller)
		if (window.ethereum) {
			this.web3js = new web3(window.ethereum) // - default provider with Metamask to sign
		} else {
			this.web3js = new web3(isDev() ? ethDev : eth) // - default provider with Metamask to sign
		}
		this.web3js2 = new web3(isDev() ? web3js2NetDev : web3js2Net) // only to check ticketsNumber(): window.ethereum release, Polygon test dev
		this.web3Pay = new web3(isDev() ? payDev : pay) // paycontroller related
		this.address = store.state.address
		window.web3js = this.web3js
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
		// STAGE 3: add a contract to read possible tickets value from balanceOf the contract
		// this.restoreWeb3()
		if (window.ethereum) {
			// STAGE 1: check if connected to Polygon testnet ethereum.chainId == isDev() ? PolygonDev.chainId : Polygon.chainId
			const switchRes = await this.switch()
			if (!switchRes) return Promise.resolve(false)

			// STAGE 2: TODO: clean acc info after account has been changed
			window.ethereum.on('accountsChanged', (accounts) => {
				this.logout()
				window.location.reload()
			})

			window.ethereum.on('message', (message) => {
				console.log('eth.message', message)
			})

			try {
				// // STAGE 4: add a contract to read possible tickets value from balanceOf the contract
				store.dispatch('save', {
					k: 'address',
					v: (
						await window.ethereum.request({ method: 'eth_requestAccounts' })
					)[0], // or await window.ethereum.enable() and window.ethereum.selectedAddress.toLocaleLowerCase()
				})
				this.address = store.state.address
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
			window.web3js = this.web3js
			//
			return Promise.resolve(true)
		} else {
			this.popup({
				timeout: 5000,
				text: `<p>Please, install <a href="https://metamask.io/download/" target=_blank>Metamask</a></p>`,
			})
			// alert('Please open the MetaMask')
		}

		// this.web3js.eth.getBlockNumber().then((result: any) => {
		// console.log('Latest Ethereum Block is ', result)
		// })
		return Promise.resolve(false)
	}

	// disconnect = () => {
	// this.address = null
	// this.$store.commit('setAddress', null)
	// localStorage.removeItem('forceBitkeep')
	// }
}
