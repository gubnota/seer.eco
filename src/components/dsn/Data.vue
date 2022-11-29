<template>
	<section class="data">
		<div class="row">
			<h3>My DSN data</h3>
			<div class="btn" @click="handler">
				<arrow class="arrow" />
				<span>View details</span>
			</div>
		</div>
		<div class="cols">
			<div class="col">
				<key>USERS</key
				><val class="rainbow">{{ numberWithCommas(total_users) }}</val>
			</div>
			<div class="col">
				<key>Memory load</key
				><val class="rainbow">{{
					memory_rss ? Math.ceil(memory_rss * 100) + '%' : '--'
				}}</val>
			</div>
			<div class="col">
				<key>24h AOE SEER</key
				><val class="rainbow">{{ formatNumber(daily_income_seer) }}</val>
			</div>
			<div class="col">
				<key>24h ADS USDT</key
				><val class="rainbow">{{ formatNumber(daily_income_usdt) }}</val>
			</div>
		</div>
	</section>
</template>
<script lang="ts">
import { numberWithCommas, formatNumber } from '../../common/helper'
import arrow from '/src/assets/dsn/arrow-right.svg'
import { defineComponent } from 'vue'
export default defineComponent({
	components: { arrow },
	computed: {
		m() {
			return this.$store.state.MyDSNData
		},
		memory_rss() {
			if (this.m) return this.m.memory_rss
			return false
		},
		total_users() {
			if (this.m) return this.m.total_users
			return false
		},
		daily_income_seer() {
			if (this.m) return this.m.daily_income_seer
			return false
		},
		daily_income_usdt() {
			if (this.m) return this.m.daily_income_usdt
			return false
		},
	},
	methods: {
		formatNumber(n) {
			if (n === false) return '--'
			return formatNumber(n)
		},
		numberWithCommas(n) {
			if (n === false) return '--'
			return numberWithCommas(n)
		},
		handler() {
			if (!this.$store.state.seerToken) {
				return this.comingSoon({
					text: 'Please log in to your wallet account first',
					timeout: 3000,
				})
			}
			// this.comingSoon({ text: 'not implemented' })
			this.router.push('/my_dsn')
		},
	},
})
</script>
<style scoped>
section.data {
	width: 100%;
	min-height: 265px;
	background: #1f2226;
	border-radius: 12px;
	padding: 36px;
	color: white;
}
.row {
	align-items: center;
	justify-content: space-between;
}
h3 {
	font-weight: 600;
	font-size: 32px;
}
svg {
	stroke: white;
}
.btn {
	gap: 13.5px;
	display: flex;
	flex-direction: row;
	padding: 12px 24px;
	gap: 10px;
	border: 1px solid #dfe1e2;
	border-radius: 10px;
	align-items: center;
}
.btn span {
	font-weight: 600;
	font-size: 15px;
}
.cols {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	align-self: center;
	margin: 58px 96px 0 96px;
}

.col::before {
	display: block;
	content: ' ';
	background: #3a4048;
	width: 1px;
	height: 100px;
	position: absolute;
	left: 0;
}
.col {
	display: flex;
	flex-direction: column;
	gap: 12px;
	align-items: center;
	justify-content: center;
	text-align: center;
}
key {
	font-weight: 600;
	font-size: 24px;
}
val {
	font-weight: 600;
	font-size: 24px;
}
@media (max-width: 1130px) {
	section.data {
		width: calc(100% - 4rem);
		align-self: center;
		min-height: auto;
		height: auto;
	}
	.col {
		width: 100%;
	}
	.row,
	.cols {
		flex-direction: column;
		gap: 30px;
	}
	.cols {
		margin: 58px 0 0 0;
	}
}
</style>
