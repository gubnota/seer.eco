<template>
	<div class="dsn">
		<h2 class="rainbow">super strong</h2>
		<p>
			The world's latest blockchain technology - dynamic NFT is used as the SEER
			(DSN) social data distributed storage node equity container, and the
			server value changes are synchronized in real time on the chain to
			accurately grasp the income changes. The first to establish a solid
			pipeline income in the new world of web3.
		</p>
		<div class="row" v-if="this.$store.state.dsnListTop.length > 0">
			<Nft_card
				:no="i"
				key="i"
				v-for="(el, i) in this.$store.state.dsnListTop"
			/>
			<!-- <Nft_card :no="1" key="1" /><Nft_card
				:no="2"
				key="2"
			/> -->
		</div>
	</div>
</template>
<script lang="ts">
import Nft_card from '/src/components/dsn/NftCard.vue'
import { defineComponent } from 'vue'

export default defineComponent({
	components: { Nft_card },
})
</script>
<style scoped>
h2 {
	font-weight: 600;
	font-size: 32px;
	text-transform: capitalize;
	text-align: left;
	min-height: 36px;
	display: inline;
}
p {
	margin-block-start: 1rem;
	margin-block-end: 36px;
	font-weight: 400;
	font-size: 15px;
	line-height: 123%;
	color: #6c747f;
}

.row {
	gap: 32px;
	justify-content: center;
}
@media (max-width: 1130px) {
	h2 {
		min-height: 36px;
		margin-top: 4rem;
	}
	.row {
		flex-direction: column;
		align-items: center;
	}
	div.dsn {
		width: calc(100% - 2rem);
		align-self: center;
	}
}
</style>
