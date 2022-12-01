<template>
	<section class="database">
		<h2>Database(1000) parameter has been determined</h2>
		<div class="row bar">
			<div class="search">
				<magnifier />
				<input
					type="search"
					name="search"
					id="search"
					v-model="input"
					placeholder="Search"
					autocomplete="off"
					@input="searchHandler"
				/>
			</div>
			<!-- </form> -->
		</div>
		<table>
			<tr class="head" :ref="'head'">
				<th
					v-for="(el2, j) in Object.values(fields)"
					:class="{
						desc: j == this.sortColumn && !this.asc,
						asc: j == this.sortColumn && this.asc,
						nosort: j == 0 || j == 1,
					}"
					@click="sortClick(j)"
				>
					<span>{{ el2 }}</span>
				</th>
			</tr>
			<tr v-for="(el, i) in fetch" :key="el.no" class="item" :ref="'item' + i">
				<td>{{ el.no }}</td>
				<td>{{ el.server }}</td>
				<td>{{ el.users }}</td>
				<td>{{ el.memory }}</td>
				<td>{{ el.cpu_load }}</td>
				<td>{{ el.create }}</td>
				<td>{{ el.active }}</td>
				<td>
					<span class="r r2">
						<seer /><span>{{ el.income_seer }}</span></span
					>
				</td>
				<td>
					<span class="r"
						><usdt /><span>{{ el.income_usdt }}</span></span
					>
				</td>
			</tr>
		</table>
		<div class="row bar2">
			<DatabasePagination
				:total="totalNumber"
				:selected="1"
				:per-page="this.perPage"
			/>
		</div>
	</section>
</template>
<script lang="ts">
import magnifier from '/src/assets/dsn/magnifier.svg'
import seer from '/src/assets/dsn/seer.svg'
import usdt from '/src/assets/dsn/usdt.svg'
// import arrow from '/src/assets/ui/arrow.svg'
// import spin from '/src/assets/ui/spin.svg'
import dsn_data_sample from '../../common/dsn_data_sample.js'
import DatabasePagination from './DatabasePagination.vue'
import store from '../../store'
import { scroll } from '../../common/helper'
const arrow = `
<svg width="6px" height="4px" viewBox="0 0 6 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>arrowhead</title>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="arrowhead" transform="translate(3.000000, 2.000000) rotate(-270.000000) translate(-3.000000, -2.000000) translate(1.000000, -1.000000)" fill="#000000" fill-rule="nonzero">
            <polygon id="Path" points="4 3 0 0 0 6"></polygon>
        </g>
    </g>
</svg>
`
declare const window: any
const fields = {
	no: '#',
	homeserver: 'homeserver',
	total_users: 'total_Users',
	memory_rss: 'memory_Rss',
	cpu_average: 'cpu_Average',
	daily_user_type_native: 'create/24h',
	monthly_active_users: 'active/24h/30day',
	monthly_income_seer: 'Seer/24h/30day', //income_
	monthly_income_usdt: 'Usdt/24h/30day', //income_
}

const random = () => {
	let id = Math.floor(Math.random() * 10)
	let arr = [
		'MUltiFaycet NFT',
		'GoldStandard NFT',
		'FleePay NFT',
		'OliverRandel NFT',
		'Foldaway NFT',
		'NerdyBirdy NFT',
		'Rarable NFT',
		'TreeTrunkProduction NFT',
		'CordialSuccess NFT',
		'PoppyLotty NFT',
	]
	return arr[id]
}
let samples = Array.from(Array(891), (el, i) => {
	return { ...dsn_data_sample[0], ...{ no: i + 1, server: random() } }
})
import { ref } from 'vue'
import { formatNumber } from '../../common/helper'
import { setInterval } from 'timers/promises'
import { timeStamp } from 'console'
import { defineComponent } from 'vue'
let input = ref('')

export default defineComponent({
	data() {
		return {
			input,
			samples,
			fields,
			perPage: 9, //9,
			sync: [],
			sortColumn: 7,
			asc: false,
		}
	},
	computed: {
		totalNumber() {
			if (!store.state.dsnList) return samples.length
			return store.state.dsnList.total
		},
		fetch() {
			if (typeof store.state.dsnList == 'undefined')
				return samples
					.filter((el) => el.server.includes(input.value.toLowerCase()))
					.splice((this.selectedPage - 1) * this.perPage, this.perPage)
			return this.formTable(store.state.dsnList.list)

			//.splice((this.selectedPage - 1) * this.perPage,this.perPage)
		},
		selectedPage() {
			return this.$store.state.databasePage || 1
		},
	},
	mounted() {
		setTimeout(() => {
			scroll()
			this.sortTable()
		}, 200)
	},
	methods: {
		sortFieldState(el: string) {
			if (el == 'income_Seer/24h/30day') return this.sortState
			return 0
		},
		sortClick(i: number) {
			if (i < 2) return
			if (i == this.sortColumn) {
				this.asc = !this.asc
			} else {
				this.asc = false
				this.sortColumn = i
			}
			this.sortTable()
			// if (i == 8) {
			// 	this.sortState = this.sortState == 1 ? 2 : 1 // 1,2 3,4  'income_Seer/24h/30day'
			// }
			// if (i == 9) {
			// 	this.sortState = this.sortState == 3 ? 4 : 3 // 5,6 7,8  'income_Usdt/24h/30day'
			// }
			// if (i == 3) {
			// 	this.sortState = this.sortState == 3 ? 4 : 3 // 9,10  'income_Usdt/24h/30day'
			// }
		},
		sortTable() {
			let col = Object.keys(this.fields)[this.sortColumn]
			let asc = this.asc
			let table = this.$store.state.dsnList.list
			table.sort((a, b) => {
				return asc ? (b[col] > a[col] ? -1 : 1) : b[col] > a[col] ? 1 : -1 //desc numeric
			})

			this.$store.dispatch('save', {
				list: table,
				total: this.$store.state.dsnList.total,
			})
		},
		formTable(
			input: [
				{
					cpu_average: number
					daily_active_users: number
					daily_income_seer: number
					daily_income_usdt: number
					daily_user_type_native: number // create/24h
					homeserver: string
					memory_rss: number
					monthly_active_users: number
					monthly_income_seer: number
					monthly_income_usdt: number
					no: number
					total_users: number
				}
			]
		) {
			var out = []

			for (let i = 0; i < input.length; i++) {
				const el = input[i]
				let obj = {
					no: el.no,
					server: el.homeserver,
					users: el.total_users,
					memory: Math.round(el.memory_rss * 100) + '%',
					cpu_load: el.cpu_average,
					create: el.daily_user_type_native,
					active: el.daily_active_users + ' / ' + el.monthly_active_users,
					income_seer:
						formatNumber(el.daily_income_seer, 2) +
						'  /  ' +
						formatNumber(el.monthly_income_seer, 2),
					income_usdt:
						formatNumber(el.daily_income_usdt, 2) +
						'  /  ' +
						formatNumber(el.monthly_income_usdt, 2),
				}
				out.push(obj)
			}
			// here sort out values
			// out.filter()
			let page = this.$store.state.databasePage || 1
			return out.splice((page - 1) * this.perPage, this.perPage)
		},
		searchHandler(inp) {
			let i = this.input
			if (i != '') {
				this.$store.dispatch('save', { k: 'databasePage', v: 0 })
			}
			this.web3.DSNList(
				(this.$store.state.databasePage || 0) * this.perPage,
				this.perPage,
				i
			)
			console.log('scroll()')
			setTimeout(() => {
				scroll()
			}, 200)
		},
	},
	components: {
		magnifier,
		usdt,
		seer,
		DatabasePagination,
	},
})
</script>
<style scoped>
section.database {
	width: 1314px;
	max-width: calc(100vw - 16px);
	margin: 102px 0 0 0;
	color: #1f2226;
	display: flex;
	flex-direction: column;
	align-self: center;
}
h2 {
}
th > span {
	position: relative;
}
th > span::after,
th > span::before {
	background: url(/src/assets/ui/arrow_unselected.svg) 100% no-repeat;
	display: block;
	background-size: contain;
	width: 10px;
	height: 10px;
	position: absolute;
	right: -16px;
	top: 9px;
	content: '';
}
th.desc > span::after {
	background: url(/src/assets/ui/arrow.svg) 100% no-repeat;
	background-size: contain;
}
th.asc > span::before {
	background: url(/src/assets/ui/arrow.svg) 100% no-repeat;
	background-size: contain;
}
th.nosort > span::after,
th.nosort > span::before {
	display: none;
}
th > span::before {
	transform: rotate(180deg);
	top: -1px;
}
.bar {
	justify-content: flex-end;
	margin: 66px 0 38px 0;
}
.bar2 {
	justify-content: flex-end;
	margin: 32px 0 0 0;
}
table {
	width: 100%;
	font-size: 15px;
	text-align: center;
	font-weight: 500;
	/* border: none; */
}
.table td,
.table th {
	padding: 0.75rem;
	vertical-align: top;
}
tr {
	height: 44px;
	line-height: 44px;
	/* box-shadow: inset 0 -1px #cdd0d4; */
	position: relative;
}
tr {
	/* border-bottom: 1px solid #cdd0d4; */
}
th {
	cursor: pointer;
}
th *::selection {
	background-color: transparent;
}
tr.item {
	height: 88px;
	line-height: 88px;
	align-items: center;
}
tr.item td {
	height: 60px;
	line-height: 60px;
	border-bottom: 1px solid #cdd0d4;
}
.r2 {
	font-weight: 800 !important;
}
th {
	color: #71757a;
}
.search {
	border-radius: 24px;
	position: relative;
	min-width: 298px;
	display: flex;
	flex-direction: row;
	/* border: 1px solid #ddd; */
}
.search svg {
	position: absolute;
	left: 20px;
	top: 11px;
}
input[type='search'] {
	border: none;
	border-radius: 24px;
	padding: 0px;
	text-align: right;
	line-height: 36px;
	font-size: 15px;
	width: 298px;
	padding: 0 1rem;
	box-sizing: border-box;
}
input[type='search']::-webkit-search-decoration {
	display: none;
}

input[type='search']::after {
}
line,
heading {
	flex-direction: row;
	display: flex;
	font-size: 15px;
	text-align: center;
	gap: 30px;
}
heading {
	color: #71757a;
	text-transform: capitalize;
}
.b {
	font-weight: 600;
}
.r {
	display: flex;
	flex-direction: row;
	gap: 14px;
	align-items: center;
	/* height: 87px; */
	justify-content: center;
	font-weight: 500;
}

th:nth-child(1),
td:nth-child(1) {
	min-width: 36px;
	text-align: left;
}
th:nth-child(2),
td:nth-child(2) {
	text-align: left;
	font-weight: 600;
}

@media (max-width: 1131px) {
	section.database {
		width: 100%;
	}
}

@media (max-width: 1130px) {
	.bar {
		justify-content: flex-end;
		margin: 30px 0 18px 0;
	}
	input[type='search'] {
		width: 208px;
	}
	.search {
		min-width: 208px;
	}

	section.database {
		width: calc(100% - 2rem);
		align-self: center;
	}
	table {
		overflow-x: scroll;
	}
	tr.head,
	tr {
		width: 100%;
		display: flex;
		/* flex-direction: column; */
		justify-content: space-between;
	}
	tr.head {
		font-weight: bold;
	}
	tr.head {
		background-color: #f8f7fc;
	}
	th,
	td {
		/* padding: 0 1rem; */
		min-width: 200px;
	}
	th:nth-child(1),
	td:nth-child(1) {
		min-width: 60px;
	}
	th:nth-child(3),
	td:nth-child(3),
	th:nth-child(4),
	td:nth-child(4),
	th:nth-child(5),
	td:nth-child(5),
	th:nth-child(6),
	td:nth-child(6) {
		min-width: 120px;
	}
	th:last-child,
	td:last-child {
		min-width: 240px;
	}
	tr.head,
	tr.item {
		/* overflow-x: scroll; */
	}
	tr > td {
		text-align: center;
	}
	.r svg {
		overflow: visible;
	}

	table {
		display: flex;
		flex-direction: column;
	}
	tr.item,
	tr {
		line-height: normal;
		height: initial;
	}
	thead tr {
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
	}
}

/* Handle */
section.database *::-webkit-scrollbar-thumb {
	width: 4px;
	height: 4px;
	background: #000;
}
/* Track */
section.database *::-webkit-scrollbar-track {
	background: white;
}
</style>
