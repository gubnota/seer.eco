<template>
	<div ref="swipe_field" class="carousel">
		<div
			class="wrapper"
			:style="'transform:translate3d(' + this.delta + 'px, 0px, 0px)'"
		>
			<slide
				:id="j"
				v-for="(el, j) in $data.slides"
				:oneWidth="oneWidth"
			/><!--:class="{ first: j == 0, next: j > 0 }"-->
		</div>
		<div class="controls">
			<aside class="pagination">
				<div
					v-for="(el, i) in $data.slides"
					:class="{
						active: current == i,
					}"
					@click="this.pagination(i)"
				>
					<span></span>
				</div>
			</aside>
			<aside class="nextprev">
				<div class="prev" @click="prev()">
					<img src="/07nft/left.svg" alt="prev" />
				</div>
				<div class="next" @click="next()">
					<img src="/07nft/left.svg" alt="prev" />
				</div>
			</aside>
		</div>
	</div>
</template>
<script>
import VanillaSwipe from 'vanilla-swipe'
const isTouchEventsSupported = VanillaSwipe.isTouchEventsSupported()
import { ref } from 'vue'
import slide from './Slide.vue'
export default {
	name: 'Carousel',
	data() {
		return {
			slides: [...Array(12).keys()],
			min: 0,
			max: 0,
			stepped: true,
			centered: false,
			prevDelta: 0,
			delta: 0,
			gap: 40,
			oneWidth: 476,
			wrapperHeight: 576,
			carouselHeight: 680,
			count: 0,
			touchendX: 0,
			touchstartX: 0,
			touchendY: 0,
			touchstartY: 0,
			current: 0,
			timeout: 1000,
			started: false,
			finished: false,
		}
	},
	mounted() {
		const VS = new VanillaSwipe({
			element: this.$refs.swipe_field,
			onSwiping: this.swipeHandler,
			onSwiped: this.swipeHandler,
			mouseTrackingEnabled: true,
			touchTrackingEnabled: true,
		})
		VS.init()
		// if (this.centered) {
		// 	// window.innerWidth
		// 	this.delta =
		// 		-this.current * (this.gap + this.oneWidth) +
		// 		(window.innerWidth - this.oneWidth) / 2
		// }
		window.onresize = this.onresize
		this.onresize()
		// if (window.innerWidth < 551) this.oneWidth = window.innerWidth
	},
	components: {
		slide,
	},
	methods: {
		swipeHandler(type = { type: 'end' }, args = { deltaX: 0 }) {
			// console.log({ type, args }) // -> Event, EventData ...arguments
			switch (this.stepped) {
				case true: //stepped
					if (type.type.search('end') > -1 || type.type == 'mouseup') {
						if (args.deltaX > 70) {
							// console.log('swipe left')
							this.current--
						} else if (args.deltaX < -70) {
							// console.log('swipe right')
							this.current++
						}
						this.goTo(this.current)
					} else {
						this.delta =
							-this.current * (this.gap + this.oneWidth) + args.deltaX
						this.delta =
							Math.min(this.max, Math.max(this.delta, this.min)) +
							(this.centered ? (window.innerWidth - this.oneWidth) / 2 : 0)
					}
					break
				default:
					if (type.type.search('end') > -1 || type.type == 'mouseup') {
						this.prevDelta += args.deltaX
					} else {
						this.delta = this.prevDelta + args.deltaX
						this.delta = Math.min(this.max, Math.max(this.delta, this.min))
						// stepper: -1 … count
						this.current =
							this.delta > 0
								? 0
								: Math.floor(-this.delta / (this.gap + this.oneWidth))
					}

					break
			}
		},
		goTo(slide) {
			this.current = Math.min(Math.max(0, slide), this.slides.length - 1)
			this.delta =
				-this.current * (this.gap + this.oneWidth) +
				(this.centered ? (window.innerWidth - this.oneWidth) / 2 : 0)
		},
		onresize() {
			this.max = this.oneWidth + this.gap
			this.min =
				-(
					(this.slides.length - 1) //this.$refs.swipe_field.querySelectorAll('.wrapper > div')
				) *
				(this.gap + this.oneWidth)

			this.centered = window.innerWidth < 551
			this.swipeHandler()
			this.oneWidth = window.innerWidth < 551 ? window.innerWidth - 40 : 476
			this.gap = window.innerWidth < 551 ? 40 : 40
			this.goTo(0)
		},
		pagination(slide) {
			this.goTo(slide)
		},
		next() {
			this.goTo(this.current + 1)
		},
		prev() {
			this.goTo(this.current - 1)
		},
	},
}
</script>
<style scoped>
div.carousel {
	display: flex;
	flex-direction: column;
	width: 100%;
	/* overflow-x: hidden; */
	/* height: v-bind(carouselHeight + 'px'); */
	/* background-color: beige; */
	max-width: 100vw;
	max-width: 1920px !important;
}
/* div.wrapper {
	margin-left: 107px;
} */
@media (max-width: 1280px) {
	div.wrapper {
		margin-left: 0;
	}
}
div.wrapper {
	transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
	transform: translate3d(0px, 0px, 0px);
	position: relative;
	width: 100%;
	height: v-bind(wrapperHeight + 'px');
	z-index: 1;
	display: flex;
	transition-property: transform;
	gap: v-bind(gap + 'px');
	align-items: center;
}
.pagination {
	display: flex;
	flex-direction: row;
	gap: 10px;
	z-index: 10;
	margin: 0px 0 0 12px;
}

.pagination > div {
	cursor: pointer;
	height: 20px;
	width: 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.pagination > div > span {
	flex: 1;
	width: 100%;
	flex-shrink: 0;
	display: block;
	height: 2px;
	background: #cbcbcb;
}
.pagination > .active {
	width: 40px;
}
.pagination > .active > span {
	background: #1f2226;
}
.nextprev {
	display: flex;
	flex-direction: row;
	align-self: flex-end;
	/* position: absolute; */
	width: 100px;
	height: 40px;
	gap: 10px;
	z-index: 10;
	margin: 0px 18px 0 0;
}
.nextprev .next,
.nextprev .prev {
	cursor: pointer;
	width: 40px;
	height: 40px;
	flex: 1;
	display: flex;
	align-items: center;
}
.prev > img,
.next > img {
	flex: 1;
	width: 11px;
	height: 26px;
}
.next > img {
	transform: rotate(180deg);
}
.controls {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 60px 0 0 0;
}

@media (max-width: 800px) {
	.controls {
		flex-direction: column;
		align-items: center;
		margin: 0;
		width: 100vw;
	}
	.nextprev,
	.pagination {
		align-self: center;
		margin: 40px 0 0 0;
		width: calc(100vw - 40px);
		justify-content: space-between;
	}
}
@media (min-width: 551px) {
	div.wrapper {
		/* margin: 0 20px 0 20px; */
	}
}
</style>
