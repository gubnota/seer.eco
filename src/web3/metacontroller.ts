import web3 from 'web3'
import login from './login'
import vote from './vote'
import vote_abi from './vote_abi.json'
import { store } from '../main'
import { comingSoon, messageType } from '../common/helper'
import { provider } from 'web3-core'
import { servers } from './common'

// store.dispatch('save', {
// 	k: 'modal',
// 	v: 'none',
// })
// store.state.modal

declare const window: {
	ethereum: any //{ chainId: string; on: any; selectedAddress?: string }
	web3js2: any
	web3js: any
	location: any
	localStorage: any
}

export default class MetaController {
	public MumbaiProvider: any
	public web3js: web3
	public web3js2: web3
	public DSNContract: any
	public address: String
	public store
	public popup
	protected vote_abi
	public servers
	public branch: string = 'dev'
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

	restoreWeb3 = () => {
		this.web3js = new web3(window.ethereum) // - default provider
		this.web3js2 = new web3(this.MumbaiProvider) //window.ethereum - default provider
		this.address = store.state.address
	}
	async enable(cb?: () => {}) {
		const startTime = new Date()
		if (window.ethereum) {
			// STAGE 1: check if connected to Ethereum main network ethereum.chainId == '0x1'
			if (window.ethereum.chainId !== '0x1') {
				// this.popup({
				// 	timeout: 5000,
				// 	text: `<p><b class="rainbow">${window.ethereum.chainId}</b> is not the correct chainId<br /> Connect to <strong>Ethereum Mainnet</strong>, please</p>`,
				// })
				await this.web3js.currentProvider.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x1' }],
				})
				// return Promise.resolve(false)
			}

			// STAGE 2: TODO: clean acc info after account has been changed
			window.ethereum.on('accountsChanged', (accounts) => {
				this.logout()
				// window.location.reload()
			})

			window.ethereum.on('message', (message) => {
				console.log('eth.message', message)
			})

			// STAGE 3: add a contract to read possible tickets value from balanceOf the contract
			this.MumbaiProvider = new web3.providers.HttpProvider(
				'https://matic-mumbai.chainstacklabs.com'
			)
			this.restoreWeb3()
			try {
				// // STAGE 4: add a contract to read possible tickets value from balanceOf the contract
				// this.popup({
				// 	timeout: 5000,
				// 	text: 'Your <a href=//app.seer.eco target=_blank>app.seer.eco account</a> is not registered',
				// })
				// return false
				store.dispatch('save', {
					k: 'address',
					v: (await window.ethereum.enable())[0], // or await window.ethereum.enable() and window.ethereum.selectedAddress.toLocaleLowerCase()
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
				const elapsedTime = new Date().getTime() - startTime.getTime()

				console.log(`enable() took ${elapsedTime}ms`)
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

		this.web3js.eth.getBlockNumber().then((result: any) => {
			// console.log('Latest Ethereum Block is ', result)
		})
		return Promise.resolve(false)
	}

	// connect = async () => {
	// 	await this.load()
	// 	await this.login2()
	// }

	// disconnect = () => {
	// this.address = null
	// this.$store.commit('setAddress', null)
	// localStorage.removeItem('forceBitkeep')
	// }
}
