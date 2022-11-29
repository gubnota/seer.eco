import axios from 'axios'
import { fancyError } from '../common/helper'
import {
	eventDetailT,
	eventListParams,
	eventListT,
	eventT,
	eventTab,
} from './common'
import DaoController from './daocontroller'

export default class EventsController extends DaoController {
	public totalPages = {
		Waiting: 1,
		Reject: 1,
		Passed: 1,
	}

	eventDetail = async ({ eventId: eventId }) => {
		axios
			.post(this.servers.business[this.branch] + 'api/dao/EventDetail', {
				eventId: eventId,
			})
			.then((r) => {
				let l: eventDetailT = r.data.data
				if (r.data.message != 'Success') {
					this.popup({ text: fancyError(r.data) })
					if (r.data.message == 'EventStop') {
						this.store.dispatch('unset', ['detail', 'eventDetail'])
					}
				}
				this.store.dispatch('save', { k: 'eventDetail', v: l })
			})
			.catch((err: any) => {
				// console.log('err', err)
				this.popup({ text: fancyError(err) })
			})
	}

	eventList = async (
		p: eventListParams = { tab: eventTab.Waiting, from: 1, limit: 8 }
	) => {
		let url, config
		switch (p.tab) {
			case eventTab.Waiting:
				url = 'api/dao/WaitingList'
				break
			case eventTab.Reject:
				url = 'api/dao/RejectList'
				break
			default:
				url = 'api/dao/PassList'
				break
		}
		if (this.store.state.seerToken)
			config = {
				headers: {
					SeerToken: this.store.state.seerToken,
				},
			}
		axios
			.post(
				this.servers.business[this.branch] + url,
				{ from: p.from, limit: p.limit },
				config
			)
			.then((r) => {
				let l: eventListT = r.data.data
				// console.log(l.total, l.list)
				if (l.total) this.store.dispatch('save', { k: 'eventList', v: l })
			})
			.catch((err: any) => {
				console.log('err', err)
				this.popup({ text: fancyError(err) })
			})

		//  this.totalPages =  Math.ceil(da.totalPages / p.limit)
	}
}
