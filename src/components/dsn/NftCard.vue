<template>
	<div class="card">
		<img :src="getbg(this.dsn[no])" class="bg" />
		<img :src="getlogo(this.dsn[no])" class="logo" />
		<img
			:src="getbadge(this.dsn[no])"
			class="badge"
			:class="{
				badge1: grade(this.dsn[no]) == 1,
				badge2: grade(this.dsn[no]) == 2,
				badge3: grade(this.dsn[no]) == 3,
			}"
		/>
		<img src="/dsn/nftcard.svg" v-if="1" class="card" />
		<div class="skill user_bar">
			<div
				class="skill-bar"
				:style="`width:${Math.max(
					2,
					Math.min(100, Math.ceil((this.dsn[no].total_users / 100000) * 100))
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
			>NO. {{ this.dsn[no].no.toString().padStart(5, '0') }}</span
		>
		<span class="name">{{ this.dsn[no].homeserver }}</span>
		<span class="memory_label">{{
			Math.ceil(this.dsn[no].memory_rss * 100) + '%'
		}}</span>
	</div>
</template>
<script lang="ts">
import Nft_card from '/src/assets/dsn/nft-card.svg'
import store from '../../store'
import { formatNumber, numberWithCommas } from '../../common/helper'
import { defineComponent } from 'vue'

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

export default defineComponent({
	props: { no: Number },
	computed: {
		dsn() {
			if (!store.state.dsnListTop) return new Array(3).fill(sampleDsn)
			return store.state.dsnListTop
		},
	},
	methods: {
		grade(no) {
			if (no.total_users < 10000) return 1
			if (no.total_users >= 10000 && no.total_users < 50000) return 2
			return 3
		},
		getbg(no) {
			switch (this.grade(no)) {
				case 1:
					return '/dsn/1a_bg.jpg'
					break
				case 2:
					return '/dsn/2a_bg.jpg'
					break
				default:
					return '/dsn/3a_bg.jpg'
					break
			}
		},
		getbadge(no) {
			switch (this.grade(no)) {
				case 1:
					return '/dsn/1a_badge.png'
					break
				case 2:
					return '/dsn/2a_badge.png'
					break
				default:
					return '/dsn/3a_badge.png'
					break
			}
		},
		getlogo(no) {
			switch (this.grade(no)) {
				case 1:
					return '/dsn/1a_logo.png'
					break
				case 2:
					return '/dsn/2a_logo.png'
					break
				default:
					return '/dsn/3a_logo.png'
					break
			}
		},
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
})
</script>
<style scoped>
img.card {
	z-index: 2;
}
img.bg {
	z-index: 0;
	position: absolute;
	top: 7px;
	left: 7px;
}
img.logo {
	z-index: 1;
	position: absolute;
	top: 37px;
	left: 137px;
	width: 73px;
}
img.badge {
	z-index: 3;
	position: absolute;
	top: 108px;
	left: 23px;
	width: 73px;
	width: 46px;
}
img.badge2 {
	width: 64px;
	top: 108px;
	left: 14px;
}
img.badge3 {
	width: 70px;
	top: 104px;
	left: 11px;
}
.card {
	background: transparent; /*#282737;*/
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
	z-index: 3;
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
	left: 79px;
}
.daily_ads_seer {
	left: 252px;
}
.user_number {
	left: 220px;
	top: 244px;
	color: #e3e5e8;
	font-weight: 600;
}
.memory_label {
	right: 40px;
	top: 303px;
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
<style>
svg .tf {
	color: white;
}
</style>
