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
					Math.min(100, Math.round((this.dsn[no].total_users / 100000) * 100))
				)}%;`"
			></div>
		</div>
		<div class="skill memory_bar">
			<div
				class="skill-bar"
				:style="`width:${Math.round(this.dsn[no].memory_rss * 100)}%;`"
			></div>
		</div>
		<span class="daily_aoe_seer rainbow">{{
			formatNumber(this.dsn[no].daily_income_seer)
		}}</span>
		<span class="daily_ads_seer rainbow">{{
			formatNumber(this.dsn[no].daily_income_usdt)
		}}</span>
		<span class="user_number"
			><span class="total_users" ref="total_users">{{
				numberWithCommas(this.dsn[no].total_users)
			}}</span>
			<span> / 100,000</span></span
		>
		<span class="no"
			>NO. {{ this.dsn[no].no.toString().padStart(5, '0') }}</span
		>
		<span class="name">{{ this.dsn[no].homeserver }}</span>
		<span class="memory_label">{{
			Math.round(this.dsn[no].memory_rss * 100) + '%'
		}}</span>
	</div>
</template>
<script lang="ts">
import Nft_card from '/src/assets/dsn/nft-card.svg'
import store from '../../store'
import { formatNumber, numberWithCommas } from '../../common/helper'
import { defineComponent } from 'vue'
import 'odometer/themes/odometer-theme-minimal.css' // for count up animation
import Odometer from 'odometer'
window.Odometer = Odometer

declare const window: any
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
			if (!store.state.dsnListTop) return new Array(1).fill(sampleDsn) //3
			return store.state.dsnListTop
		},
		count() {
			return !store.state.dsnListTop ? 1 : store.state.dsnListTop.length
		},
	},
	mounted() {
		var z = document.querySelectorAll('.skill-bar')
		if (!z) return
		var a = z[0]
		if (!a) return
		var b = a.style.width
		a.style.width = '0%'
		setTimeout(() => {
			a.style.width = b
		}, 1000)
		var c = document.querySelectorAll('.skill-bar')[1]
		var d = c.style.width
		c.style.width = '0%'
		setTimeout(() => {
			c.style.width = d
		}, 1000)
		// this.countUp.goal = this.dsn[this.no].total_users
		document.querySelector('.total_users').innerHTML = '0'
		setTimeout(() => {
			let od = new Odometer({
				el: document.querySelector('.total_users'),
				// value: 0,
				// Any option (other than auto and selector) can be passed in here
				format: '(,ddd)',
				theme: 'minimal',
			})
			od.update(this.dsn[this.no].total_users)
			console.log(
				'this.dsn[this.no].total_users',
				this.dsn[this.no].total_users
			)
		}, 100)
		// this.dsn[this.no].total_users
		// setTimeout(() => {
		// this.shown = 'false'
		// setTimeout(() => {
		// 	this.callCountUp()
		// }, this.countUp.interval)

		// this.$refs.total_users.innerText =
		// 	setTimeout(() => {
		// 		cb
		// 	}, window.countUpS.interval)
		// }, 1000)
	},
	methods: {
		callCountUp() {
			this.countUp = countUp(this.countUp)
			if (this.countUp.no < this.countUp.total / this.countUp.interval) {
				setTimeout(() => {
					if (this.$refs.total_users) {
						this.$refs.total_users.innerText = numberWithCommas(
							this.countUp.shown
						)
						this.callCountUp()
					}
				}, this.countUp.interval)
			}
		},
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
			// shown: false,
			// countUp: { no: 0, total: 4000, shown: 0, goal: 0, interval: 10 },
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
	/* border: 1px solid #555766; */
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
	right: 0px; /*220px;*/
	top: 244px;
	color: #e3e5e8;
	font-weight: 600;
	text-emphasis: justify;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 132px; /*104px;*/
}
.user_number span:last-child {
	position: absolute;
	right: 16px;
}
.memory_label {
	right: 40px;
	top: 303px;
	color: #e3e5e8;
	font-weight: 600;
}
.no {
	right: 16px;
	top: 212px;
	font-weight: 400;
	font-size: 13px;
	color: #626174;
	text-shadow: 0px 1px 2px #1c1b30;
	text-align: right;
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
	transition: all 1s ease-in-out;
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
