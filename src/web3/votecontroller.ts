import { store } from '../main'
import { comingSoon, messageType } from '../common/helper'

declare const window: any
import {
	Login,
	Vote,
	EIP712Domain,
	verifyingContract,
	contents,
} from './common'
import LoginController from './logincontroller'

export default class VoteController extends LoginController {
	signVote = async (param: {
		chain: string | number
		showId: number
		vote: Boolean //true, false
		nonce: number
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
				contents, //固定
				action: 'vote', //固定
				nonce: param.nonce, //用户的Nonce
				stamp: param.stamp, //时间戳
				id: param.showId, //投票的showId
				result: param.vote, //通过 true,拒绝 false
			},
			primaryType: 'Vote',
			types: {
				EIP712Domain,
				Vote,
			},
		}
		let hash = await this.web3js.currentProvider.request({
			method: 'eth_signTypedData_v4',
			params: [
				(
					await window.ethereum.enable()
				)[0], //window.ethereum.selectedAddress.toLocaleLowerCase(),
				JSON.stringify(msgParams),
			],
		})
		return Promise.resolve(hash)
	}
}
