<template>
	<section class="bottom">
		<line class="a">
			<block class="a">
				<stroke class="b">
					<checkmark /> <span>DSN held longer than required</span>
				</stroke>
				<stroke class="b">
					<checkmark /> <span>Authenticated by Twitter</span>
				</stroke>
				<stroke class="b">
					<checkmark />
					<span>Understand the relevant specifications of SEER DAO</span>
				</stroke>
				<stroke class="b">
					<checkmark />
					<span
						>Pass the judging rules proficiency test (requires a score of
						80)</span
					>
				</stroke>
			</block>
			<block class="b">
				<img :src="smaller_jpg" alt="" :srcset="smaller_w" class="mainpicbg" />
				<img :src="shadow_jpg" alt="" :srcset="shadow_w" class="shadow" />
				<img :src="alphablock_jpg" :srcset="alphablock_w" class="ab ab1" />
				<img :src="alphablock_jpg" :srcset="alphablock_w" class="ab ab2" />
				<img :src="alphablock_jpg" :srcset="alphablock_w" class="ab ab3" />
			</block>
		</line>
		<line class="b"
			><button
				class="btn"
				@click="
					() => {
						this.router.push('/dao')
					}
				"
			>
				<span>Click to apply for DAO</span>
			</button></line
		>
	</section>
</template>
<script lang="ts">
import smaller_w from '/src/assets/dsn/zikkurat_smaller_w.webp'
import smaller_jpg from '/src/assets/dsn/zikkurat_smaller_w.jpg'
import shadow_w from '/src/assets/dsn/zikkurat_shadow_w.webp'
import shadow_jpg from '/src/assets/dsn/zikkurat_shadow_w.jpg'
import alphablock_w from '/src/assets/dsn/zikkurat_cube.webp'
import alphablock_jpg from '/src/assets/dsn/zikkurat_cube.png'
import checkmark from '/src/assets/dsn/checkmark.svg'
import { defineComponent } from 'vue'

export default defineComponent({
	data() {
		return {
			smaller_w,
			smaller_jpg,
			shadow_w,
			shadow_jpg,
			alphablock_w,
			alphablock_jpg,
		}
	},
	components: { checkmark },
})
</script>
<style scoped>
section.bottom {
	display: flex;
	/* background-color: aqua; */
	width: 100%;
	min-height: 350px;
	align-items: center;
	max-width: 1130px;
	justify-content: center;
	flex-direction: column;
}
line.a,
line.b {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	flex: 1;
	background-color: transparent;
}
line.b {
	gap: 100px;
	align-items: self-start;
}
block.a,
block.b {
	/* background-color: blueviolet; */
	display: flex;
	flex-direction: column;
	gap: 36px;
	width: 351px;
	flex: 1;
	height: 100%;
}
block.a {
	align-self: flex-start;
	margin-top: 60px;
}
block.b {
	background-color: transparent;
	position: relative;
	min-height: 420px;
}
img.shadow {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 351px;
	z-index: 2;
	mix-blend-mode: darken;
	/* transform: translateY(0px); */
}
img.mainpicbg {
	width: 340px;
	z-index: 1;
	mix-blend-mode: normal;
}
img.ab {
	position: absolute;
	width: 86px;
	z-index: 1;
	left: 132px;
	top: 120px; /*25px*/
	/* mix-blend-mode: color; */
	animation: float 6s ease-in-out infinite;
}
img.ab1 {
	animation-delay: 3s;
}
img.ab2 {
	left: 67px;
	top: 15px; /*25px*/
}
img.ab3 {
	left: 196px;
	top: 40px; /*25px*/
	animation-delay: 500ms;
}
@keyframes float {
	0% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(10px);
	}
	100% {
		transform: translateY(0px);
	}
}

stroke.b {
	display: flex;
	flex-direction: row;
	gap: 16px;
	font-size: 15px;
	font-weight: 600;
	width: 100%;
	align-items: center;
}
stroke.b > svg {
	overflow: visible;
}
stroke.b > span {
	max-width: 300px;
}
line.b {
	/* transform: translateY(-77px); */
	margin-top: -77px;
	/* background-color: firebrick; */
	margin-bottom: 146px;
}
.btn {
	background: white;
	padding: 24px 46px;
	font-style: normal;
	font-weight: 600;
	font-size: 15px;
	border-radius: 10px;
	z-index: 3;
	border: 1px solid #dfe1e2;
	transition: all 0.4s linear;
}
.btn:hover,
.btn:active {
	background: linear-gradient(-90deg, #aa1fff, #2ba1ff);
	color: white;
}
@media screen and (max-width: 1130px) {
	section.bottom {
		padding: 0 1rem;
	}
	line.b {
		margin-bottom: 100px;
	}
}
@media screen and (max-width: 1024px) {
	block.a {
		margin-top: 0;
		align-self: center;
	}
	line.a {
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}
}
</style>
<style>
section.arrow_down {
	min-height: 120px;
}
@media screen and (max-width: 1130px) {
	section.arrow_down.dsn {
		min-height: 70px;
	}
}
</style>
