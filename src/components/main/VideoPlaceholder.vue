<template>
	<div class="videoPlaceholder">
		<video
			autoplay
			muted
			loop
			id="bgvid"
			playsinline
			:class="(isMobile ? 'mobile' : '') + ' video'"
			poster="/asset/bg.webp"
			:style="'height:' + (this.$store.state.statsOffsetTop || 880) + 'px'"
		>
			<source :src="video" />
		</video>
		<div class="videoPlaceholder_overlay"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import store from '../../store'

export default defineComponent({
	name: 'VideoPlaceHolder',
	data() {
		return {
			top: store.state.statsOffsetTop || 1000,
			width: window.innerWidth,
			video: '/asset/bg.mp4',
			isMobile: window.innerWidth > 1000 ? false : true,
			// uniswap: uniswap,
		}
	},
	created() {
		window.addEventListener('resize', this.myEvtHandler)
	},
	unmounted() {
		window.removeEventListener('resize', this.myEvtHandler)
	},
	// setup(e: Event) {},
	methods: {
		myEvtHandler(e: Event) {
			this.width = window.innerWidth
			this.switch_bg_videos(e)
			// console.log('VideoBgResize', window.innerWidth)
		},
		switch_bg_videos(e: Event) {
			this.isMobile = this.width > 1000 ? false : true
			// if (document.querySelector('.stats') === null) return
			// const a = document.querySelector('video#bgvid')
			// const b = document.querySelector('.stats').offsetTop
			// const c = document.querySelector('video#bgvid')
			// const d = document.createElement('source')
			// window.innerWidth > 1000
			// 	? d.setAttribute('src', '/asset/bg.mp4')
			// 	: d.setAttribute('src', '/asset/mobile.mp4')
			// c.style.height = `${b}px`
			// a.appendChild(d)
		},
	},
})
</script>

<style scoped>
.videoPlaceholder {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	height: 100vh;
	overflow-x: hidden;
}
video {
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	z-index: 1;
	position: absolute;
	/* height: min(100vh, 100vw); */
	object-fit: cover;
	overflow-x: hidden;
}

.video {
	height: 1000px;
	margin-left: auto;
}
.mobile {
	height: auto;
	/* width: 283%;
	transform: translateX(19%); */
	width: 346%;
	transform: translateX(27.4%);
}
.videoPlaceholder_overlay {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	height: 100vh;
	/* background: aquamarine; */
	z-index: 1;
}
</style>
