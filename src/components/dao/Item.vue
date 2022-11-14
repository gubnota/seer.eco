<template>
	<div class="item" ref="item" @click="show(true)">
		<!--		@mouseenter="show(true)"
		@mouseleave="show(false)"
 -->
		<section class="left">
			<span class="imgpic">
				<img :src="`${spaceLogo != '' ? spaceLogo : this.userpicSample}`" />
			</span>
			<div class="main">
				<span class="desc" :class="{ cjk: detectCJK(ui(topic)) }">{{
					ui(topic, 200)
				}}</span>
				<span class="row">
					<span class="user">{{ spaceName }}</span>
					<span class="type">{{ classify }}</span>
					<div class="token">
						<Aoe v-if="showType == 'AOE'" /><Ads v-if="showType == 'ADS'" />
					</div>
				</span>
			</div>
		</section>
		<section class="right">
			<span class="remaining" v-if="this.$store.state.eventsTab == 0">{{
				remaining
			}}</span>
			<ItemActions v-if="this.$store.state.eventsTab == 0" :id="showId" />
			<ItemRate :id="showId" />
		</section>
	</div>
</template>
<script lang="ts">
import Ads from './Ads.vue'
import Aoe from './Aoe.vue'
import ItemActions from './ItemActions.vue'
import ItemRate from './ItemRate.vue'
import userpicSample from '/src/assets/dao/defaultUserPic@2x.png'
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
		showId: Number,
		eventId: String,
		classify: String,
		topic: String,
		voteResult: Number,
		setupTime: String,
		voteRate: Number,
		spaceLogo: String,
		spaceName: String,
		showType: String,
		daoEndTime: String,
	},
	mounted() {
		this.calcTime()
		setInterval(this.calcTime, 1000)
	},
	methods: {
		detectCJK(input: string) {
			var rx =
				/[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/ //CJK
			return input.match(rx)
		},
		ui(k: string, maxLength?: number) {
			let o = k
			if ((o as string).length > maxLength) {
				o = (o as string).substring(0, maxLength - 2) + `…`
			}
			return o || ''
		},

		show(trigger: boolean) {
			if (trigger) {
				if (this.$store.state.detailDeactivating != 0) {
					clearTimeout(this.$store.state.detailDeactivating)
					this.$store.state.detailDeactivating = 0
				}
				let el = this.$refs['item']
				let top =
					window.scrollY + el.getBoundingClientRect().top + el.offsetHeight + 6 // Y
				let left =
					window.visualViewport.width < 540
						? 6
						: window.scrollX + el.getBoundingClientRect().left // X this.$store.state.detail.left
				// console.log({ top })
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
				this.web3.eventDetail({ eventId: this.eventId })
				this.$store.dispatch('save', {
					k: 'detail',
					v: {
						top,
						left,
						eventId: this.eventId,
						// 		id: this.id,
						// 		userpic: this.userpic,
						// 		detail: this.detail,
						// 		desc: this.desc,
						// 		username: this.username,
						// 		location: this.location,
						// 		interested: this.interested,
						// 		creator: this.creator,
						// 		time: this.time,
						// 		token: this.token,
						// 		type: this.type,
						// 		group: this.group,
						// 		status: this.status,
						// 		rate: this.rate,
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
			var date2 = new Date(this.daoEndTime) //new Date(this.time)
			var offset = new Date().getTimezoneOffset() * 60000 // -480 minutes for UTC time from date2 compare to UTC+8
			var diff = new Date(date2.getTime() - date1.getTime() - offset)

			var years = diff.getUTCFullYear() - 1970 // Gives difference as year
			var months = diff.getUTCMonth() // Gives month count of difference
			var days = diff.getUTCDate() - 1 // Gives day count of difference
			var hours = diff.getUTCHours().toString().padStart(2, '0') // Gives hour count of difference
			var minutes = diff.getUTCMinutes().toString().padStart(2, '0') // Gives mins count of difference
			var seconds = diff.getUTCSeconds().toString().padStart(2, '0') // Gives secs count of difference

			this.remaining = `${hours}:${minutes}:${seconds}` //("remaining time = " + years + " years, " + months + " months, " + days + " days.");
			if (this.remaining == 'NaN:NaN:NaN') this.remaining = '00:00:00'
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
	align-content: space-between;
	overflow: hidden;
	height: 80px;
	width: 100%;
	justify-content: center;
}
section.left {
	display: flex;
	flex-direction: row;
	gap: 24px;
}
section.right {
	display: flex;
	flex-direction: row;
	gap: 24px;
	align-items: center;
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
.imgpic img {
	width: 100%;
	height: 100%;
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
	white-space: nowrap;
}
.desc.cjk {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	height: 26px;
	-webkit-box-orient: vertical;
	white-space: initial;
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
	max-width: 58px;
	overflow: hidden;
	text-overflow: ellipsis;
	max-height: 2rem;
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
@media (max-width: 818px) {
	section.right {
		/* justify-content: space-between; */
	}
	.item {
		flex-direction: column;
		height: auto;
		/* display: grid;
		grid-template-areas:
			'imgpic main main'
			'remaining actions rate';  */
		/* 'remaining actions rate'*/
		/* grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr; */
	}
	.imgpic {
		grid-area: imgpic;
	}
	.main {
		grid-area: main;
		min-width: auto;
	}
	.remaining {
		grid-area: remaining;
	}
	.actions {
		grid-area: actions;
		align-self: flex-start;
	}
	.rate {
		grid-area: rate;
	}
	.desc {
		max-width: initial;
	}
	.item {
		gap: 1rem;
	}
	section.left,
	section.right {
		/* flex-direction: column; */
		max-width: 100%;
		width: 100%;
		justify-content: flex-end;
	}
	.desc {
		white-space: initial;
		word-break: break-word;
	}
	.row {
		/* justify-content: space-between; */
		padding: 1rem;
	}
}
@media (max-width: 540px) {
	.item {
		margin-bottom: 1rem;
		position: relative;
		padding: 24px 0;
	}
	section.right {
		flex-direction: column;
	}
	.actions {
		align-self: flex-end;
		width: 100%;
	}
	.rate {
		width: 100%;
	}
	/* .item{
	grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		grid-template-areas:
			'main main'
			'imgpic remaining actions rate';
} */
}
</style>
