<template>
	<div class="card">
		<div class="skill user_bar">
			<div
				class="skill-bar"
				:style="`width:${Math.ceil(
					(this.dsn[no].total_users / 10000) * 100
				)}%;`"
			></div>
		</div>
		<div class="skill memory_bar">
			<div
				class="skill-bar"
				:style="`width:${Math.ceil(this.dsn[no].memory_rss * 100)}%;`"
			></div>
		</div>
		<span class="daily_aoe_seer rainbow">{{
			formatNumber(this.dsn[no].daily_income_seer)
		}}</span>
		<span class="daily_ads_seer rainbow">{{
			formatNumber(this.dsn[no].daily_income_usdt)
		}}</span>
		<span class="user_number"
			>{{ numberWithCommas(this.dsn[no].total_users) }} / 100,000</span
		>
		<span class="no"
			>NO. {{ this.dsn[no].no.toString().padStart(8, '0') }}</span
		>
		<span class="name">{{ this.dsn[no].homeserver }}</span>
	</div>
</template>
<script lang="ts">
import Nft_card from '/src/assets/dsn/nft_card.svg'
import store from '../../store'
import { formatNumber, numberWithCommas } from '../../common/helper'

const sampleDsn = {
	cpu_average: 0,
	daily_active_users: 0,
	daily_income_seer: 0,
	daily_income_usdt: 0,
	daily_user_type_native: 0,
	homeserver: 'genesis.seer.eco',
	memory_rss: 0,
	monthly_active_users: 0,
	monthly_income_seer: 0,
	monthly_income_usdt: 0,
	no: 0,
	total_users: 0,
}

export default {
	props: { no: Number },
	computed: {
		dsn() {
			if (!store.state.dsnListTop) return new Array(3).fill(sampleDsn)
			return store.state.dsnListTop
		},
	},
	methods: {
		numberWithCommas(n) {
			return numberWithCommas(n)
		},
		formatNumber(n) {
			return formatNumber(n)
		},
	},
	data() {
		return {
			user_percent: 0.6,
			memory_percent: 0.4,
		}
	},
	components: { Nft_card },
}
</script>
<style scoped>
.card {
	background: #282737;
	border: 1px solid #555766;
	border-radius: 16px;
	width: 344px;
	height: 441px;
	position: relative;
	font-weight: 600;
	font-size: 13px;
}
.card > * {
	position: absolute;
}
.skill {
	background-color: #000000;
	width: 294px;
	border-radius: 4px;
	position: absolute;
	left: 25px;
	height: 8px;
	top: 271px;
}
.memory_bar {
	top: 331px;
}
.daily_aoe_seer,
.daily_ads_seer {
	top: 402px;
}
.daily_aoe_seer {
	left: 69px;
}
.daily_ads_seer {
	left: 241px;
}
.user_number {
	left: 220px;
	top: 244px;
	color: #e3e5e8;
	font-weight: 600;
}
.no {
	left: 249px;
	top: 212px;
	font-weight: 400;
	font-size: 13px;
	color: #626174;
	text-shadow: 0px 1px 2px #1c1b30;
}
.name {
	left: 14px;
	top: 179px;
	font-weight: 800;
	font-size: 17px;
	color: #ffffff;
}
.skill:before {
	width: 100%;
	content: '';
	display: block;
	position: absolute;
	background: #000000;
	border-radius: 4px;
	bottom: 0;
}

.skill-bar {
	height: 10px;
	background: linear-gradient(-90deg, #aa1fff, #2ba1ff);
	display: block;
	position: relative;
	width: 0;
	height: 8px;
	border-radius: 4px;
}

.skill-bar span {
	position: absolute;
	top: -30px;
	padding: 0;
	font-size: 18px;
	padding: 3px 0;
	font-weight: 500;
}
</style>
