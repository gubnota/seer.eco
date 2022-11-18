<template>
	<section class="database">
		<h2>Database(1000) parameter has been determined</h2>
		<div class="row bar">
			<form action="">
				<div class="search">
					<magnifier />
					<input
						type="search"
						name="search"
						id="search"
						v-model="input"
						placeholder="Search"
					/>
				</div>
			</form>
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
			<DatabasePagination :total="samples.length / 9" :selected="1" />
		</div>
	</section>
</template>
<script lang="ts">
import magnifier from '/src/assets/dsn/magnifier.svg'
import seer from '/src/assets/dsn/seer.svg'
import usdt from '/src/assets/dsn/usdt.svg'
import dsn_data_sample from '../../common/dsn_data_sample.js'
import DatabasePagination from './DatabasePagination.vue'
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
let input = ref('')

export default {
	data() {
		return {
			input,
			samples,
			fields,
		}
	},
	computed: {
		fetch() {
			return samples
				.filter((el) => el.server.includes(input.value.toLowerCase()))
				.slice(0, 9)
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
}

th {
	color: #71757a;
}
.search {
	border-radius: 24px;
	position: relative;
	/* border: 1px solid #ddd; */
}
.search svg {
	position: absolute;
	left: 20px;
	top: 13px;
}
input[type='search'] {
	border: none;
	border-radius: 24px;
	padding: 0px;
	text-align: right;
	min-width: 298px;
	line-height: 36px;
	font-size: 15px;
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
		flex-direction: column;
		justify-content: space-between;
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
