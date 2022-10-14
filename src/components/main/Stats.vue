<template>
	<div class="stats" ref="stats">
		<div class="rows">
			<div class="row row1">
				<h3>Seer ID Users</h3>
				<p>0</p>
			</div>
			<div class="row row2">
				<h3>ADS Number</h3>
				<p>0</p>
			</div>
			<div class="row row3">
				<h3>Ecosystem Partners</h3>
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
			store.dispatch('save', {
				k: 'statsOffsetHeight',
				v: this.$refs.stats.offsetHeight,
			})
		},
	},
}
</script>

<style scoped>
.stats {
	max-width: 100vw;
	margin-top: 354px; /*354px - 211px */
	background: #1f2226;
	width: 100%;
	overflow: hidden;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.stats .rows {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr;
	grid-template-areas: 'row1 row2 row3 row4';
	color: white;
	flex: 1;
	width: 1320px;
}
.stats .rows .row {
	flex: 1;
	min-height: 4.4rem;
	display: flex;
	line-height: 50px;
	padding-top: 18px;
	/* padding: 0 3.25rem 0 3.25rem; */
	flex-direction: column-reverse;
	align-items: center;
	justify-content: center;
}
.stats .rows .row h3 {
	font-size: 1rem;
	flex: 1;
}
.stats .rows .row p {
	font-size: 40px;
	flex: 1;
	text-align: center;
	font-weight: 600;
	margin-top: 8px;
}

.stats .rows .row1 {
	grid-area: row1;
}
.stats .rows .row2 {
	grid-area: row2;
}
.stats .rows .row3 {
	grid-area: row3;
}
.stats .rows .row4 {
	grid-area: row4;
}

@media (max-width: 1500px) {
	.stats .rows {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas: 'row1 row2' 'row3 row4';
	}
}
@media (max-width: 1190px) {
	.stats {
		/* position: initial; */
		margin-top: 0;
	}
	.stats .rows {
		display: flex;
		flex-direction: column;
	}
}

@media (max-width: 1023px) {
	.stats {
		margin-top: 100px;
	}
	.stats .rows .row {
		padding: 0 0 0 1rem;
	}
	.stats .rows .row p {
		text-align: left;
	}
}

@media (max-width: 820px) {
	.stats .rows .row {
		border-left: none;

		display: flex;
		flex-direction: column;
		line-height: 30px;
		height: 71px;
	}
	.stats .rows .row p {
		font-size: 2rem;
		line-height: 2.5rem;
	}
}

@media (max-width: 550px) {
	.stats .rows .row h3 {
		font-size: 0.8125rem;
	}
	.stats .rows .row p {
		font-size: 1.5rem;
		line-height: normal;
		font-weight: 600;
		margin-top: 0;
	}
}
</style>
