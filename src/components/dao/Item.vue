<template>
	<div class="item" ref="item" @click="show(true)">
		<!--		@mouseenter="show(true)"
		@mouseleave="show(false)"
 -->
		<span class="imgpic"> <img :src="this.userpicSample" /> </span>
		<div class="main">
			<span class="desc">{{ desc }}</span>
			<span class="row">
				<span class="user">{{ username }}</span>
				<span class="type">{{ type }}</span>
				<div class="token">
					<Aoe v-if="token == 'aoe'" /><Ads v-if="token == 'ads'" />
				</div>
			</span>
		</div>
		<span class="remaining">{{ remaining }}</span>
		<ItemActions />
		<ItemRate :rate="rate" />
	</div>
</template>
<script lang="ts">
import Ads from './Ads.vue'
import Aoe from './Aoe.vue'
import ItemActions from './ItemActions.vue'
import ItemRate from './ItemRate.vue'
import userpicSample from '/src/dao/assets/userpic.jpg'
import { time } from 'console'

export default {
	data() {
		return {
			userpicSample,
			active: false,
			deactivating: 0,
			remaining: 0,
		}
	},
	props: {
		id: Number,
		userpic: String,
		detail: String,
		desc: String,
		username: String,
		location: String,
		interested: Number,
		creator: String,
		time: Number,
		token: String,
		type: String,
		group: Number, // underway: 0, have passed: 1, reject: 2
		status: Number, // waiting: 0, passed: 1, rejected: 2
		rate: Number, // passing rate
	},
	mounted() {
		this.calcTime()
		setInterval(this.calcTime, 1000)
	},
	methods: {
		show(trigger: boolean) {
			if (trigger) {
				if (this.$store.state.detailDeactivating != 0) {
					clearTimeout(this.$store.state.detailDeactivating)
					this.$store.state.detailDeactivating = 0
				}
				let el = this.$refs['item']
				let top =
					window.scrollY + el.getBoundingClientRect().top + el.offsetHeight + 6 // Y
				let left = window.scrollX + el.getBoundingClientRect().left // X this.$store.state.detail.left
				console.log({ top })
				if (
					el.getBoundingClientRect().bottom + (683 + 6) > // 683 is height of Detail el and 6 is position of this el from top
					window.visualViewport.height
				)
					top =
						top -
						(el.getBoundingClientRect().bottom +
							(683 + 6) -
							window.visualViewport.height) -
						(window.visualViewport.height - (683 + 6)) / 2

				this.active = true
				this.$store.dispatch('save', {
					k: 'detail',
					v: {
						top,
						left,
						id: this.id,
						userpic: this.userpic,
						detail: this.detail,
						desc: this.desc,
						username: this.username,
						location: this.location,
						interested: this.interested,
						creator: this.creator,
						time: this.time,
						token: this.token,
						type: this.type,
						group: this.group,
						status: this.status,
						rate: this.rate,
					},
				})
			}
			if (!trigger) {
				this.active = false
				if (this.$store.state.detailDeactivating == 0)
					this.$store.dispatch('save', {
						k: 'detailDeactivating',
						v: setTimeout(() => {
							this.$store.dispatch('save', {
								k: 'detail',
								v: false,
							})
						}, 1500),
					})
			}
		},
		calcTime() {
			var date1 = new Date()
			var date2 = new Date(this.time)
			var diff = new Date(date2.getTime() - date1.getTime())

			var years = diff.getUTCFullYear() - 1970 // Gives difference as year
			var months = diff.getUTCMonth() // Gives month count of difference
			var days = diff.getUTCDate() - 1 // Gives day count of difference
			var hours = diff.getUTCHours().toString().padStart(2, '0') // Gives hour count of difference
			var minutes = diff.getUTCMinutes().toString().padStart(2, '0') // Gives mins count of difference
			var seconds = diff.getUTCSeconds().toString().padStart(2, '0') // Gives secs count of difference

			this.remaining = `${hours}:${minutes}:${seconds}` //("remaining time = " + years + " years, " + months + " months, " + days + " days.");
		},
	},
	components: { Ads, Aoe, ItemActions, ItemRate },
}
</script>
<style scoped>
.item {
	z-index: 0;
	display: flex;
	flex-direction: row;
	padding: 8px 4px;
	gap: 24px;
	/* flex: 1; */
	/* overflow: hidden; */
	background-color: white;
	/* background-color: blue; */
	box-sizing: border-box;
	flex-flow: column wrap;
	align-content: flex-start;
	overflow: hidden;
	height: 80px;
	width: 100%;
}
.item > * {
	/* background-color: aquamarine; */
}
.imgpic {
	width: 64px;
	height: 64px;
	border-radius: 8px;
	flex: none;
	order: 0;
	flex-grow: 0;
	overflow: hidden;
}
.main {
	display: flex;
	flex-direction: column;
	flex: 1;
	flex-grow: 1;
	min-width: 428px;
}
.type {
	color: white;
	padding: 4px 16px;
	height: 21px;
	background: #1f2226;
	border-radius: 28px;
	text-transform: uppercase;
	font-weight: 600;
	font-size: 13px;
}
.desc {
	height: 30px;
	flex: none;
	max-width: 424px;
	height: 27px;
	overflow: hidden;
	text-overflow: ellipsis;
	font-weight: 600;
	font-size: 13px;
	/* white-space: nowrap; */
}
.row {
	display: flex;
	flex-direction: row;
	gap: 8px;
	/* background-color: #fafa00; */
}
.row > * {
	/* background-color: blueviolet; */
	align-self: center;
}
.user {
	font-weight: 400;
	font-size: 13px;
	line-height: 123%;
}
.item:nth-child(2n) {
	background-color: #fafafa;
}
.remaining {
	font-weight: 600;
	font-size: 13px;
	line-height: 20px;
	text-align: center;
	color: #50565f;
	width: 56px;
	padding-left: 12px;
	text-align: right;
}
</style>
