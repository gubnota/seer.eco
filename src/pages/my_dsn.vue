<template>
	<Modal />
	<SetNameModal />
	<OperateModal />
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
						<tr v-for="(el, i) in els" :key="el.no" class="item">
							<td>NO.{{ el.no.toString().padStart(3, '0') }}</td>
							<td>
								<div v-if="el.homeserver == ''" class="fl">
									<div class="btn" @click="setName(i)">Set</div>
								</div>
								{{ el.homeserver }}
							</td>
							<td>{{ numberWithCommas(el.total_users) }}</td>
							<td>
								{{
									el.memory_rss ? formatNumber(el.memory_rss * 100) + '%' : '--'
								}}
							</td>
							<td>{{ formatNumber(el.daily_income_seer) }} Seer</td>
							<td>{{ formatNumber(el.daily_income_usdt) }} Usdt</td>
							<td>
								<Threedots
									:class="{
										active: el.homeserver !== '',
										disabled: el.homeserver == '',
									}"
									@click="operateModal(i)"
								/>
							</td>
							<td>
								<On v-if="el.show" @click="exhibit(i)" class="disabled" />
								<Off v-else @click="exhibit(i)" />
							</td>
						</tr>
					</table>

					<MyDsnPagination
						:total="totalNumber"
						:selected="1"
						:per-page="this.perPage"
					/>
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
import SetNameModal from '../components/dsn/SetNameModal.vue'
import OperateModal from '../components/dsn/OperateModal.vue'
import { formatNumber, numberWithCommas } from '../common/helper'

// import dsn_data_sample from '../common/dsn_data_sample.js'
const dsn_data_sample = [
	{
		no: 1,
		homeserver: 'MUltiFaycet NFT',
		total_users: 1000,
		memory_rss: 0.0999,
		daily_income_seer: 200,
		daily_income_usdt: 30,
		show: true,
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
// let els = Array.from(Array(891), (el, i) => {
// 	return { ...dsn_data_sample[0], ...{ no: i + 1, homeserver: random() } }
// })

export default {
	data() {
		return { fields, perPage: 8 }
	},
	computed: {
		totalNumber() {
			if (!this.$store.state.MyDSNs) return 0 //els.length
			return this.$store.state.MyDSNs.total
		},

		els() {
			if (typeof this.$store.state.MyDSNs == 'undefined') return []
			return this.$store.state.MyDSNs.list //this.formTable()

			if (!this.$store.state.MyDSNs)
				return []

					.filter((el) => el.homeserver.includes('')) //input.value.toLowerCase()
					.slice(0, 8)
		},
	},
	mounted() {
		if (!this.$store.state.seerToken) {
			this.router.push('/dsn')
		}
		this.web3.MyDSNs(1, 8)
	},
	methods: {
		setName(id: number) {
			this.$store.dispatch('save', {
				k: 'setNameModal',
				v: 'block',
			})
			this.$store.dispatch('save', {
				k: 'setNameModalSelected',
				v: this.els[id],
			})

			console.log('setName', this.els[id], id)
		},
		operateModal(id: number) {
			console.log(this.els[id])
			if (this.els[id].homeserver === '') return // for unset elements return empty
			this.$store.dispatch('save', {
				k: 'operateModal',
				v: 'block',
			})
			this.web3.Rewards(this.els[id].homeserver)
		},
		async exhibit(id: number) {
			if (this.els[id].show) return //can't disable, only enable another one
			console.log('exhibit', this.els[id].show)
			await this.web3.Show(this.els[id].no)
			await this.web3.MyDSNs((this.$store.state.myDSNPage || 1 - 1) * 8 + 1, 8)
			return

			// console.log('exhibit', id, els[id].show)
			// els[id].show = !els[id].show
		},
		formatNumber(n) {
			if (n === false) return '--'
			return formatNumber(n)
		},
		numberWithCommas(n) {
			if (n === false) return '--'
			return numberWithCommas(n)
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
		SetNameModal,
		OperateModal,
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
.disabled {
	cursor: not-allowed;
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
