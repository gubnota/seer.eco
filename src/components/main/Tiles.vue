<template>
	<section class="kaleidoscope">
		<aside class="left">
			<div class="tile top">
				<div class="front">
					<!-- <img
						alt="Bored Ape"
						src="/04create/1.png"
						srcset="/04create/1.webp 360w, /04create/1@2x.webp 2x"
					/> -->
				</div>
				<div class="hover">
					You can create your public space or private space, depending on who
					you want to see it.
				</div>
			</div>
			<div class="tile bottom">
				<div class="front"></div>
				<!-- <img alt="Layouts" src="/04create/4.webp" srcset="/04create/4.webp" /> -->
				<div class="hover">
					We make labels for each user. We know their interests, their concerns,
					their assets, etc.
				</div>
			</div>
		</aside>
		<aside class="right">
			<div class="top">
				<div class="tile">
					<div class="front"></div>
					<!-- <img
						alt="Blue disc"
						src="/04create/2.png"
						srcset="/04create/2.webp 360w, /04create/2@2x.webp 2x"
					/>
 -->
					<div class="hover">
						Who do you want to visit your space? Tell me, I'll help you find
						them.
					</div>
				</div>
				<div class="tile">
					<div class="front"></div>
					<div class="hover">
						We make labels for each user. We know their interests, their
						concerns, their assets, etc.
					</div>
				</div>
			</div>
			<div class="tile bottom">
				<div class="front">
					<h3>
						Build your metaverse social network in SEER and find your true
						friends.
					</h3>
					<a class="cta" @click="comingSoon"><span>Coming soon</span></a>
				</div>
				<!-- <div class="hover">Coming soon</div> -->
			</div>
		</aside>
	</section>
</template>

<script>
export default {
	name: 'Tiles',
}
</script>

<style scoped>
section.kaleidoscope {
	width: 100%;
	min-height: 200px;
	display: flex;
	flex-direction: row;
	gap: 10px;
}
.left {
	flex: 754;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.left > * {
	flex: 1;
	min-height: 398px;
}
.right {
	width: 100%;
	flex: 954;
	/* background: #404; */
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.right > * {
}
.right .top {
	flex: 624;
	display: flex;
	flex-direction: row;
	gap: 10px;
}
.right .top > * {
	flex: 1;
}

.right .bottom {
	flex: 168;
}
.tile {
	background-color: rgba(0, 0, 0, 0.058);
	position: relative;
	overflow: hidden;
	cursor: pointer;
	border-radius: 28px;
}
.tile .front,
.tile .hover {
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
	flex: 1;
	align-items: flex-start;
	justify-content: flex-start;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}
.tile,
.tile .front {
	background-size: cover !important;
	background-repeat: no-repeat;
}
.tile .hover {
	display: none;
	background-color: rgba(0, 0, 0, 0.8);
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}
.tile:hover .hover {
	display: flex;
	width: 100%;
	height: 100%;
	flex: 1;
	align-items: flex-start;
	justify-content: flex-start;
	color: white;
	padding: 34px 34px;
	font-size: 18px;
}
.tile .front > * {
	/* flex: 1; */
}
.tile .front {
	display: flex;
	flex-direction: column;
}
.tile .front img {
	object-fit: cover;
}
.left .top .front {
	background-image: url('/04create/1.png');
	background-image: image-set(
		url('/04create/1.webp') 1x,
		url('/04create/1@2x.webp') 2x
	);
}
.left .bottom .front {
	background-image: url('/04create/4.png');
	background-image: image-set(url('/04create/4.webp'));
}
.right .top .tile:first-child .front {
	background: url('/04create/2@2x.webp');
}
.right .top .tile:last-child .front {
	background-image: url('/04create/3.png');
	background-image: image-set(url('/04create/3.webp'));
}
.right .bottom .front {
	background: #1f2226;
	padding: 39px 34px;
	gap: 33px;
}
.right .bottom .front h3 {
	color: #ffffff;
	font-size: 24px;
}
.cta {
	color: #ffffff;
	text-decoration: none;
	background: #000000;
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px 24px;
	border: 1px solid #000000;
}
.right .bottom .front:hover .cta {
	border: 1px solid white;
}
@media (max-width: 1023px) {
	.right .top {
		flex-direction: column;
	}
	section.kaleidoscope {
		flex-direction: column;
		height: 2070px;
	}
}
</style>
