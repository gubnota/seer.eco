<template>
	<aside class="float" :class="{ waiting: shown }" v-if="shown" @click="hide">
		<checkin v-if="!this.tapped" @click="tocheckin" />
		<checkin_success v-else />
	</aside>
</template>
<script lang="ts">
import checkin from '/src/assets/reviewer/checkin.svg'
import checkin_success from '/src/assets/reviewer/checkin_success.svg'

export default {
	data() {
		return {
			tapped: false,
			shown: true,
			hidden: false,
		}
	},
	mounted() {
		// if (!this.$store.state.daoInfo || !this.$store.state.daoInfo.isDao) {
		// 	this.shown = false
		// 	return
		// }
		// if (this.$store.state.checkedin && isNaN(this.$store.state.checkedin)) {
		// 	this.tapped = false
		// }
	},
	methods: {
		isTapped() {
			if (this.tapped) return true
			// if (isNaN(this.$store.state.checkedin)) return true
			// let curTime = new Date().getTime()
			// let oldTime = parseInt(this.$store.state.checkedin)
			// console.log(curTime, oldTime, (curTime - oldTime) / 1000, this.tapped)
			// if (oldTime) {
			// 	return (curTime - oldTime) / 1000 < 3600 * 20
			// }
			// return false
			// return this.tapped
		},
		isShown() {
			let s = this.$store.state
			if (
				s.daoInfo &&
				s.daoInfo.isDao &&
				s.ticketsNumber &&
				parseInt(s.ticketsNumber) > 0
			) {
				this.shown = true
				// if (this.hidden) this.shown = false
			}
			return this.shown
		},
		hide() {},
		tocheckin() {
			// ;(async () => {
			if (this.tapped) return

			this.$store.dispatch('save', {
				k: 'checkedin',
				v: new Date().getTime(),
			})
			this.tapped = true
			this.web3.daily()
			// })()
		},
	},
	components: { checkin, checkin_success },
}
</script>
<style scoped>
aside.float {
	left: -205px;
	top: 601px;
	position: absolute;
	z-index: 10;
	cursor: pointer;
}
.waiting {
}
.waiting:active {
	transform: translateY(5px);
}
</style>
