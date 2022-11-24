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
			<tr class="head">
				<th v-for="el in fields">{{ el }}</th>
			</tr>
			<tr v-for="el in fetch" :key="el.no" class="item">
				<td>{{ el.no }}</td>
				<td>{{ el.server }}</td>
				<td>{{ el.users }}</td>
				<td>{{ el.memory }}</td>
				<td>{{ el.cpu_load }}</td>
				<td>{{ el.create }}</td>
				<td>{{ el.active }}</td>
				<td>
					<span class="r">
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
import dsn_data_sample from '../../common/dsn_data_sample.js'
import DatabasePagination from './DatabasePagination.vue'
import store from '../../store'

const fields = [
	'#',
	'homeserver',
	'total_Users',
	'memory_Rss',
	'cpu_Average',
	'create/24h',
	'active/24h/30day',
	'income_Seer/24h/30day',
	'income_Usdt/24h/30day',
]
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
let input = ref('')

export default {
	data() {
		return {
			input,
			samples,
			fields,
			perPage: 9,
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
	methods: {
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
					memory: Math.ceil(el.memory_rss * 100) + '%',
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
			return out
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
		},
	},
	components: {
		magnifier,
		usdt,
		seer,
		DatabasePagination,
	},
}
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
	border-bottom: 1px solid #cdd0d4;
}

tr.item {
	height: 88px;
	line-height: 88px;
	align-items: center;
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
	height: 87px;
}
@media (max-width: 1131px) {
	section.database {
		width: 100%;
	}
}

@media (max-width: 1130px) {
	section.database {
		width: calc(100% - 2rem);
		align-self: center;
	}
	tr.head,
	tr {
		width: 100%;
		display: flex;
		/* flex-direction: column; */
		justify-content: space-between;
	}
	th,
	td {
		padding: 0 1rem;
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

	tr.item,
	tr.head {
		display: grid;
		grid-template-columns: 1fr repeat(2, 3fr);
		grid-template-rows: repeat(3, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		overflow-x: scroll;
	}

	tr > td:nth-child(1) {
		grid-area: 1 / 1 / 2 / 2;
	}
	tr > td:nth-child(2) {
		grid-area: 1 / 2 / 2 / 3;
	}
	tr > td:nth-child(3) {
		grid-area: 2 / 2 / 3 / 3;
	}
	tr > td:nth-child(4) {
		grid-area: 1 / 3 / 2 / 4;
	}
	tr > td:nth-child(5) {
		grid-area: 2 / 1 / 3 / 2;
	}
	tr > td:nth-child(6) {
		grid-area: 2 / 3 / 3 / 4;
	}
	tr > td:nth-child(7) {
		grid-area: 3 / 1 / 4 / 2;
	}
	tr > td:nth-child(8) {
		grid-area: 3 / 2 / 4 / 3;
	}
	tr > td:nth-child(9) {
		grid-area: 3 / 3 / 4 / 4;
	}
	.r {
		justify-content: center;
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
</style>
