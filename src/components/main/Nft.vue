<template>
	<section class="nft">
		<h2>SEER Space</h2>
		<div class="collections">
			<span class="active" onclick="">Recommend</span>
			<span>Hottest</span>
			<span>Newest</span>
		</div>
		<div ref="mySlider" class="swiper-container">
			<div class="swiper-wrapper">
				<!-- Slides -->
				<swiper-slide v-for="(el, j) in [...Array(4 * 2).keys()]">
					<!-- <div class="slide next" v-if="j > 6"></div> -->
					<div class="slide" :class="{ first: el == 0, next: el != 0 }">
						<div class="front">
							<div class="ava"></div>
							<img
								src="/07nft/creator1.png"
								alt="ava"
								class="pic"
								v-if="j == 0"
							/>
							<img
								src="/07nft/creator4.gif"
								alt="ava"
								class="pic"
								v-else-if="j % 3 == 0"
							/>
							<img
								src="/07nft/creator3.png"
								alt="ava"
								class="pic"
								v-else-if="j % 3 == 1"
							/>
							<img src="/07nft/creator5.gif" alt="ava" class="pic" v-else />
							<div
								v-if="el == 0"
								class="r r1 first"
								style="background-image: url(/07nft/creation5.webp)"
							></div>
							<div
								v-else-if="el == 1"
								class="r r1"
								style="background-image: url(/07nft/creation3.webp)"
							></div>
							<div
								v-else-if="el == 2"
								class="r r1"
								style="background-image: url(/07nft/creation4.webp)"
							></div>
							<div
								v-else
								class="r r1"
								style="background-image: url(/07nft/bored_ape.webp)"
							></div>

							<div class="r r2">
								<span>Ended on</span>
								<span>September 30, 2021</span>
							</div>
							<div class="r r3">
								<div class="seller">
									<span
										>{{
											el == 0 ? 'Cega Super Sanics' : `Cega Super Sanics` + j
										}}
									</span>
									<img src="/07nft/token1.png" v-if="el == 0" class="token" />
									<img src="/07nft/token2.png" v-else class="token" />
								</div>
								<div class="platform">
									{{ el == 0 ? '9911NFT' : '$WILD' }}
								</div>
								<div class="desc">
									{{
										el == 0
											? 'Announcing the Cega Super Sanics Utility NFT Collection'
											: 'NFT Designs, NFT concepts, Crypto NFT Wallpapers'
									}}
								</div>
							</div>
							<div class="r r4" @click="onclickHandler">
								<span>{{ el == 0 ? 'Land Sale' : 'Token Sale' }}</span>
							</div>
						</div>
						<!-- <div class="back" v-if="el == 0"></div> -->
						<div class="back"></div>
					</div>
				</swiper-slide>
			</div>
			<!-- pagination -->
			<div class="pagination"></div>
			<!-- navigation buttons -->
			<div class="nextprev">
				<div class="prev"><img src="/07nft/left.svg" alt="prev" /></div>
				<div class="next"><img src="/07nft/left.svg" alt="prev" /></div>
			</div>
		</div>
		<a @click="comingSoon" class="cta">Explore More Space</a>
	</section>
</template>
<script>
import Swiper2 from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Keyboard, Autoplay, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import { comingSoon } from '../../common/helper'
export default {
	name: 'Nft',
	data() {
		return {
			// active: 0
			slider: null,
			mySliderOptions: {
				// loop: true,
				// centeredSlides: true,
				// centerInsufficientSlides: true,
				class: 'mySwiper',
				spaceBetween: 40,
				slidesPerGroup: 1,
				slidesPerView: 2,
				breakpoints: {
					1979: {
						slidesPerGroup: 1,
						slidesPerView: 4,
					},
					1280: {
						slidesPerGroup: 1,
						slidesPerView: 3,
					},
					1024: {
						slidesPerGroup: 1,
						slidesPerView: 2,
					},
					890: {
						slidesPerGroup: 1,
						slidesPerView: 1,
					},
				},
				Keyboard: true,
				pagination: {
					el: '.pagination',
					type: 'bullets',
				},
				navigation: {
					nextEl: '.next',
					prevEl: '.prev',
				},
				modules: [Keyboard, Autoplay, Pagination, Navigation],
			},
		}
	},
	setup() {
		return { modules: [Keyboard, Autoplay, Pagination, Navigation] }
	},
	components: {
		Swiper,
		SwiperSlide,
	},
	methods: {
		onclickHandler(e) {
			e.preventDefault()
			e.stopPropagation()
			comingSoon()
			// this.slider.slideTo(1)
		},
	},
	mounted() {
		// const swiper = new Swiper2('.swiper', {
		// 	speed: 400,
		// 	spaceBetween: 100,
		// })
		this.slider = new Swiper2(this.$refs.mySlider, this.mySliderOptions)
	},
}
</script>

<style>
.swiper-pagination-bullet {
	border-radius: 0;
	width: 20px;
	height: 2px;
}
.swiper-pagination-bullet-active {
	border-radius: 0;
	width: 40px;
	height: 2px;
	background: #1f2226;
}
.swiper-pagination {
	width: 280px;
	margin-left: 110px;
}
</style>

<style scoped>
section.nft {
	max-width: 100vw;
	display: flex;
	flex-direction: column;
	margin: 0 0 42px 0;
}
h2 {
	font-size: 32px;
	line-height: 123%;
	color: #000000;
	text-align: left;
	margin-left: 70px;
	font-weight: 600;
}
.pagination {
	z-index: 1;
	margin: 40px 0 0 100px;
}
.collections {
	gap: 49px;
	flex: 1;
	display: flex;
	flex-direction: row;
	align-self: flex-end;
	align-items: stretch;
	margin-right: 101px;
	align-items: flex-start;
	margin-bottom: 33px;
}
.collections span {
	cursor: pointer;
	flex: 1;
	font-weight: 600;
	font-size: 15px;
	line-height: 123%;
	color: #000000;
}
.collections span:active {
	transform: scale(0.95);
}
.collections span.active {
	color: #aa1fff;
	line-height: 150%;
	border-bottom: 4px solid #aa1fff;
}

.swiper-container {
	overflow-x: hidden;
	/* transform: translateX(70px); */
	max-width: 100vw;
	max-width: 1980px;
}
.swiper-slide:first-child {
	margin-left: 70px;
}

.swiper-slide {
	/* background: #f0f0f0; */
	justify-content: center;
	align-items: center;
	display: flex;
	min-width: 474px;
	/* height: 640px !important; */
	max-width: 100vw;
	/* Center slide text vertically */
}
.swiper-slide img {
	display: block;
	width: 400px;
	height: 100%;
	object-fit: cover;
}
.nextprev {
	display: flex;
	flex-direction: row;
	/* position: absolute; */
	right: 144px;
	bottom: -40px;
	width: 100px;
	height: 60px;
	gap: 10px;
	z-index: 1;
	float: right;
	margin: -30px 100px 0 0;
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
.cta {
	cursor: pointer;
	margin: 83px 0 70px 0;
	flex: 1;
	align-self: center;
	display: flex;
	flex-direction: row;
	gap: 13px;
	justify-content: center;
	align-items: center;
	padding: 24px 26px;
	text-align: center;
	border-radius: 10px;
	width: 241px;
	height: 66px;
	font-size: 15px;
	border: 1.5px solid #b4b4b4;
	text-decoration: none;
	color: black;
}
.cta:active {
	transform: scale(0.95);
}

.slide {
	text-align: center;
	font-size: 18px;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
	width: 476px;
	height: 560px;
	/* background-color: rgba(0, 0, 0, 0.1); */
	position: relative;
	border-radius: 20px;
	max-width: 100vw;
}
.front,
.back {
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
	width: 476px;
	height: 560px;
	position: absolute;
	border-radius: 20px;
	overflow: hidden;
	max-width: 100vw;
}
.slide.next .front {
	box-shadow: inset 0px 4px 18px rgba(217, 239, 255, 0.71) !important;
	backdrop-filter: blur(12px) !important;
}
.front {
	background: white;
	z-index: 2;
	position: relative;
}
.slide.first .front {
	/* background: rgba(255, 255, 255, 1); */
	background: rgba(233, 242, 255, 0.6);
	box-shadow: inset 0px 4px 18px rgba(217, 239, 255, 0.71);
	backdrop-filter: blur(12px);
	background: linear-gradient(90deg, #efc3ea 0%, #d4a3fa 100%);
	box-shadow: inset 0px 4px 18px rgba(217, 239, 255, 0.71) !important;
}
.back {
	z-index: 1;
	transform: translateX(10px) translateY(10px);
	background-color: #aa1fff;
	/* background: url(/07nft/bg2.svg); */
	background: linear-gradient(90deg, #f94cb3, #aa1fff);
}
.next .back {
	transform: none;
	box-shadow: 0 0 10px rgba(217, 239, 255, 0.71);
}
.r {
	width: 100%;
}
.r1 {
	flex: 310;
	background-color: black;
	background-size: cover;
	background-repeat: no-repeat;
}
.r2 {
	flex: 40;
	background-color: white;
	display: flex;
	flex-direction: row;
	padding-right: 12px;
	gap: 10px;
	align-items: center;
	justify-content: flex-start;
	width: 326px;
	font-size: 15px;
	align-self: flex-end;
	z-index: 4;
}
.r2 > span {
	flex: 1;
}
.next .r2 {
	background-color: #aa1fff;
	color: white;
}
.r3 {
	flex: 308;
	background-color: white;
	z-index: 1;
}
.first .r3 {
	background-color: #000;
	background: url(/07nft/bg_first.svg);
	/* background: linear-gradient(90deg, #f9e0f3 0%, #efd9fd 100%); */
}
.first .r3 {
	/* background: rgba(233, 242, 255, 0.6);
	box-shadow: inset 0px 4px 18px rgba(217, 239, 255, 0.71);
	backdrop-filter: blur(12px);
	background: linear-gradient(90deg, #efc3ea 0%, #d4a3fa 100%); */
}
.first .r4 {
	background: linear-gradient(90deg, #f9e0f3 0%, #efd9fd 100%);
}

.r4 {
	cursor: pointer;
	flex: 55; /*46*/
	background: rgba(255, 255, 255, 0.6);
	text-align: center;
	color: black;
	font-weight: 600;
	font-size: 15px;
	line-height: 123%;
	align-items: center;
	flex-direction: row;
	display: flex;
	justify-content: center;
}
.next .r4 {
	background-color: #aa1fff;
	background: linear-gradient(90deg, #2ba1ff 0%, #aa1fff 100%);

	color: #ffffff;
}
.ava {
	position: absolute;
	top: 164px;
	left: 0;
	width: 150px;
	height: 150px;
	display: flex;
	align-items: center;
	background: rgba(255, 255, 255, 0.5);
	backdrop-filter: blur(10px);
	/* filter: blur(20px); */
	overflow: hidden;
	border-radius: 8px;
	justify-content: center;
}
.pic {
	position: absolute;
	top: 185px;
	left: 21px;
	width: 108px !important;
	height: 108px !important;
	object-fit: cover;
	border: 4px solid #ffffff;
	border-radius: 8px;
	z-index: 2;
}
.r3 {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: 100%;
	justify-content: center;
	gap: 8px;
}
.desc {
	text-align: left;
	margin: 0px 30px 42px 30px; /**/
	font-size: 15px;
	line-height: 22px;
	color: white;
	font-weight: 400;
	min-height: 44px;
	letter-spacing: 0.5px;
}
.next .desc {
	color: #b2b4b5;
}
/* start Autofill the space between elements with dots. pure Css */

/* end Autofill the space between elements with dots. pure Css */
.platform {
	font-weight: 400;
	font-size: 15px;
	line-height: 22px;
	color: white;

	margin: 6px 30px 12px 0px; /**/
	text-align: left;
	padding-left: 28px;
}
.next .platform {
	color: black;
}
.seller {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 0 0 0 24px;
	color: #ffffff;
	text-shadow: 0px 0px 17px rgba(244, 244, 244, 0.88);
	font-weight: 700;
	font-size: 28px;
	margin-top: 15px;
}
.seller span {
	flex: 4;
	text-align: left;
}
.seller .token {
	flex: 1;
	width: 34px;
	height: 34px;
	object-fit: contain;
}
.next .seller {
	color: #1f2226;
	text-shadow: 0px 0px 17px rgba(244, 244, 244, 0.88);
}
@media (max-width: 550px) {
	section.nft {
		margin: 49px 0 42px 0;
	}
	.swiper-slide:first-child {
		margin-left: 0;
	}
	.swiper-slide {
		margin-right: 0;
		min-width: 100vw;
		/* height: 700px !important; */
	}
	.nextprev {
		bottom: initial;
		margin: 30px auto;
		text-align: center;
		float: none;
	}
	.collections {
		margin-right: auto;
		padding: 1rem 1rem 0 1rem;
	}
	.pagination {
		margin: 40px auto;
		text-align: center;
	}
	.cta {
		margin: 10px 0;
	}
	.swiper-container {
		transform: none;
		overflow-x: hidden;
	}
}
@media (max-width: 480px) {
	.r2 {
		width: 71vw;
		font-size: 12px;
	}
	.pic {
		top: 191px;
		left: 6px;
		width: 26vw !important;
		height: 26vw !important;
	}
	.ava {
		top: 184px;
		left: 0;
		width: 29vw;
		height: 29vw;
	}
}
</style>
