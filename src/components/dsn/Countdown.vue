<template>
	<div v-if="isNotExpired" class="main">
		<div class="col">
			<h3>START TIME 2022/12/10 12:00(UTC){{}}</h3>
			<div class="row r1">
				<div class="row r3">
					<div class="cal">
						<span class="k"><span>Days</span></span>
						<span class="v rainbow">{{ countdownObj.days }}</span>
					</div>
					<div class="sep">:</div>
					<div class="cal">
						<span class="k"><span> Hrs</span></span>
						<span class="v rainbow">{{ countdownObj.hours }}</span>
					</div>
					<div class="sep">:</div>
					<div class="cal">
						<span class="k"><span>Mins</span></span>
						<span class="v rainbow">{{ countdownObj.mins }}</span>
					</div>
				</div>
				<div class="divider">&nbsp;</div>
				<div class="r2 row">
					<div class="pair">
						<div class="k">PRICE:</div>
						<div class="v">{{ this.fromWei(s.price) }}USDT</div>
					</div>
					<div class="pair">
						<div class="k">Minted:</div>
						<div class="v">{{ s.selled }}/{{ s.total }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="btn" @click="goToPay"><Coin /><span>Mint</span></div>
	</div>
	<h3 v-else>The Event Has Ended <br />Please Stay Tuned！</h3>
</template>
<script lang="ts">
import { convertUTCString, countdownObj } from '../../common/helper'
import Coin from '/src/assets/dsn/coin.svg'

export default {
	data() {
		return {
			isNotExpired: true,
			s: { price: '0', selled: '0', stopTime: '0', total: '0' },
			diff: 0,
		}
	},
	computed: {
		countdownObj() {
			return countdownObj(this.diff)
		},
	},
	async mounted() {
		await this.web3.createPayContracts()
		this.s = await this.web3.paySellInfo()
		const x = new Date()
		this.diff =
			Math.floor(parseInt(this.s.stopTime)) - Math.floor(x.getTime() / 1000)
		if (this.diff > 0) this.isNotExpired = true
	},
	methods: {
		goToPay() {
			this.router.push('/pay')
		},
		fromWei(a: number) {
			if (this.web3.web3js) {
				return this.web3.web3js.utils.fromWei(a, 'mwei')
			} else {
				return parseInt(a) / 1000000
			}
		},
		convertUTCString() {
			convertUTCString(this.s.stopTime)
		},
	},

	components: { Coin },
}
</script>
<style scoped>
div.main {
	display: flex;
	flex-direction: column;
	gap: 60px;
}
.btn {
	padding: 20px 72px;
	gap: 10px;
	flex-direction: row;
	display: flex;
	align-items: center;
	border: 1px solid #1f2226;
	border-radius: 10px;
	align-self: flex-start;
}
.col {
	display: flex;
	gap: 20px;
	flex-direction: column;
}
.cal {
}
h3 {
	font-weight: 600;
	font-size: 18px;
}
.row {
	align-items: center;
}
.r1 {
	gap: 44px;
}
.r2 {
	gap: 38px;
}
.r3 {
	gap: 14px;
}
.sep {
	font-weight: 600;
	font-size: 24px;
	margin-top: 15px;
}
.pair {
	display: flex;
	flex-direction: column;
	gap: 12px;
	align-items: center;
}
.pair .k {
	padding: 5px 14px;
	background: #1f2226;
	border-radius: 4px;
	color: white;
	display: flex;
	flex-direction: row;
}
.pair .v {
	font-weight: 600;
	font-size: 24px;
}
.divider {
	width: 2px;
	height: 75px;
	background: #1f2226;
	content: '';
}
.cal {
	width: 58px;
	height: 84px;
	background: #ffffff;
	border: 2px solid #1f2226;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}
.cal .k {
	display: flex;
	flex-direction: row;
	padding: 2px 10px;
	gap: 10px;
	color: white;
	width: 58px;
	height: 26px;
	background: #1f2226;
	text-align: center;
}
.cal .v {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	font-size: 24px;
	height: 58px;
}
.cal .k span {
	width: 100%;
	align-self: center;
	justify-self: center;
}
.column {
}
</style>
