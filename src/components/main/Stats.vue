<template>
	<div class="stats" ref="stats">
		<div class="rows">
			<div class="row row1">
				<h3>Seer ID Users</h3>
				<p>0</p>
			</div>
			<div class="row row2">
				<h3>Ecosystem Partners</h3>
				<p>0</p>
			</div>
			<div class="row row3">
				<h3>ADS Number</h3>
				<p>0</p>
			</div>
			<div class="row row4">
				<h3>ADS-Aggregate Amount</h3>
				<p>$ 0.0</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import store from '../../store'

export default {
	name: 'Stats',
	mounted() {
		window.addEventListener('resize', this.myEvtHandler)
		window.addEventListener('load', this.myEvtHandler)
	},
	unmounted() {
		window.removeEventListener('resize', this.myEvtHandler)
		window.removeEventListener('load', this.myEvtHandler)
	},
	// setup(e: Event) {},
	methods: {
		myEvtHandler(e: Event) {
			// console.log('myEvtHandler', this.$refs.stats.offsetTop)
			store.dispatch('save', {
				k: 'statsOffsetTop',
				v: this.$refs.stats.offsetTop,
			})
		},
	},
}
</script>

<style></style>
