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

		<div ref="swipe_field" class="test">
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

		<a @click="comingSoon" class="cta">Explore More Space</a>
	</section>
	<Modal />
</template>
<script>
import Slider from '../components/main/Slider.vue'
import Modal from '../components/common/Modal.vue'
export default {
	name: 'Test',
	data() {
		return {
			activeTab: 0,
		}
	},
	mounted() {},
	components: {
		Slider,
		Modal,
	},
	methods: {
		changeTab(id) {
			this.activeTab = id
		},
	},
}
</script>
<style scoped>
section.nft {
	max-width: 100vw;
	display: flex;
	flex-direction: column;
	margin: 0 0 42px 0;
	max-width: 1920px;
}
h2 {
	font-size: 32px !important;
	line-height: 123%;
	color: #000000;
	text-align: left;
	margin-left: 70px;
	font-weight: 600;
}
.collections {
	gap: 49px;
	flex: 1;
	display: flex;
	flex-direction: row;
	align-self: flex-end;
	align-items: stretch;
	margin-right: 101px;
	align-items: flex-start;
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
.cta:active {
	transform: scale(0.95);
}
@media (max-width: 550px) {
	.collections {
		margin-right: auto;
		padding: 1rem 1rem 0 1rem;
	}
}
</style>
