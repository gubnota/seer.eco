import { popup } from '../common/helper'
import { isDev, store } from '../main'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
//web3modal@1.9.10.js
import web3 from 'web3'
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
export default class WalletController {
	// public isMetamask: boolean
	public store
	public popup
	protected wcBridgeUrl = 'https://walletconnect.seer.eco'
	public connector // WalletConnect
	// public qr // qrCodeModal
	public web3js: web3
	public web3js2: web3 // ticketsNumber contract
	public web3Pay: web3 // paycontroller related

	constructor() {
		this.store = store
		this.popup = popup
		// const WalletConnect = window.WalletConnect.default
		this.connector = new WalletConnect({
			bridge: this.wcBridgeUrl,
			qrcodeModal: QRCodeModal,
		})
		window.connector = this.connector
		if (this.connector.connected) {
			this.walletconnect()
		}
	}

	getChainId() {
		return this.isMetamask() ? window.ethereum.chainId : this.connector.chainId
	}
	isMetamask() {
		return !!this.store.state.isMetamask
	}

	async restoreWeb3() {
		// 1. restore all read-only contracts to connect appropriate networks
		// 2. connect to a network if it's enabled (see in web3controller)
		if (window.ethereum) {
			if (window.ethereum.chainId == '0x1') {
				this.web3js = new web3(window.ethereum) // - default provider with Metamask to sign
			} else {
				this.web3js = new web3(isDev() ? ethDev : eth) // - default provider with Metamask to sign
			}
		} else {
			this.web3js = new web3(isDev() ? ethDev : eth) // - default provider with Metamask to sign
		}
		this.web3js2 = new web3(isDev() ? web3js2NetDev : web3js2Net) // only to check ticketsNumber(): window.ethereum release, Polygon test dev
		this.web3Pay = new web3(isDev() ? payDev : pay) // paycontroller related
		// this.address = store.state.address

		window.web3js = this.web3js
	}

	async signTypedData(msgParams: any) {
		let hash
		if (this.isMetamask()) {
			hash = await this.web3js.currentProvider
				.request({
					method: 'eth_signTypedData_v4',
					params: [
						this.address(), //window.ethereum.selectedAddress.toLocaleLowerCase(),
						JSON.stringify(msgParams),
					],
				})
				.catch((error: any) => {
					// Error returned when rejected
					console.error('signTypedData', error, `"${error}"`)
					//{code: 4001, message: 'MetaMask Message Signature: User denied message signature.'}
					return Promise.resolve(false)
				})
		} else {
			// console.log('signTypedData', this.address(), JSON.stringify(msgParams))
			hash = await this.connector
				.signTypedData([this.address(), JSON.stringify(msgParams)])
				.catch((error: any) => {
					// Error returned when rejected or cancelled
					// 'Error: Actionscancelled by user'
					// 'Error: wallet is in another signing'
					// 'Error: Session currently disconnected'
					console.error(
						'signTypedData',
						`'${error.toString()}'`,
						error.toString(), //'Error: 在该链下找不到此钱包！'
						error.toString() == 'Error:  wallet is in another signing',
						error.toString() == 'Error: Actionscancelled by user'
					)
					this.onwalleterror(error)
					return Promise.resolve(false)
				})
		}
		return Promise.resolve(hash)
	}

	address() {
		if (this.store.state.address) return this.store.state.address
		if (this.isMetamask())
			return window.ethereum.selectedAddress.toLocaleLowerCase()
		if (this.connector)
			return this.connector.connected
				? this.connector.accounts[0].toLocaleLowerCase() ?? null
				: null
		return null
	}
	/*
  onwalletconnect()
  */
	async onwalletconnect() {
		this.store.dispatch('save', {
			k: 'address',
			v: this.connector.accounts[0],
		})
	}
	/*
  onwalletdisconnect()
  */
	async onwalletdisconnect() {
		this.store.dispatch('save', { k: 'address', v: null })
		await this.connector.killSession()
	}
	async onwalleterror(error) {
		console.log('onwalleterror', error)
		this.popup({
			text: error.toString(),
			timeout: 3000,
		})

		await this.connector.killSession()
	}
	/**
	 * Connect wallet button pressed.
	 */
	async walletconnect(forceQR: boolean = true) {
		console.log('walletconnect', forceQR, this.address())
		// const WalletConnect = window.WalletConnect.default
		this.connector = new WalletConnect({
			bridge: this.wcBridgeUrl,
			qrcodeModal: QRCodeModal,
		})
		window.connector = this.connector
		if (!this.connector.connected && forceQR) {
			await this.connector.createSession().catch((error: any) => {
				// Error returned when rejected
				console.error('createSession', error, `"${error}"`) // 'Error: Session currently connected'
				this.onwalleterror(error)
			})
		} else {
			// Already connected
			this.store.dispatch('save', {
				k: 'address',
				v: this.connector.accounts[0],
			})
			// TODO: login logic
		}
		this.connector.on('session_update', (e, pl) => {
			console.log('session_update', e, pl)
			if (this.connector.connected) {
				this.store.dispatch('save', {
					k: 'address',
					v: this.connector.accounts[0],
				})

				if (this.connector.chainId != 1) {
					this.onwalleterror(
						'Wrong network detected, please change to Ethereum Mainnet'
					)
				}
			}
		})
		this.connector.on('disconnect', (error, payload) => {
			// if (error) {
			// 	throw error
			// }
			if (error) this.onwalleterror(error)
			this.onwalletdisconnect()
		})
		this.connector.on('connect', (error, payload) => {
			// if (error) {
			// 	throw error
			// }
			if (this.connector.chainId != 1) {
				this.onwalleterror(
					'Wrong network detected, please change to Ethereum Mainnet'
				)
			} else {
				this.onwalletconnect()
			}
		})
	}
}
