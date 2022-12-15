<template>
	<SetNameModal />
	<OperateModal />
	<div class="content">
		<Modal />
		<nav class="tophead">
			<div><Top :isDsn="true" /></div>
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
								<Off
									v-else
									@click="exhibit(i)"
									:class="{ disabled: el.homeserver === '' }"
								/>
							</td>
						</tr>
					</table>
					<div class="row" v-if="this.els.length === 0">
						<div class="empty">
							<img :src="EmptyPic" style="margin-top: 100px" />
							<p style="margin-bottom: 100px">No Data to show</p>
						</div>
					</div>
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
import EmptyPic from '/src/assets/dao/seer_noitems@2x.png'
import SetNameModal from '../components/dsn/SetNameModal.vue'
import OperateModal from '../components/dsn/OperateModal.vue'
import { formatNumber, numberWithCommas } from '../common/helper'
import { defineComponent } from 'vue'
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

export default defineComponent({
	data() {
		return { fields, perPage: 8, onProcess: false, EmptyPic }
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
		this.$store.dispatch('save', { k: 'myDSNPage', v: 1 })
		if (!this.$store.state.seerToken) {
			// this.web3.chooseConnect()
			// this.popup({ text: 'Please connect to your wallet account first' })
			this.router.push('/dsn')
		} else if (this.$store.state.notAppUser) {
			this.popup({ text: 'UserNotFound' })
		} else {
			this.web3.MyDSNs(1, 8)
		}
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

			// console.log('setName', this.els[id], id)
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
			if (this.els[id].homeserver === '') return
			if (this.onProcess) return // on process prev request
			this.onProcess = true
			setTimeout(() => {
				this.onProcess = false
			}, 1000)
			await this.web3.Show(this.els[id].no)
			await this.web3.MyDSNs((this.$store.state.myDSNPage - 1) * 8 + 1, 8)
			// return
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
})
</script>
<style scoped>
.empty p {
	font-size: 15px;
	line-height: 22px;
	text-align: center;
	color: #9eadbe;
}
.empty {
	gap: 17px;
	flex-direction: column;
	align-items: center;
	display: flex;
}
.empty img {
	height: 120px;
	width: 89px;
}
.row {
	justify-content: center;
}
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
	font-weight: 600;
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
}
td {
	align-items: center;
}
td,
th {
	border-bottom: 1px solid #ebedef;
	/* text-align: left; */
	text-align: center;
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
	text-align: center;
}
td:nth-child(2),
th:nth-child(2) {
	text-align: center;
	width: 160px;
}
.fl {
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
	h1 {
		margin: 40px 0 0 10px;
	}
	th {
		font-weight: bold;
	}
	tr.head,
	tr {
		width: 100%;
		display: flex;
		/* flex-direction: column; */
		justify-content: space-between;
	}
	table {
		display: flex;
		flex-direction: column;
		overflow-x: scroll;
		overflow-y: hidden;
	}
	tr.item,
	tr {
		line-height: 50px;
		height: initial;
		align-items: center;
		height: 50px;
	}
	thead tr {
		/* flex-direction: column; */
		gap: 1rem;
		align-items: flex-start;
	}
	td,
	th {
		min-width: 120px;
		height: 50px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	td:nth-child(1),
	th:nth-child(1) {
		text-align: left;
	}
	td:nth-child(2),
	th:nth-child(2) {
		min-width: 180px;
		text-align: center;
	}
	td:nth-child(3),
	th:nth-child(3) {
		text-align: center;
	}
	td:nth-child(7),
	th:nth-child(7),
	td:last-child,
	th:last-child {
		text-align: center;
		min-width: 90px;
	}
	box {
		padding: 1rem 1rem;
	}

	/* tr.item,
	tr.head {
		display: grid;
		grid-template-columns: 1.7fr 0.3fr;
		grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
		gap: 0px 0px;
		grid-template-areas:
			'no operate'
			'name operate'
			'users operate'
			'memory exhibit'
			'aoe exhibit'
			'ads exhibit';
		padding: 1rem 0;
	}
	tr.head {
		padding: 1rem 0;
		position: sticky;
		top: 0;
		z-index: 1;
		background-color: white;
	}
	tr > td:nth-child(1),
	tr > th:nth-child(1) {
		grid-area: no;
	}
	tr > td:nth-child(2),
	tr > th:nth-child(2) {
		grid-area: name;
	}
	tr > td:nth-child(3),
	tr > th:nth-child(3) {
		grid-area: users;
	}
	tr > td:nth-child(4),
	tr > th:nth-child(4) {
		grid-area: memory;
	}
	tr > td:nth-child(5),
	tr > th:nth-child(5) {
		grid-area: aoe;
	}
	tr > td:nth-child(6),
	tr > th:nth-child(6) {
		grid-area: ads;
	}
	tr > td:nth-child(7),
	tr > th:nth-child(7) {
		grid-area: operate;
		align-self: center;
	}
	tr > td:nth-child(8),
	tr > th:nth-child(8) {
		grid-area: exhibit;
		align-self: center;
	} */
}
</style>
