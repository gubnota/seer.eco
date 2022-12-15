import { isDev, store } from '../main'
import { comingSoon, messageType } from '../common/helper'

declare const window: any
import {
	Login,
	Vote,
	EIP712Domain,
	verifyingContract,
	verifyingContractDev,
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
				verifyingContract: isDev() ? verifyingContractDev : verifyingContract,

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

		let hash = await this.signTypedData(msgParams)
		if (hash.length < 130) return Promise.resolve(false) // not correct
		return Promise.resolve(hash)
	}
}
