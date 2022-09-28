<template>
	<VideoPlaceHolder />
	<Nav />
	<BgContainer />
	<Wrapper />
	<Stats />
	<Wrapper2 />
	<Part2n5 />
	<Ch3 />
	<Ch5 />
	<Footer />
	<Modal />
	<!-- <Billboard /> -->
</template>

<script lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import store from '../store'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoPlaceHolder from '../components/main/VideoPlaceholder.vue'
import Billboard from '../components/billboard.vue'
import Nav from '../components/common/Nav.vue'
import BgContainer from '../components/main/BgContainer.vue'
import Wrapper from '../components/main/Wrapper.vue'
import Stats from '../components/main/Stats.vue'
import Wrapper2 from '../components/main/Wrapper2.vue'
import Part2n5 from '../components/main/Part2n5.vue'
import Ch3 from '../components/main/Ch3.vue'
import Ch5 from '../components/main/Ch5.vue'
import Footer from '../components/common/Footer.vue'
import Modal from '../components/common/Modal.vue'

// import { fileURLToPath, URL } from 'url'
// import uniswap from '../assets/uniswap.jpg'
gsap.registerPlugin([ScrollTrigger])
export default {
	name: 'Main',
	data() {
		return {
			width: window.innerWidth,
			// uniswap: uniswap,
		}
	},
	created() {
		window.addEventListener('resize', this.myEvtHandler)
	},
	unmounted() {
		window.removeEventListener('resize', this.myEvtHandler)
	},
	setup() {},
	methods: {
		myEvtHandler(e: Event) {
			this.width = window.innerWidth
			// console.log('myEvtHandler', window.innerWidth)
		},
	},
	components: {
		Billboard,
		VideoPlaceHolder,
		Nav,
		BgContainer,
		Wrapper,
		Stats,
		Wrapper2,
		Part2n5,
		Ch3,
		Ch5,
		Footer,
		Modal,
	},
}
</script>

<style scoped></style>
