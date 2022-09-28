<template>
	<main class="billboard">
		<div class="wrapper">
			<div class="card big">{{ $store.state.count }}</div>
			<div class="card small1">Two</div>
			<div class="card small2">Three</div>
			<div class="card small3">Four</div>
			<div class="card small4">Five</div>
			<div class="card small5">Six</div>
			<div class="card small6">Six</div>
			<div class="card small7">Six</div>
			<div class="card small8">{{ uniswap }}</div>
		</div>
		<div class="billboard_shadow"></div>
	</main>
</template>

<script>
import store from '../store'
export default {
	data() {
		return { uniswap: "url('/img/android.png')" }
	},
}
</script>

<style scoped>
.billboard {
	/* padding: 2rem; */
	box-sizing: border-box;
	position: relative;
	border-radius: 30px;
	width: 640px;
	height: 466px;
	background: linear-gradient(
		216deg,
		rgba(34, 129, 192, 1) 0%,
		rgba(47, 168, 234, 1) 19%,
		rgba(65, 214, 221, 1) 56%,
		rgba(65, 214, 221, 1) 100%
	);
	transform-style: preserve-3d;
	backface-visibility: hidden;
	padding: 1rem;
}
.billboard_shadow {
	position: absolute;
	left: 0;
	top: 0;
	border-radius: 30px;
	width: 640px;
	height: 466px;
	background: linear-gradient(
		0deg,
		rgba(175, 214, 218, 1) 0%,
		rgba(254, 254, 254, 1) 100%
	);
	transform-style: preserve-3d;
	backface-visibility: hidden;
	transform: translateZ(-2px) scale(1.01) translateX(-10px) translateY(10px);
}
.wrapper {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(3, 1fr);
	grid-template-areas: 'big big small1 small2' 'big big small3 small4' 'small5 small6 small7 small8';
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
}
.small1 {
}
.card {
	background: v-bind('uniswap');
	width: 70px;
	height: 70px;
	background-color: aquamarine;
	border-radius: 30px;
}

.big {
	grid-area: big;
	width: 220px;
	height: 220px;
	background-size: 100%;
}
</style>
