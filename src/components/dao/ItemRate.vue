<template>
	<div class="rate">
		<div class="script">Passing rate : {{ percentage.toString() }}%</div>
		<div class="bar" :style="`width: ${this.width}px`">&nbsp;</div>
	</div>
</template>
<script lang="ts">
export default {
	data() {
		return {
			percentage: 0,
			width: 0,
		}
	},
	props: {
		rate: Number, // passing rate
	},
	mounted() {
		this.percentage = Math.round(this.rate * 100)
		this.width = Math.round(209 * this.rate)
	},
}
</script>

<style scoped>
.rate {
	width: 209px;
	height: 24px;
	background: #ebedef;
	border-radius: 12px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
	overflow: hidden;
}
.script {
	color: white;
	font-size: 13px;
	text-align: center;
	z-index: 3;
	font-style: italic;
	font-weight: 700;
}
.bar {
	background: linear-gradient(-90deg, #aa1fff, #2ba1ff);
	height: 24px;
	left: 0;
	top: 0;
	position: absolute;
	z-index: 2;
	width: 0;
	border-radius: 12px;
}
</style>
