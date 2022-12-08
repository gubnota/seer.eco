<template>
	<section class="header">
		<part>
			<h1>SEER-DSN</h1>
			<text>Configure a yield machine for your WEB3 traffic</text>
			<h2>Brief Introduction</h2>
			<p>
				The world's latest blockchain technology - dynamic NFT is used as the
				SEER (DSN) social data distributed storage node equity container, and
				the server value changes are synchronized in real time on the chain to
				accurately grasp the income changes. The first to establish a solid
				pipeline income in the new world of web3.
			</p>
			<ill class="mobile">
				<!-- <NftSample /> -->
				<img :src="nft_cube_j" :srcset="nft_cube_w" class="nft_c" />
				<div class="shadow"></div>
			</ill>

			<Countdown />
		</part>
		<ill class="desktop">
			<!-- <NftSample /> -->
			<img :src="nft_cube_j" :srcset="nft_cube_w" class="nft_c" />
			<div class="shadow"></div>
		</ill>
	</section>
</template>
<script lang="ts">
import nft_cube_j from '/src/assets/dsn/nft_cube.png'
import nft_cube_w from '/src/assets/dsn/nft_cube@2x.webp'

import Countdown from './Countdown.vue'

import { defineComponent } from 'vue'

export default defineComponent({
	data() {
		return {
			nft_cube_j,
			nft_cube_w,
		}
	},

	components: { Countdown },
})
</script>
<style scoped>
svg {
	filter: drop-shadow(1px 19px 24px rgba(149, 149, 149, 0.67));
}
.mobile {
	display: none;
}
.shadow {
	position: absolute;
	width: 414px;
	height: 268.5px;
	left: 28px;
	top: 212px;
	z-index: -1;
	background: #b08aff;
	opacity: 0.5;
	filter: blur(150px);
	max-width: 80vw;
}
section.header {
	z-index: 3;
	/* min-height: 550px; */
	color: #1f2226;
	margin-top: 39px;
	display: flex;
	flex-direction: row;
	gap: 85px;
	align-items: flex-start;
	min-height: 813px;
	padding-top: 112px;
	margin-bottom: 90px;
}
h1 {
	font-weight: 600;
	font-size: 64px;
	text-align: left;
}
text {
	font-size: 25px;
	font-weight: 400;
	line-height: 123%;
	font-family: 'Poppins';
	text-transform: capitalize;
}
h2 {
	font-weight: 600;
	font-size: 18px;
	margin-block-start: 12px;
	margin-block-end: 8px;
}
p {
	font-weight: 400;
	font-size: 15px;
	line-height: 123%;
	margin-block-end: 54px;
	max-width: 606px;
}
h3 {
	font-weight: 600;
	font-size: 24px;
	line-height: 123%;
}
part,
ill {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
part {
	/* flex: 607; */
	align-items: flex-start;
	/* background-color: firebrick; */
}
ill {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	position: relative;
	max-width: 450px;
	align-self: center;
	justify-content: flex-start;
	min-height: 558px;
	/* overflow: hidden; */
	/* height: 400px; */
	/* background-color: firebrick; */
	/* flex: 446; */
}
ill img {
	max-width: 100vw;
}
.nft_c {
	width: 446px;
	/* mix-blend-mode: darken; */
	z-index: 1;
}
@media (max-width: 1130px) {
	div.main {
		gap: 30px;
	}
	.desktop {
		display: none;
	}
	.mobile {
		display: block;
		width: 100vw;
		min-height: 413px;
	}

	h1 {
		font-size: 3rem;
		line-height: 150%;
	}
	section.header {
		flex-direction: column;
		width: calc(100% - 2rem);
		align-self: center;
		margin-bottom: 0;
		gap: 30px;
		padding-top: 0;
	}
	part {
		margin-top: 10px;
		width: 100%;
	}
	p {
		max-width: initial;
	}
	svg {
		transform: scale(0.8);
	}
}
</style>
