import { version } from 'vue'
import Web3 from 'web3'
declare const window: any
import login from './login'
import vote from './vote'
import vote_abi from './vote_abi.json'

/*
网络名称
Mumbai 测试网络
新增 RPC URL
https://matic-mumbai.chainstacklabs.com
链 ID
80001
货币符号
MATIC
区块浏览器(可选)
https://mumbai.polygonscan.com/
取消
*/
const loadweb3 = async () => {
	let web3js
	if (window.ethereum) {
		// check if connected to Ethereum main network ethereum.chainId == '0x1'
		const MumbaiProvider = new Web3.providers.HttpProvider(
			'https://matic-mumbai.chainstacklabs.com'
		)
		web3js = new Web3(window.ethereum) // - default provider
		window.web3js2 = new Web3(MumbaiProvider) //window.ethereum - default provider
		// console.log(web3js)
		try {
			await window.ethereum.enable()
		} catch (error: any) {
			console.log(error.message)
		}
		window.web3js = web3js
	} else {
		// alert('Please open the MetaMask')
	}
	window.web3js.eth.getBlockNumber().then((result: any) => {
		// console.log('Latest Ethereum Block is ', result)
	})
}

export const connect = async () => {
	await loadweb3()
	await login2()
}

export const disconnect = () => {
	// this.address = null
	// this.$store.commit('setAddress', null)
	// localStorage.removeItem('forceBitkeep')
}

export const login2 = async () => {
	var x = new Date()
	var stamp = Math.floor(
		(x.getTime() + x.getTimezoneOffset() * 60 * 1000) / 1000
	) // UTC seconds
	var nonce = Math.floor(Math.random() * 100000)
	var node = 'genesis.seer.eco'
	var chain = 1
	var address = window.ethereum.selectedAddress.toLocaleLowerCase()
	var signature = await login({ chain, nonce, node, stamp })
}

export const vote2 = async (showId) => {
	var x = new Date()
	var stamp = Math.floor(
		(x.getTime() + x.getTimezoneOffset() * 60 * 1000) / 1000
	) // UTC seconds
	var nonce = Math.floor(Math.random() * 100000)
	var node = 'genesis.seer.eco'
	var chain = 1
	var address = window.ethereum.selectedAddress.toLocaleLowerCase()
	var signature = await vote({
		chain,
		event: showId, //100002
		vote: true,
		nonce,
		node,
		stamp,
	})

	return {
		address,
		nonce,
		stamp,
		signature,
		chainId: chain,
		// node,
		version: '1',
		id: 100002,
		result: true,
	}
}

export const balanceOf = async (address) => {
	const Contract = window.web3js2.eth.Contract
	window.DSNContract = new Contract(
		vote_abi,
		'0x2102342b5b6e4ca45e32edca2790620e8fdd7f87' //contract address
	)

	let balance = await window.DSNContract.methods
		.balanceOf(address) // '0x95e6FeeeBDD83a44EB7Ca87F3EEeC4632F4218A5' is 4
		.call()
	// console.log('DSN Contract balanceOf 0x95…18A5', balance)
	return balance
}
