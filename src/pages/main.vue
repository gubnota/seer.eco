<template>
	<Modal />
	<VideoPlaceHolder />
	<Nav />
	<Wrapper />
	<Stats />
	<section class="wrapper2">
		<Value />
		<Create />
	</section>
	<section class="arrow_down"></section>
	<Factory />
	<Nft />
	<Contact />
	<Footer />
</template>

<script lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import store from '../store'
// import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoPlaceHolder from '../components/main/VideoPlaceholder.vue'
import Nav from '../components/common/Nav.vue'
import Wrapper from '../components/main/Wrapper.vue'
import Stats from '../components/main/Stats.vue'
import Footer from '../components/common/Footer.vue'
import Modal from '../components/common/Modal.vue'
import MobileNav from '../components/MobileNav.vue'
import Value from '../components/main/Value.vue'
import Create from '../components/main/Create.vue'
import Factory from '../components/main/Factory.vue'
import Nft from '../components/main/Nft.vue'
import Contact from '../components/main/Contact.vue'
import { defineComponent } from 'vue'
// import { fileURLToPath, URL } from 'url'
// import uniswap from '../assets/uniswap.jpg'
// gsap.registerPlugin([ScrollTrigger])
export default defineComponent({
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
		VideoPlaceHolder,
		Nav,
		Wrapper,
		Stats,
		Footer,
		Modal,
		MobileNav,
		Value,
		Create,
		Factory,
		Nft,
		Contact,
	},
})
</script>

<style>
section.arrow_down {
	min-height: 200px;
}
</style>
