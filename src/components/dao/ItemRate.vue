<template>
	<div class="rate">
		<div class="script">
			Passing rate :
			{{ Math.round(this.$store.state.eventList.list[id].voteRate * 100) }}%
		</div>
		<div
			class="bar"
			:style="`width: ${Math.round(
				this.$store.state.eventList.list[id].voteRate * 100
			)}%`"
		>
			&nbsp;
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	data() {
		return {
			percentage: 0,
			width: 0,
			rate: 0,
		}
	},
	props: {
		id: Number,
		// rate: Number, // passing rate
	},
	mounted() {
		// this.updateValues()
	},

	unmounted() {},
	computed: {
		getPercentage() {
			// var filtered = this.$store.state.eventList.list.filter((el) => {
			// 	return el.showId == this.id
			// })
			// let rate = filtered[0].voteRate
			// let percentage = Math.round(this.rate * 100)
			// return percentage
		},
	},
	methods: {
		getWidth() {
			// this.updateValues()
			return this.width
		},
		updateValues() {
			// if (this.$store.state.eventList)
			// 	var filtered = this.$store.state.eventList.list.filter((el) => {
			// 		return el.showId == this.id
			// 	})
			// this.rate = filtered[0].voteRate
			// this.percentage = Math.round(this.rate * 100)
			// this.width = Math.round(209 * this.rate)
		},
	},
})
</script>

<style scoped>
.rate {
	width: 209px;
	height: 24px;
	background: #ebedef;
	border-radius: 12px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
	overflow: hidden;
}
.script {
	color: white;
	font-size: 13px;
	text-align: center;
	z-index: 3;
	font-style: italic;
	font-weight: 700;
}
.bar {
	background: linear-gradient(-90deg, #aa1fff, #2ba1ff);
	height: 24px;
	left: 0;
	top: 0;
	position: absolute;
	z-index: 2;
	width: 0;
	border-radius: 12px;
}
</style>
