<template>
	<div class="graph">
		<!-- <Diagram /> -->
		<img :src="diagram_j" alt="" :srcset="diagram_w" class="diagram" />
		<h2 class="rainbow">
			If you want to become a DAO member, you can click to apply if you meet the
			following three conditions
		</h2>
	</div>
</template>
<script lang="ts">
import Diagram from '/src/assets/dsn/diagram.svg'
import diagram_j from '/src/assets/dsn/diagram.jpg'
import diagram_w from '/src/assets/dsn/diagram.webp'
import { defineComponent } from 'vue'

export default defineComponent({
	data() {
		return {
			diagram_j,
			diagram_w,
		}
	},
	components: { Diagram },
})
</script>
<style scoped>
.graph {
	margin: 206px 0 0 0;
	display: flex;
	flex-direction: column;
	gap: 150px;
	align-items: center;
}
h2 {
	font-weight: 600;
	font-size: 24px;
	text-align: center;
	width: 742px;
	line-height: 123%;
}
.diagram {
	object-fit: contain;
	width: 984px;
	max-width: calc(100% - 2rem);
	mix-blend-mode: darken;
	align-self: center;
}
@media (max-width: 1130px) {
	h2 {
		width: calc(100% - 2rem);
		font-size: 20px;
	}
	.graph {
		margin: 130px 0 0 0;
		gap: 130px;
	}
}
</style>
