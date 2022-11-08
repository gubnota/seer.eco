import { comingSoon, messageType } from '../common/helper'
import { store } from '../main'
import axios from 'axios'
import VoteController from './votecontroller'
// interaction with 9973 User API
export default class UserController extends VoteController {
	public seerToken: string = ''
	// public address: string = ''
	// public signature: string = ''
	constructor() {
		super() // explicitly call parent constructor.
	}
}
