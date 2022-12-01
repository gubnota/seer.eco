<template>
	<section class="nft">
		<h2>SEER Space</h2>
		<div class="collections">
			<span :class="{ active: activeTab == 0 }" @click="changeTab(0)"
				>Recommend</span
			>
			<span :class="{ active: activeTab == 1 }" @click="changeTab(1)"
				>Hottest</span
			>
			<span :class="{ active: activeTab == 2 }" @click="changeTab(2)"
				>Newest</span
			>
		</div>

		<div ref="swipe_field" class="zone">
			<Slider>
				<div
					class="slide"
					v-for="(el, j) in $data.slides"
					:class="{
						current: current == j,
						prev: current == j + 1,
						next: current == j - 1,
						last: j == $data.slides.length - 1,
						first: j == 0,
					}"
				>
					{{ j }}
				</div>
			</Slider>
		</div>

		<a @click="this.comingSoon" class="cta">Explore More Space</a>
	</section>
</template>
<script lang="ts">
import Slider from './Slider.vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Nft',
	data() {
		return {
			activeTab: 0,
		}
	},
	mounted() {},
	components: {
		Slider,
	},
	methods: {
		changeTab(id) {
			this.activeTab = id
		},
	},
})
</script>

<style scoped>
section.nft {
	max-width: 100vw;
	display: flex;
	flex-direction: column;
	margin: 0 0 42px 0;
	max-width: 1920px;
	max-width: calc(100vw - 202px);
	overflow-x: hidden;
}
@media (max-width: 1718px) {
	section.nft {
		max-width: calc(100vw - 4rem);
	}
}
@media (max-width: 550px) {
	section.nft {
		max-width: 100vw;
	}
}
div.zone {
	/* overflow-x: hidden; */
	/* width: 1920px;
	max-width: 1920px; */
}
h2 {
	font-size: 32px !important;
	line-height: 123%;
	color: #000000;
	text-align: left;
	margin-left: 12px;
	font-weight: 600;
}
.collections {
	gap: 49px;
	flex: 1;
	display: flex;
	flex-direction: row;
	align-self: flex-end;
	align-items: stretch;
	align-items: center;
	margin-bottom: 33px;
}
.collections span {
	cursor: pointer;
	flex: 1;
	font-weight: 600;
	font-size: 15px;
	line-height: 123%;
	color: #000000;
}
.collections span:active {
	transform: scale(0.95);
}
.collections span.active {
	color: #aa1fff;
	line-height: 150%;
	border-bottom: 4px solid #aa1fff;
}
.cta {
	cursor: pointer;
	margin: 73px 0 70px 0;
	flex: 1;
	align-self: center;
	display: flex;
	flex-direction: row;
	gap: 13px;
	justify-content: center;
	align-items: center;
	padding: 24px 26px;
	text-align: center;
	border-radius: 10px;
	width: 241px;
	height: 66px;
	font-size: 15px;
	border: 1.5px solid #b4b4b4;
	text-decoration: none;
	color: black;
}
.cta::after {
	background-image: none;
}
.cta:active {
	transform: scale(0.95);
}
@media (max-width: 1120px) {
	h2 {
		margin-left: 20px;
	}
}
@media (max-width: 800px) {
	.cta {
		margin: 40px 0 70px 0;
	}
}

@media (max-width: 550px) {
	h2 {
		margin: 0;
		width: calc(100vw - 4rem);
		align-self: center;
	}
	.collections {
		margin: 0;
		padding: 1rem 0 1rem 0;
		gap: 15px;
		align-self: center;
		width: calc(100vw - 4rem);
	}
	.collections span {
		flex-grow: 0;
	}
}
</style>
