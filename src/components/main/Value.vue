<template>
	<section class="value">
		<aside class="quotes">
			<img src="/03value/quote.svg" alt="quote" class="quote" /><img
				src="/03value/quote.svg"
				alt="quote"
				class="quote"
			/>
		</aside>
		<main class="value">
			<img src="/03value/cube1.svg" alt="bee1" class="bee" />
			<img src="/03value/cube2.svg" alt="bee2" class="bee" />
			<img src="/03value/cube3.svg" alt="bee3" class="bee" />
			<img src="/03value/cube4.svg" alt="bee4" class="bee" />
			<h2>What is Value Discovery Protocol <span>?</span></h2>
			<picture alt="Value Discover Protocol Illustration: Everyone has value">
				<source
					type="image/webp"
					srcset="/03value/pic.webp 1x, /03value/pic@2x.webp 2x"
				/>
				<source type="image/png" srcset="/03value/pic.png 1x" />
				<img src="/03value/pic.png" loading="lazy" class="ill" />
			</picture>

			<a class="cta" @click="comingSoon">
				<img src="/03value/arrow-right.svg" alt="arrow right" />
				<span>More</span>
			</a>
		</main>
	</section>
</template>
<script>
export default {
	name: 'Value',
}
</script>

<style scoped>
section.value {
	display: flex;
	flex-direction: column;
	margin: 120px 0 149px 0;
	max-width: 1120px;
	width: 100%;
	gap: 13px;
}
@keyframes buzybuzz {
	20% {
		transform: rotate(0deg); /*360*/
	}
	100% {
		transform: rotate(360deg); /*0 */
	}
}

.bee {
	animation: buzybuzz 2.5s infinite ease-in-out;
	position: absolute;
	animation-play-state: running;
}
.bee:hover {
	animation-play-state: paused;
}
.bee:nth-child(1) {
	top: 236px;
	left: 163px;
	animation-delay: 400ms;
}
.bee:nth-child(2) {
	top: 214px;
	left: 980px;
	animation-delay: 800ms;
}
.bee:nth-child(3) {
	top: 520px;
	left: 840px;
	animation-delay: 1200ms;
}
.bee:nth-child(4) {
	top: 548px;
	left: 68px;
}
.quote {
	width: 15px;
	height: 29px;
}
aside.quotes {
	flex: 1;
	display: flex;
	flex-direction: row;
}
h2 {
	font-weight: 600;
	font-size: 32px;
	text-align: left;
	align-self: flex-start;
}
h2 span {
	font-family: Helvetica, Arial, sans-serif;
	font-size: 38px;
}
main.value {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 140px;
}
main.value .ill {
	object-fit: contain;
	max-width: 695px;
}
.cta {
	cursor: pointer;
	flex: 1;
	align-self: center;
	display: flex;
	flex-direction: row;
	gap: 13px;
	justify-content: center;
	align-items: center;
	padding: 10px 44px;
	border-radius: 10px;
	font-size: 15px;
	border: 1.5px solid #b4b4b4;
	text-decoration: none;
	color: black;
}
.cta:active {
	transform: scale(0.95);
}
.cta > * {
	flex: 1;
}
.cta > img {
	width: 24px;
	height: 24px;
}
@media (max-width: 1120px) {
	.bee {
		display: none;
	}
	section.value {
		max-width: 100vw;
		padding: 0 1rem;
	}
	main.value .ill {
		max-width: 100%;
	}
}
@media (max-width: 550px) {
	section.value {
		margin: 50px 0 150px 0;
	}
	main.value {
		gap: 80px;
	}
}
</style>
