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
}

export default class MetaController {
	public MumbaiProvider: any
	public web3js: any
	public web3js2: any
	public DSNContract: any
	public address: String
	public store
	public popup
	protected vote_abi
	public servers
	public branch: string = 'dev'
	public node: string = 'genesis.seer.eco'
	public seerToken: string
	constructor() {
		this.store = store
		this.popup = comingSoon
		this.vote_abi = vote_abi
		this.servers = servers
	}

	enable = async () => {
		if (window.ethereum) {
			// STAGE 1: check if connected to Ethereum main network ethereum.chainId == '0x1'
			if (window.ethereum.chainId !== '0x1') {
				this.popup({
					timeout: 5000,
					text: `<p><b class="rainbow">${window.ethereum.chainId}</b> is not the correct chainId<br /> Connect to <strong>Ethereum Mainnet</strong>, please</p>`,
				})
				return
			}

			// STAGE 2: reload after account has been changed
			window.ethereum.on('accountsChanged', function (accounts) {
				window.location.reload()
			})

			// STAGE 3: add a contract to read possible tickets value from balanceOf the contract
			this.MumbaiProvider = new web3.providers.HttpProvider(
				'https://matic-mumbai.chainstacklabs.com'
			)
			this.web3js = new web3(window.ethereum) // - default provider
			this.web3js2 = new web3(this.MumbaiProvider) //window.ethereum - default provider
			try {
				const adds = await window.ethereum.enable()
				// // STAGE 3: add a contract to read possible tickets value from balanceOf the contract
				// this.popup({
				// 	timeout: 5000,
				// 	text: 'Your <a href=//app.seer.eco target=_blank>app.seer.eco account</a> is not registered',
				// })
				// return false

				store.dispatch('save', {
					k: 'address',
					v: window.ethereum.selectedAddress.toLocaleLowerCase(), //adds[0], //
				})
				this.address = store.state.address
			} catch (error: any) {
				this.popup({
					timeout: 5000,
					text: `<p>Oops! Something went wrong:<br /><b>${error.message}</b></p>`,
				})

				// console.log(error.message)
			}
			window.web3js = this.web3js
			//
			return true
		} else {
			this.popup({
				timeout: 5000,
				text: `<p>Please, install <a href="https://metamask.io/download/" target=_blank>Metamask</a></p>`,
			})
			// alert('Please open the MetaMask')
		}
		window.web3js.eth.getBlockNumber().then((result: any) => {
			// console.log('Latest Ethereum Block is ', result)
		})
		return false
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
