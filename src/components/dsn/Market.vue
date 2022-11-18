<template>
	<section class="market">
		<heading class="rainbow">Market</heading>
		<p>
			On-line display of the world's three major open nft trading platforms.
		</p>
		<!-- <div class="col">
			<div class="row"> -->
		<blockss>
			<block
				v-for="el in $data.blocks"
				v-bind:key="el.name"
				@click="this.openLink(el.link)"
				class="btn"
			>
				<img :src="el.logo" :alt="el.name" class="logo" />
				<h3>{{ el.name }}</h3>
				<p>{{ el.text }}</p>
				<!-- <router-link :to="{ path: el.hash }">{{ el.name }}</router-link> -->
			</block>
		</blockss>

		<!-- </div> -->
		<!-- </div> -->
		<img src="/03value/cube1.svg" alt="bee1" class="bee bee1" />
		<img src="/03value/cube2.svg" alt="bee2" class="bee bee2" />
		<img src="/03value/cube3.svg" alt="bee3" class="bee bee3" />
		<img src="/03value/cube4.svg" alt="bee4" class="bee bee4" />
	</section>
</template>
<script lang="ts">
import opensealogo from '/src/assets/dsn/opensealogo.png'
import x2y2logo from '/src/assets/dsn/x2y2logo.png'
import looksrare from '/src/assets/dsn/looksrare.png'
import element from '/src/assets/dsn/element.png'
export default {
	data() {
		return {
			blocks: [
				{
					logo: opensealogo,
					name: 'Open Sea',
					text: '.web users can convert any of their accounts to Ethereum standard NFTs that can be traded on open sea',
					link: 'https://opensea.io/',
				},
				{
					logo: x2y2logo,
					name: 'X2Y2',
					text: '.web users can convert any of their accounts to Ethereum standard NFTs that can be traded on X2Y2',
					link: 'https://x2y2.io/',
				},
				{
					logo: looksrare,
					name: 'Looksrare',
					text: '.web users can convert any of their accounts to Ethereum standard NFTs that can be traded on Looksrare',
					link: 'https://looksrare.org/',
				},
				{
					logo: element,
					name: 'Element',
					text: '.web users can convert any of their accounts to Ethereum standard NFTs that can be traded on Element',
					link: 'https://element.market/',
				},
			],
		}
	},
}
</script>
<style scoped>
section.market {
	margin: 108px 0 124px;
	position: relative;
	gap: 16px;
	flex-direction: column;
	display: flex;
	/* background-color: #1f2226; */
}
heading {
	font-weight: 600;
	font-size: 32px;
	text-align: center;
	width: 122px;
	align-self: center;
}
p {
	text-align: center;
	margin-block-end: 5px;
	font-weight: 400;
	font-size: 15px;
	line-height: 123%;
	color: #6c747f;
	z-index: 1;
}
heading ~ p {
	text-shadow: 1px 1px 0 white, -1px -1px 0 white, -1px 1px 0 white,
		1px -1px 0 white;
}
.col {
	gap: 30px;
}
.row {
	gap: 30px;
}
blockss {
	margin-top: 21px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	grid-template-areas: 'col1 col2' 'col3 col4';
	gap: 60px 30px;
	max-width: 790px;
	align-self: center;
}
block {
	cursor: pointer;
	position: relative;
	color: #1f2226;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 50px 20px 20px 20px;
	gap: 16px;
	z-index: 1;
}
h3 {
	font-weight: 600;
	font-size: 18px;
}
block p {
	font-weight: 400;
	font-size: 15px;
	text-align: left;
}
/* block::before {
	display: block;
	width: 377px;
	height: 169px;
	left: 570px;
	top: 1294px;
	background: linear-gradient(
		108.98deg,
		#2693ff 8.7%,
		#d2e9ff 101.59%
	);
	border-radius: 10px;
	z-index: 0;
	transform: translateY(-10px);
	content: ' ';
	background: linear-gradient(
		108.98deg,
		rgba(38, 147, 255, 1) 8.7%,
		#d2e9ff 101.59%
	);
} */
block {
	box-shadow: 1px -1px 0 #2693ff88, 0 0 10px rgba(171, 171, 171, 0.35);
	filter: drop-shadow(0px 4px 8px rgba(171, 171, 171, 0.35));
}
block:nth-child(1) {
	grid-area: col1;
	background: linear-gradient(108.98deg, #2693ff55 8.7%, #d2e9ff55 101.59%);
}
block:nth-child(2) {
	grid-area: col2;
	background: linear-gradient(108.98deg, #406aff66 8.7%, #e3e0ef66 101.59%);
}
block:nth-child(3) {
	grid-area: col3;
	background: linear-gradient(108.98deg, #04cd5850 8.7%, #55aaff50 101.59%);
}
block:nth-child(4) {
	grid-area: col4;
	background: linear-gradient(108.98deg, #76ff0b55 8.7%, #ffffff77 101.59%);
}
block:nth-child(3) {
	box-shadow: 1px -1px 0 #2693ff55, 0 0 10px rgba(171, 171, 171, 0.35);
}
block:nth-child(4) {
	box-shadow: 1px -1px 0 #00f9a688, 0 0 10px rgba(171, 171, 171, 0.35);
}
block {
	width: 377px;
	height: 169px;
	position: relative;
	border: 1px solid #ffffff;
	border-radius: 10px;
}
.logo {
	position: absolute;
	left: 18px;
	top: -30px;
	width: 60px;
	height: 60px;
	z-index: 1;
}
@keyframes buzybuzz {
	0% {
		transform: rotate(0deg); /*360*/
	}
	100% {
		transform: rotate(360deg); /*0 */
	}
}

.bee {
	animation: buzybuzz 2.5s infinite linear;
	position: absolute;
	animation-play-state: running;
}
.bee:hover {
	animation-play-state: paused;
}
.bee4 {
	top: 276px;
	left: 58px;
	width: 50px;
}
.bee1 {
	top: 436px;
	left: 0px;
	animation-delay: 400ms;
}
.bee2 {
	top: -59px;
	right: 100px;
	animation-delay: 800ms;
}
.bee3 {
	top: 30px;
	right: -40px;
	animation-delay: 1200ms;
}
@media (max-width: 1130px) {
	blockss {
		align-self: center;
		gap: 60px;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		grid-template-areas:
			'col1'
			'col2'
			'col3'
			'col4';
	}
	block {
		width: calc(100% - 2rem);
		justify-self: center;
	}
	.bee {
		display: none;
	}
}
</style>
