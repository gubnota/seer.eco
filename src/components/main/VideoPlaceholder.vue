<template>
	<div
		class="videoPlaceholder"
		:style="
			'height:' +
			(this.$store.state.statsOffsetTop || 880) + // + this.$store.state.statsOffsetHeight
			'px'
		"
	>
		<video
			autoplay
			muted
			loop
			id="bgvid"
			playsinline
			:class="(isMobile ? 'mobile' : '') + ' video'"
			poster="/asset/bg.webp"
			:style="
				'height:' +
				(this.$store.state.statsOffsetTop || 880) + //+this.$store.state.statsOffsetHeight
				'px'
			"
		>
			<source :src="video" />
		</video>
		<div
			class="videoPlaceholder_overlay"
			:style="
				'height:' +
				(this.$store.state.statsOffsetTop +
					this.$store.state.statsOffsetHeight || 880) +
				'px'
			"
		></div>
	</div>
</template>

<script lang="ts">
/*
this.$store.state.statsOffsetTop makes video shown a little bit downwards
*/
import { defineComponent } from 'vue'
import store from '../../store'

export default defineComponent({
	name: 'VideoPlaceHolder',
	data() {
		return {
			top: store.state.statsOffsetTop || 1000,
			width: window.innerWidth,
			video: '/asset/bg.mp4',
			isMobile: window.innerWidth > 550 ? false : true,
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
		},
		switch_bg_videos(e: Event) {
			this.isMobile = this.width > 550 ? false : true
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
	height: 80vh;
	overflow: hidden;
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
	z-index: 1;
}

.video {
	height: 1000px;
	margin-left: auto;
}
.mobile {
	height: auto;
	width: 310%;
	transform: translateX(27%);
}
.videoPlaceholder_overlay {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	height: 100vh;
	background: #ffffff;
	z-index: 3;
	display: none;
}
@media (min-width: 1980px) {
	.videoPlaceholder {
		/* left: 180px; */
	}
}
</style>
