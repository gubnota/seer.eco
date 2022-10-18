<template>
	<div ref="swipe_field" class="test"></div>
</template>
<script>
import Nft from '../components/main/Nft.vue'
import { ref } from 'vue'

export default {
	name: 'Test',
	data() {
		return {
			count: 0,
			touchendX: 0,
			touchstartX: 0,
			touchendY: 0,
			touchstartY: 0,
		}
	},
	mounted() {
		this.$refs.swipe_field.onclick = this.handleGesture
		this.$refs.swipe_field.ontouchstart = this.ontouchstart
		this.$refs.swipe_field.ontouchmove = this.ontouchmove
		this.$refs.swipe_field.ontouchend = this.ontouchend
		this.$refs.swipe_field.onmouseup = this.onmouseup
		//console.log('mounted',
	},
	components: {
		Nft,
	},
	methods: {
		ontouchstart(evt) {
			this.count++
			console.log('ontouchstart', evt.touches[0].clientX)
			this.touchstartX = evt.touches[0].clientX
			this.touchstartY = evt.touches[0].clientY
		},
		ontouchmove(evt) {
			console.log('ontouchmove', evt.touches[0].clientX)
			this.touchendX = evt.touches[0].clientX
			this.touchendY = evt.touches[0].clientY
		},
		onmouseup(evt) {
			console.log('onmouseup', evt)
			this.touchendX = evt.clientX
			this.touchendY = evt.clientY
			this.ontouchend(evt)
		},
		handleGesture(evt) {
			this.count++
			console.log('handleGesture', evt)
			this.touchstartX = evt.clientX
			this.touchstartY = evt.clientY
		},
		ontouchend(evt) {
			if (this.touchendX < this.touchstartX) {
				console.log('Swiped Left', this.touchstartX - this.touchendX)
			}

			if (this.touchendX > this.touchstartX) {
				console.log('Swiped Right', this.touchendX - this.touchstartX)
			}

			if (this.touchendY < this.touchstartY) {
				console.log('Swiped Up', this.touchstartY - this.touchendY)
			}

			if (this.touchendY > this.touchstartY) {
				console.log('Swiped Down', this.touchendY - this.touchstartY)
			}

			if (this.touchendY === this.touchstartY) {
				console.log('Tap')
			}
		},
	},
}
</script>
<style scoped>
div.test {
	display: flex;
	width: 100vw;
	height: 400px;
	background-color: beige;
}
</style>
