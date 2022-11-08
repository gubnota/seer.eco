<template>
	<section class="review">
		<!-- <Detail :left="this.left" :top="this.top" /> -->
		<Detail v-if="this.$store.state.detail" />
		<h3>
			<span>Review updates</span>
			<Mark />
		</h3>
		<h4>
			<span>Your voting rights：</span>
			<span>{{ getTicketsNumber() }}</span>
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
				v-for="(el, i) in fetch()"
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
			/>
		</div>

		<ItemsPagination />
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

export default {
	data() {
		return {
			shownMark: false,
			// fetched: [], //fetchedCardsSample,
			tab: 0, //selected tab
			top: 1200,
			left: 400,
			totalNo: 1,
		}
	},
	mounted() {
		this.$store.dispatch('save', { k: 'totalNo', v: 190 })
		this.$store.dispatch('save', { k: 'eventsTab', v: 0 })
	},
	methods: {
		fetch() {
			return this.$store.state.eventList.list || []
		},
		getTicketsNumber() {
			return this.$store.state.ticketsNumber || 0
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
			console.log('tab', tab)
			this.$store.dispatch('save', { k: 'eventsTab', v: tab })
			this.tab = tab
			this.web3.eventList({ tab, from: 0, limit: 8 })
		},
	},

	components: { Item, Mark, Ticket, Detail, ItemsPagination },
}
</script>
<style scoped>
section.review {
	display: flex;
	flex-direction: column;
	margin: 61px 0 0 0;
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
}
.ticket svg {
	width: 20px;
	height: 21px;
}
</style>
