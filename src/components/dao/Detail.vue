<template>
	<div
		class="detail"
		:style="`left:${this.$store.state.detail.left}px;top:${this.$store.state.detail.top}px;background-image:url(${this.detailSample})`"
	>
		{{ $store.state.detail.desc }}
	</div>
</template>
<script lang="ts">
import Close from '/src/dao/assets/close.svg'
import Calendar from '/src/dao/assets/calendar.svg'
import TwoUsers from '/src/dao/assets/twousers.svg'
import Geo from '/src/dao/assets/geo.svg'
import detailSample from '/src/dao/assets/detail.jpg'

export default {
	data() {
		return {
			detailSample,
		}
	},
	components: {
		Close,
		Calendar,
		TwoUsers,
		Geo,
	},
}
</script>
<style scoped>
.detail {
	background-repeat: no-repeat;
	position: absolute;
	width: 300px;
	height: 400px;
	z-index: 10;
	background-color: white;
	border-radius: 1rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	padding: 3rem;
}
</style>
