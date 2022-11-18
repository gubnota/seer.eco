<template>
	<div class="dsn">
		<h2>super strong</h2>
		<p>
			The world's latest blockchain technology - dynamic NFT is used as the SEER
			(DSN) social data distributed storage node equity container, and the
			server value changes are synchronized in real time on the chain to
			accurately grasp the income changes. The first to establish a solid
			pipeline income in the new world of web3.
		</p>
		<div class="row"><Nft_card /><Nft_card /><Nft_card /></div>
	</div>
</template>
<script lang="ts">
import Nft_card from '/src/assets/dsn/nft_card.svg'

export default {
	components: { Nft_card },
}
</script>
<style scoped>
h2 {
	font-weight: 600;
	font-size: 32px;
	text-transform: capitalize;
	text-align: left;
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
}
@media (max-width: 1130px) {
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
