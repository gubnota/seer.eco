<template>
	<section class="incentiveCenter">
		<div class="row spaceAround prizeRow">
			<div>
				<img src="/incentives/punch_rewards@2x.png" alt="punch rewards" />
				<h3>Punch rewards</h3>
				<span
					>Bonus of the month : <b>{{ ui.daily }}</b></span
				>
			</div>
			<div>
				<img src="/incentives/judging_rewards@2x.png" alt="judging rewards" />
				<h3>Judging Rewards</h3>
				<span
					>Cumulative days : <b>{{ ui.votes }}</b></span
				>
			</div>
			<div>
				<img
					src="/incentives/divide_the_prize_pool@2x.png"
					alt="divide_the_prize_pool"
				/>
				<h3>Divide the prize pool</h3>
				<span
					>Cumulative votes : <b>{{ ui.voteTickets }}</b></span
				>
			</div>
		</div>
		<h2>Reward rules <sup>(monthly settlement)</sup></h2>
		<section>
			<p class="cond">1. Punch reward (1 DSN = 1 SEER）</p>
			<p class="desc">
				DAO reviews users and participates in the review check-in every day.
				According to the time of check-in, DSN holdings will be rewarded
			</p>

			<p class="cond">2. Judging Rewards</p>
			<p class="desc">
				Judging participation for more than 20 days: 20 SEER<br />Judging
				participation for more than 26 days: 30 SEER
			</p>

			<p class="cond">3. Divide the prize pool</p>
			<p class="desc">
				Divide the prize pool according to the monthly ranking of the reviewers.
				The monthly prize pool is 50,000 SEER.
			</p>
		</section>
	</section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	mounted() {
		this.web3.onLogin = () => {
			setTimeout(() => {
				this.fetch()
			}, 2000)
		}
		this.fetch()
	},
	beforeUnmount() {
		this.web3.onLogin = null
	},
	computed: {
		ui() {
			let s = this.$store.state
			if (!s.rewardInfo) {
				return {
					daily: 0,
					votes: 0,
					voteTickets: 0,
				}
			}
			return {
				daily: s.rewardInfo.daily,
				votes: s.rewardInfo.votes,
				voteTickets: s.rewardInfo.voteTickets,
			}
		},
	},
	methods: {
		async fetch() {
			console.log('fetch rewardInfo')
			if (this.$store.state.daoInfo && this.$store.state.daoInfo.isDao) {
				this.web3.rewardInfo()
			}
		},
	},
})
</script>
<style scoped>
.row {
	display: flex;
	flex-direction: row;
}
.spaceAround {
	justify-content: space-around;
}
.prizeRow > div {
	min-height: 160px;
	width: 190px;
	display: flex;
	flex-direction: column;
	/* background-color: aqua; */
	gap: 16px;
	align-items: center;
}
.prizeRow > div img {
	width: 160px;
}
.prizeRow > div h3 {
	margin: 0;
	font-weight: 600;
	font-size: 15px;
}
.prizeRow > div span {
	font-weight: 400;
}
b {
	font-weight: 600;
}
h2 {
	font-weight: 600;
	font-size: 24px;
	text-align: left;
	padding: 28px 4px 0 4px;
}
.cond {
	font-weight: 400;
	font-size: 18px;
	margin: 16px 0 8px 0;
}
.desc {
	margin: 8px 0 0 0;
	font-weight: 400;
	font-size: 15px;
	line-height: 22px;
}
@media (max-width: 1120px) {
	.row {
		flex-direction: column;
		align-items: center;
	}
	.prizeRow > div {
		width: 100%;
	}
}
</style>
