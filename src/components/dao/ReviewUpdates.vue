<template>
	<section class="review">
		<!-- <Detail :left="this.left" :top="this.top" /> -->
		<Detail v-if="this.$store.state.detail" />
		<div class="row">
			<h3>
				<span>Review updates</span>
				<Mark />
			</h3>
			<div class="countdown" v-if="this.tab == 0">
				<b v-if="this.loading">Data refreshing</b>
				<span v-if="!this.loading">auto refresh after</span>
				<b v-if="!this.loading">{{ countdownFormatter(this.countdown) }}</b>
				<span :class="{ loading: this.loading }" @click="refresh()"
					>&nbsp;</span
				>
			</div>
		</div>
		<h4>
			<span>Your voting rights：</span>
			<span>{{ getTicketsNumber }}</span>
			<span class="ticket"><Ticket /></span>
		</h4>
		<nav class="tabs">
			<span
				v-for="(el, i) in ['underway', 'Have passed', 'Reject']"
				:class="{ selected: i === this.tab }"
				@click="tabfn(i)"
				>{{ el }}</span
			>
		</nav>
		<div class="list">
			<Item
				v-for="(el, i) in fetch"
				:daoEndTime="el.daoEndTime"
				:showId="el.showId"
				:eventId="el.eventId"
				:classify="el.classify"
				:topic="el.topic"
				:voteResult="el.voteResult"
				:setupTime="el.setupTime"
				:voteRate="el.voteRate"
				:spaceLogo="el.spaceLogo"
				:spaceName="el.spaceName"
				:showType="el.showType"
				:key="el.showId"
				:id="i"
			/>
			<div class="empty" v-if="fetch.length < 1">
				<img :src="EmptyPic" />
				<p>
					No Review <br />
					Please follow the latest event updates
				</p>
			</div>
		</div>

		<ItemsPagination
			v-if="fetch.length > 0"
			:total="getItemsNumber"
			:selected="getEventsPage"
			:per-page="this.perPage"
		/>
		<!-- TODO: change to dynamic -->
	</section>
</template>
<script lang="ts">
import Item from './Item.vue'
import ItemsPagination from './ItemsPagination.vue'
import fetchedCardsSample from './fetchedCardsSample'
import Mark from './Mark.vue'
import Ticket from '/src/assets/dao/ticket.svg'
import Detail from './Detail.vue'
import EmptyPic from '/src/assets/dao/seer_noitems@2x.png'
import { defineComponent } from 'vue'
import { countdownFormatter } from '../../common/helper'

export default defineComponent({
	data() {
		return {
			shownMark: false,
			// fetched: [], //fetchedCardsSample,
			tab: 0, //selected tab
			top: 1200,
			left: 400,
			totalNo: 1,
			EmptyPic,
			perPage: 8,
			countdownFormatter,
			countdown: 600,
			loading: false,
		}
	},
	computed: {
		fetch() {
			return this.$store.state.eventList ? this.$store.state.eventList.list : []
		},
		getTicketsNumber() {
			return this.$store.state.ticketsNumber || 0
		},
		getItemsNumber() {
			return this.$store.state.eventList.total || 0
		},
		getEventsPage() {
			return this.$store.state.eventsPage || 1
		},
	},

	mounted() {
		this.web3.eventList()
		this.$store.dispatch('save', { k: 'eventsTab', v: 0 })
		setInterval(() => {
			this.countdown--
			if (this.countdown == 0) this.refresh()
		}, 1000)
	},
	methods: {
		refresh() {
			if (this.loading) return
			this.loading = true
			this.tab = 0
			this.web3.eventList()
			setTimeout(() => {
				this.countdown = 600
				this.loading = false
			}, 1000)
		},
		hover(e: { target: HTMLSpanElement }) {
			let els =
				e.target.tagName == 'svg'
					? e.target.children
					: e.target.parentElement.children
			Array.from(els).forEach((el) => {
				console.log({ el })
				el.setAttribute('fill', "url('#grad2')")
			})
		},

		mark(state) {
			this.shownMark = state
		},
		tabfn(tab) {
			this.$store.dispatch('unset', ['detail', 'eventDetail', 'eventList'])
			this.$store.dispatch('save', { k: 'eventsTab', v: tab })
			this.$store.dispatch('save', { k: 'eventsPage', v: 1 })
			this.$store.dispatch('save', {
				k: 'eventList',
				v: { list: [], total: 0 },
			})

			this.tab = tab
			this.web3.eventList({ tab, from: 0, limit: this.perPage }) // TODO: disable to show no review state

			// this.web3.eventList({
			// 	tab: this.$store.state.eventsTab || 0,
			// 	from: 8 * (parseInt(this.$store.state.eventsPage) || 1 - 1) + 1,
			// 	limit: 8,
			// })
		},
	},

	components: { Item, Mark, Ticket, Detail, ItemsPagination },
})
</script>
<style scoped>
.row {
	align-items: center;
	justify-content: space-between;
}
.row *::selection {
	background-color: transparent;
}

.countdown {
	display: flex;
	flex-direction: row;
	margin-right: 12px;
	gap: 12px;
	align-items: center;
}
b {
	font-weight: 600;
	min-width: 60px;
}
.countdown > span:last-child {
	background: url(/src/assets/ui/spin.svg);
	background-size: contain;
	width: 19px;
	height: 21px;
	cursor: pointer;
}
.countdown > span:last-child:active {
	transform: translateY(3px);
}
.countdown > span.loading:last-child:active {
	transform: none;
	cursor: not-allowed;
}
.countdown > span.loading:last-child {
	animation: rotate 1s linear infinite;
}
@keyframes rotate {
	to {
		transform: rotate(360deg);
	}
}
section.review {
	transition: all 0.5s ease-in;
	display: flex;
	flex-direction: column;
	margin: 80px 0 0 0;
	background: #ffffff;
	border-radius: 8px 8px 0px 0px;
	/* height: 30vh; */
	align-items: stretch;
	justify-content: center;
	padding: 26px 24px;
	min-height: 40vh;
}
h3 {
	font-weight: 600;
	font-size: 32px;
	line-height: 123%;
	color: #1f2226;
	display: flex;
	flex-direction: row;
	gap: 16px;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	overflow: visible;
}
h4 {
	font-weight: 600;
	font-size: 15px;
	color: #1f2226;
	display: flex;
	gap: 5px;
	align-items: center;
}
h4 *:last-child {
	margin-left: 8px;
}
nav.tabs {
	align-self: flex-end;
	display: flex;
	flex-direction: row;
	width: calc(275px + 48px);
	gap: 49px;
	margin-bottom: 39px;
}
nav.tabs span {
	font-weight: 600;
	font-size: 15px;
	color: #cdd0d4;
	cursor: pointer;
}
nav.tabs span.selected {
	color: #1f2226;
}

.list {
	display: flex;
	flex-direction: column;
	transition: all 0.3s ease-in-out;
	gap: 36px;
}
.ticket svg {
	width: 20px;
	height: 21px;
}
.empty {
	gap: 17px;
	flex-direction: column;
	align-items: center;
	display: flex;
}
.empty p {
	font-size: 15px;
	line-height: 22px;
	text-align: center;
	color: #9eadbe;
}
.empty img {
	height: 120px;
	width: 89px;
}
@media (max-width: 550px) {
	.row {
		flex-direction: column;
		gap: 1rem;
		margin-block-end: 1rem;
	}
	.countdown {
		align-self: flex-start;
	}
	section.review {
		width: calc(100vw - 12px);
		align-self: center;
		padding: 6px;
	}
	nav.tabs {
		width: 100%;
		gap: 2px;
		justify-content: space-between;
		margin: 1rem 0;
	}
	nav.tabs > span {
		text-align: center;
		padding: 6px 0;
	}
	nav.tabs > span.selected {
		box-shadow: 0 5px 0 rgba(0, 0, 0, 0.1);
	}
	.list {
		gap: 0;
	}
}
</style>
