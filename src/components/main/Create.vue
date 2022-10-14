<template>
	<section class="create">
		<h4>Create your own SEER space</h4>
		<a class="cta" @click="comingSoon">
			<span>Create Now</span>
			<img src="/04create/arrow-right.svg" alt="arrow right" />
		</a>
		<Tiles />
		<h2>Don't know where your customers are?</h2>
		<h3>Come and learn more about SEER ADS protocol</h3>
	</section>
</template>

<script>
import { defineComponent } from 'vue'
import Tiles from './Tiles.vue'

export default defineComponent({
	name: 'Create',
	components: [Tiles],
	components: { Tiles },
})
</script>

<style scoped>
section.create {
	display: flex;
	flex-direction: column;
	width: 1718px;
	max-width: 100vw;
	gap: 50px;
	margin-bottom: 98px;
}
h4 {
	font-size: 32px;
	line-height: 123%;
	color: #000000;
	text-align: center;
	font-weight: 600;
}
h2 {
	font-weight: 600;
	font-size: 48px;
	line-height: 123%;
	color: #1f2226;
	text-align: center;
	margin-top: 87px;
	/* margin-bottom: 18px; */
}
h3 {
	margin-top: -10px;
	font-weight: 600;
	font-size: 28px;
	line-height: 42px;
	color: #aa1fff;
	text-align: center;
}
.cta {
	cursor: pointer;
	flex: 1;
	align-self: center;
	display: flex;
	flex-direction: row;
	gap: 13px;
	justify-content: center;
	align-items: center;
	padding: 10px 43px;
	border-radius: 10px;
	font-size: 15px;
	border: 1.5px solid #b4b4b4;
	text-decoration: none;
	color: black;
}
.cta:active {
	transform: scale(0.95);
}
/* .cta > * {
	flex: 1;
} */
.cta > img {
	width: 24px;
	height: 24px;
}
@media (max-width: 1718px) {
	section.create {
		width: 90vw;
	}
}
@media (max-width: 550px) {
	h2 {
		font-size: 33px;
		margin-top: 27px;
	}
	h3 {
		font-size: 22px;
	}
	section.create {
		gap: 24px;
		margin-bottom: 48px;
	}
}
</style>
