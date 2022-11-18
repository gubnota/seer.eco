<template>
	<Modal />
	<div class="content">
		<Modal />
		<nav class="tophead">
			<div><Top /></div>
		</nav>
		<main class="dsndata">
			<section class="main">
				<h1><Fourdots /><span>My DSN Data</span></h1>
				<box>
					<table>
						<tr class="head">
							<th v-for="el in fields">{{ el }}</th>
						</tr>
						<tr v-for="el in fetch" :key="el.no" class="item">
							<td>NO.00{{ el.no }}</td>
							<td>
								<div v-if="el.server == ''" class="fl">
									<div class="btn">Set</div>
								</div>
								{{ el.server }}
							</td>
							<td>{{ el.users }}</td>
							<td>{{ el.memory }}</td>
							<td>{{ el.h_aoe }}</td>
							<td>{{ el.h_ads }}</td>
							<td><Threedots :class="{ active: el.server !== '' }" /></td>
							<td>
								<On v-if="el.server !== ''" />
								<Off v-else />
							</td>
						</tr>
					</table>

					<MyDsnPagination :total="samples.length / 9" :selected="1" />
				</box>
			</section>
		</main>
		<!-- <Footer /> -->
	</div>
</template>
<script lang="ts">
import Modal from '../components/common/Modal.vue'
import Footer from '../components/common/Footer.vue'
import Top from '../components/dao/Top.vue'
import More from '/src/assets/dsn/more.svg'
import Fourdots from '/src/assets/dsn/4dots.svg'
import MyDsnPagination from '/src/components/dsn/MyDsnPagination.vue'
import Threedots from '/src/assets/dsn/threedots.svg'
import Off from '/src/assets/dsn/off.svg'
import On from '/src/assets/dsn/on.svg'
// import dsn_data_sample from '../common/dsn_data_sample.js'
const dsn_data_sample = [
	{
		no: 1,
		server: 'MUltiFaycet NFT',
		users: '1,000',
		memory: '9.99%',
		h_aoe: '200 Seer',
		h_ads: '30 Usdt',
		active: true,
	},
]
const fields = [
	'DSN No.',
	'Node Name',
	'Users',
	'Memory',
	'24h/AOE',
	'24h/ADS',
	'Operate',
	'Exhibit',
]
const random = () => {
	let id = Math.floor(Math.random() * 10)
	let arr = [
		'majon123.eco',
		'another.com',
		'freedom.true',
		'gold.me',
		'istock.com',
		'',
		'rubbid.com',
		'pumpkin.com',
		'success.eco',
		'',
	]
	return arr[id]
}
let samples = Array.from(Array(891), (el, i) => {
	return { ...dsn_data_sample[0], ...{ no: i + 1, server: random() } }
})

export default {
	data() {
		return { samples, fields }
	},
	computed: {
		fetch() {
			return samples
				.filter((el) => el.server.includes('')) //input.value.toLowerCase()
				.slice(0, 9)
		},
	},

	components: {
		Top,
		Footer,
		Modal,
		Fourdots,
		More,
		MyDsnPagination,
		Threedots,
		Off,
		On,
	},
}
</script>
<style scoped>
main.dsndata {
	color: #1f2226;
	background: #f8f7fd;
	width: 100%;
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
	min-height: calc(100vh - 64px);
	font-size: 15px;
}
section.main,
nav.tophead > div {
	flex: 1;
	width: 100%;
	max-width: 1130px;
	/* background-color: aqua; */
	display: flex;
	flex-direction: column;
	/* overflow: hidden; */
	position: relative;
	overflow-x: visible;
	align-self: center;
	/* min-height: 200vh; */
}

h1 {
	margin: 60px 0 0 0;
	font-weight: 600;
	font-size: 28px;
	display: flex;
	flex-direction: row;
	gap: 12px;
	align-items: center;
}
nav.tophead {
	min-height: 64px;
	width: 100%;
	background-color: white;
	display: flex;
	flex-direction: column;
}

div.content {
	width: 100%;
	/* display: flex; */
	/* flex-direction: column;
	flex: 1; */
	/* align-items: center; */
	/* gap: 24px; */
}
box {
	background: #ffffff;
	border-radius: 8px;
	max-width: 1120px;
	width: 100%;
	align-self: center;
	display: flex;
	flex-direction: column;
	min-height: 200px;
	margin: 32px 0 35px 0;
	padding: 36px 46px;
}

table {
	width: 100%;
	font-size: 15px;
	text-align: center;
	margin-bottom: 17px;
	/* border: none; */
}
.table td,
.table th {
	padding: 0.75rem;
	vertical-align: top;
}
.fl {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
tr {
	height: 40px;
	line-height: 40px;
	/* box-shadow: inset 0 -1px #cdd0d4; */
	position: relative;
}
tr {
	border-bottom: 1px solid #ebedef;
}

tr.item {
	height: 92px;
	line-height: 92px;
}

th {
	color: #71757a;
}
.btn {
	width: 56px;
	height: 26px;
	line-height: 26px;
	background: #17bb7f;
	border-radius: 4px;
	color: white;
}
svg {
	cursor: pointer;
	fill: #dfe1e2;
}
svg.active:active {
	transform: translateY(5px);
}
svg.active {
	fill: #17bb7f;
}
@media (max-width: 1130px) {
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
