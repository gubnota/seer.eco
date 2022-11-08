declare const window: any
import {
	Login,
	Vote,
	EIP712Domain,
	verifyingContract,
	contents,
} from './common'

export default async (param: {
	chain: string | number
	nonce: number
	node: string
	stamp: number
}) => {
	var msgParams = {
		domain: {
			chainId: parseInt(param.chain.toString()),
			name: 'SEER',
			verifyingContract,
			version: '1',
		},
		message: {
			contents,
			node: param.node, //假节点
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
	let hash = await window.web3js.currentProvider.request({
		method: 'eth_signTypedData_v4',
		params: [
			window.ethereum.selectedAddress.toLocaleLowerCase(),
			JSON.stringify(msgParams),
		],
	})
	return hash
}
