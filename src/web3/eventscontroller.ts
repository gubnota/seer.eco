import axios from 'axios'
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

	eventDetail = async ({ eventId: string }) => {}
	eventList = async (
		p: eventListParams = { tab: eventTab.Waiting, from: 1, limit: 15 }
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
		if (this.seerToken)
			config = {
				headers: {
					seerToken: this.seerToken,
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
				console.log(l.total, l.list)
				this.store.dispatch('save', { k: 'eventList', v: l })
			})
			.catch((err: any) => {
				console.log('err', err)
				this.popup({ text: err.message })
			})

		//  this.totalPages =  Math.ceil(da.totalPages / p.limit)
	}
}
