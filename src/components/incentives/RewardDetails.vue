<template>
	<section class="rewardDetails">
		<main class="info">
			<header class="black">
				<span>Time To Earn</span>
				<span>Event</span>
				<span>Amount</span>
			</header>
			<div class="item" v-for="(el, i) in elements">
				<div class="date">{{ el.date }}</div>
				<div class="datum">
					<div class="line">
						<div class="k">Punch rewards</div>
						<div class="v">{{ el.dailyReward }}</div>
					</div>
					<div class="line">
						<div class="k">Review reward</div>
						<div class="v">{{ el.voteSumReward }}</div>
					</div>
					<div class="line">
						<div class="k">Divide the prize pool</div>
						<div class="v">{{ el.poolReward }}</div>
					</div>
				</div>
			</div>
		</main>
		<aside class="info">
			<div class="p1">Account</div>
			<div class="p2">
				<div class="l">
					<span class="key">Extractable: </span
					><span class="val">{{ unGot }} SEER</span>
				</div>
				<div class="l">
					<span class="key">Extracted: </span
					><span class="val">{{ got }} SEER</span>
				</div>
			</div>
			<div class="p3">
				Note: DAO reward settlement date: settlement on the 1st of this month
				and last month
			</div>
			<div class="p4">
				<img :src="money" alt="money" />
				<div class="btn" @click="claim"><wallet /> <span>Claim</span></div>
			</div>
		</aside>
	</section>
</template>
<script lang="ts">
import money from '/src/assets/reviewer/money.png'
import wallet from '/src/assets/reviewer/wallet.svg'
import { defineComponent } from 'vue'
export default defineComponent({
	data() {
		return { money }
	},
	mounted() {
		this.fetch()
		this.web3.onLogin = () => {
			setTimeout(() => {
				if (this.$store.state.daoInfo && this.$store.state.daoInfo.isDao) {
					this.web3.rewardInfo()
					this.web3.rewardDetail()
				}
			}, 1000)
		}
	},
	beforeUnmount() {
		console.log('beforeUnmount')
		this.web3.onLogin = null
	},
	computed: {
		elements() {
			if (this.$store.state.rewardDetail)
				return this.$store.state.rewardDetail.list.reverse()
			return []
		},
		got() {
			if (this.$store.state.rewardDetail)
				return this.$store.state.rewardDetail.got
			return 0
		},
		unGot() {
			if (this.$store.state.rewardDetail)
				return this.$store.state.rewardDetail.unGot
			return 0
		},
	},
	methods: {
		fetch() {
			;(async () => {
				if (this.$store.state.daoInfo && this.$store.state.daoInfo.isDao) {
					let a = await this.web3.rewardDetail()
				}
			})()
		},
		claim() {
			this.web3.claimReward()
			setTimeout(() => {
				this.fetch()
			}, 1000)
		},
	},
	components: { wallet },
})
</script>
<style scoped>
section.rewardDetails {
	display: flex;
	flex-direction: row;
	gap: 60px;
	color: #1f2226;
	/* background: #000000; */
}
main.info {
	flex: 774;
	width: 100%;
	/* 659px */
}
.item {
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #ebedef;
}
.item:last-child {
	border-bottom: none;
}
.date {
	/*185*/
	flex: 185;
}
.datum {
	/*475*/
	flex: 475;
	display: flex;
	flex-direction: column;
}
.line {
	min-height: 68px;
	align-items: center;
	padding: 0 24px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	border-bottom: 1px solid #ebedef;
}
.line:last-child {
	border-bottom: none;
}
.item:nth-child(2n + 1) {
	/* background-color: #f0f0f0; */
}
.item .line .v {
	font-weight: 600;
	font-size: 15px;
	line-height: 123%;
	text-align: right;
	color: #17bb7f;
}
aside.info {
	width: 100%;
	/* 253px */
	flex: 353;
	/* background-color: #f0f0f0; */
	width: 353px;
	height: 346px;
	align-items: flex-start; /* hor */
	justify-content: flex-start; /*vert*/
	display: flex;
	flex-direction: column;
	gap: 24px 6px;
	padding: 26px;
	border-bottom: 1px solid #ebedef;
}
aside.info > * {
	width: 100%;
}
.p1 {
	font-weight: 600;
	font-size: 18px;
	line-height: 123%;
}
.p2 {
	gap: 16px;
	flex-direction: column;
	display: flex;
	font-weight: 600;
	font-size: 15px;
	line-height: 123%;
	color: #1f2226;
}
.p2 > *:first-child .val {
	color: #17bb7f;
}
.p2 > *:last-child {
	color: #6c747f;
}
.p3 {
	font-weight: 400;
	font-size: 13px;
	line-height: 123%;
}
.p4 {
	flex-direction: row;
	display: flex;
	justify-content: space-between;
}
.p4 img {
	margin-left: 24px;
	object-fit: contain;
	max-width: 120px;
}
.btn {
	background: #17bb7f;
	border-radius: 8px;
	color: white;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 8px 11px;
	align-items: center;
	font-weight: 400;
	align-self: flex-end;
	gap: 11.5px;
}
header.black {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 24px;
	justify-content: space-between;
	width: 100%;
	height: 66px;

	background: #000000;
	border-radius: 8px;

	/* Inside auto layout */

	flex: none;
	order: 0;
	align-self: stretch;
	flex-grow: 0;
}
header.black > * {
	font-weight: 600;
	font-size: 13px;
	line-height: 123%;
	text-align: center;
	color: #ffffff;
}
@media (max-width: 1120px) {
	section.rewardDetails {
		flex-direction: column;
	}
	aside.info {
		width: 100%;
		padding: 0;
	}
	.p4 img {
		margin-left: 0;
	}
}
</style>
