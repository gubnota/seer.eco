<template>
	<section class="header">
		<part>
			<h1>SEER-DSN</h1>
			<text class="rainbow"
				>Configure a yield machine for your WEB3 traffic</text
			>
		</part>
		<ill>
			<img :src="nft_cube_j" :srcset="nft_cube_w" class="nft_c" />
		</ill>
	</section>
</template>
<script lang="ts">
import nft_cube_j from '/src/assets/dsn/nft_cube_white@2x.jpg'
import nft_cube_w from '/src/assets/dsn/nft_cube_white@2x.webp'

export default {
	data() {
		return {
			nft_cube_j,
			nft_cube_w,
		}
	},
}
</script>
<style scoped>
section.header {
	color: #1f2226;
	margin-top: 39px;
	display: flex;
	flex-direction: row;
	gap: 67px;
	align-items: center;
	/* background-color: aquamarine; */
}
h1 {
	font-weight: 600;
	font-size: 64px;
	text-align: left;
}
text {
	font-weight: 600;
	font-size: 25px;
	line-height: 123%;
	font-family: 'Poppins';
	text-transform: capitalize;
}
part,
ill {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
part {
	flex: 607;
	align-items: flex-start;
	/* background-color: firebrick; */
}
ill {
	height: 400px;
	/* background-color: firebrick; */
	flex: 446;
}
ill img {
	max-width: 100vw;
}
.nft_c {
	width: 446px;
	mix-blend-mode: darken;
}
@media (max-width: 1130px) {
	section.header {
		flex-direction: column;
		width: calc(100% - 2rem);
		align-self: center;
	}
}
</style>
