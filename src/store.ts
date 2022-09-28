import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore<any>({
	state() {
		let state = {
			count: parseInt(localStorage.getItem('count')),
			// a: localStorage.getItem('a'),
		}
		try {
			state.count = parseInt(state.count.toString())
			if (isNaN(state.count)) state.count = 0
			// if (state.a.substring(0, 1) == '{') {
			// state.a = JSON.parse(state.a)
			// } else {
			// state.a = {}
			// }
		} catch (error) {
			// console.log(error)
		}
		return state
	},
	mutations: {
		increment(state) {
			//@ts-ignore
			state.count++
		},
		save(state, args) {
			// console.log('save(state,args)', state, args)
			if (args.k) {
				state[args.k] = args.v
			}
			Object.keys(state).forEach((k) => {
				let v =
					typeof state[k] == 'object'
						? JSON.stringify(state[k])
						: parseInt(state[k])
				// console.log(
				// 	'k,v, state[k]',
				// 	k,
				// 	v,
				// 	JSON.stringify(state[k]),
				// 	typeof state[k]
				// )
				localStorage.setItem(k, v.toString())
			})
		},
	},
	actions: {
		increment(context) {
			context.commit('increment')
		},
		save(context, args) {
			// console.log('save(context,args)', context, args)
			context.commit('save', args)
		},
	},
})

export default store
