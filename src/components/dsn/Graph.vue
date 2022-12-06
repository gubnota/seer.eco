<template>
	<div class="graph">
		<!-- <Diagram /> -->
		<img :src="diagram_j" alt="" :srcset="diagram_w" class="diagram" />
		<h2 class="rainbow">
			If you want to become a DAO member, you can click to apply if you meet the
			following three conditions
		</h2>

		<img src="/03value/cube1.svg" alt="bee1" class="bee bee1" />
		<img src="/03value/cube2.svg" alt="bee2" class="bee bee2" />
		<img src="/03value/cube3.svg" alt="bee3" class="bee bee3" />
		<img src="/03value/cube4.svg" alt="bee4" class="bee bee4" />
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
@keyframes buzybuzz {
	0% {
		transform: rotate(0deg); /*360*/
	}
	100% {
		transform: rotate(360deg); /*0 */
	}
}
.graph {
	margin: 206px 0 0 0;
	display: flex;
	flex-direction: column;
	gap: 150px;
	align-items: center;
	position: relative;
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
	width: 784px;
	max-width: calc(100% - 2rem);
	mix-blend-mode: darken;
	align-self: center;
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
	top: 196px;
	right: 58px;
	width: 50px;
}
.bee1 {
	bottom: 216px;
	right: 0px;
	animation-delay: 400ms;
}
.bee2 {
	top: -59px;
	left: 200px;
	animation-delay: 800ms;
}
.bee3 {
	top: 15px;
	left: 0px;
	animation-delay: 1200ms;
}
.btn svg {
	fill: #1f2226;
}

.btn:hover svg,
.btn:active svg {
	fill: #ffffff !important;
}
.btn.cta::after {
	background-image: none;
}

@media (max-width: 1130px) {
	.bee {
		display: none;
	}
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
