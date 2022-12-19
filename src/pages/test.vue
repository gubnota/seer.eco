<template>
	<div class="dsn" v-if="this.$store.state.dsnListTop">
		<div class="l">
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
div.dsn {
	display: flex;
	flex-direction: row;
	gap: 165px;
}
h2 {
	font-weight: 600;
	font-size: 32px;
	text-transform: capitalize;
	text-align: left;
	min-height: 36px;
	display: inline;
}
h4 {
	text-align: center;
	margin-top: 12px;
	font-weight: 600;
	font-size: 15px;
}
p {
	margin-block-start: 1rem;
	margin-block-end: 36px;
	font-weight: 400;
	font-size: 15px;
	line-height: 123%;
	color: #1f2226;
	line-height: 150%;
}
h3 {
	font-weight: 600;
	font-size: 18px;
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
		/* margin-top: 2rem; */
		width: calc(100% - 2rem);
		align-self: center;
		flex-direction: column;
		gap: 100px;
		margin-top: 100px;
	}
	.r {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}
</style>
