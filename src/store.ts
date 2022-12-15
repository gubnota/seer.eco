import { createApp } from 'vue'
import { createStore } from 'vuex'

const parseAlt = (input: any) => {
	if (input === 'true') return true
	if (input === 'false') return false
	if (typeof input == 'string' && /([a-f])/.test(input)) return input
	if (input === '[object Object]') return null
	if (input === 'null') return null
	if (
		typeof input == 'string' &&
		(input.substring(0, 1) === '{' || input.substring(0, 1) === '[') &&
		input !== '['
	)
		return JSON.parse(input)
	if (typeof input == 'string' && input.substring(0, 2) === '0x') return input
	if (typeof input == 'string' && parseInt(input) > 0) return parseInt(input)
	// if (typeof input == 'number') return input
	return input
	// return input.substr(0, 1) === 'n' ? input : parseInt(input)
}
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
						: parseAlt(state[k]) //parseInt
				// console.log(
				// 	'k,v, state[k]',
				// 	k,
				// 	v,
				// 	JSON.stringify(state[k]),
				// 	typeof state[k]
				// )
				if (v !== undefined) localStorage.setItem(k, v.toString())
			})
		},
		unset(state, arg: string | Array<string>) {
			// localStorage.removeItem(args)
			let args = typeof arg == 'string' ? [arg] : arg
			for (let i = 0; i < args.length; i++) {
				delete state[args[i]]
				localStorage.removeItem(args[i])
			}
		},
		load(state, arg: string | Array<string>) {
			let args = typeof arg == 'string' ? [arg] : arg
			for (let i = 0; i < args.length; i++) {
				let input = localStorage[args[i]]
				if (
					typeof input == 'string' &&
					(input.substring(0, 1) === '{' || input.substring(0, 1) === '[')
				)
					input = JSON.parse(input)
				if (input === 'null') input = null
				if (input === 'true') input = true
				if (input === 'false') input = false
				state[args[i]] = input
			}
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
		unset(context, arg: string | Array<string>) {
			// console.log('save(context,args)', context, args)
			context.commit('unset', arg)
		},
		load(context, arg: string | Array<string>) {
			// console.log('load', args)
			// state[args] = 'true'
			// context.commit('save', { k: args, v: 'true' })
			context.commit('load', arg)
			// Object.keys(localStorage).forEach((k) => {
			// 	// console.log({ k, v: localStorage[k] })
			// 	if (k === arg && typeof localStorage[k] !== undefined) {
			// 		context.commit('load', arg)
			// 	}
			// })
			// Object.keys(state).forEach((k) => {
		},
	},
})

export default store
