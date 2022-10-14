<template>
	<section>
		<div class="back"></div>
		<div class="front">
			<h2>Want to know more about us?</h2>
			<div class="row">
				<a href="https://discord.gg/zpy6tXP5Qt" target="_blank">
					<img src="/08contact/discord.png" alt="discord" />
				</a>
				<a href="https://twitter.com/SeerFoundation" target="_blank">
					<img src="/08contact/twitter.png" alt="twitter" />
				</a>
				<a href="https://t.me/seer_official" target="_blank">
					<img src="/08contact/telegram.png" alt="telegram" />
				</a>
				<a>
					<img src="/08contact/youtube.png" alt="youtube" />
				</a>
				<a>
					<img src="/08contact/tiktok.png" alt="tiktok" />
				</a>
				<a>
					<img src="/08contact/instagram.png" alt="instagram" />
				</a>
			</div>
			<form @submit.prevent="handleSubmit">
				<div class="subscribe">
					<input type="email" v-model="email" placeholder="Email Address" />
					<div class="button">
						<button class="submit" type="submit">Sign up here</button>
					</div>
				</div>
			</form>
		</div>
	</section>
</template>
<script>
import { useRouter } from 'vue-router'
import { router } from '/src/main'

export default {
	name: 'Contact',
	data() {
		return {
			email: '',
		}
	},
	methods: {
		handleSubmit: () => {
			// console.log(this.email)
			router.push({ path: '/coming-soon' })
		},
	},
}
</script>
<style scoped>
section {
	align-items: center;
	display: flex;
	flex-direction: column;
	background: linear-gradient(257.98deg, #aa1fff 2.42%, #2ba1ff 95.24%);
	border-radius: 28px;
	margin-top: 151px;
	margin-bottom: 146px;
	/* transform: translateX(18px) translateY(18px); */
	position: relative;
}
h2 {
	font-weight: 500;
	font-size: 40px;
	line-height: 123%;
	color: white;
	text-shadow: 0px 0px 17px rgba(244, 244, 244, 0.88);
}
.front {
	z-index: 1;
	transform: translateX(-36px) translateY(-36px);
	background: rgba(233, 242, 255, 0.6);
	box-shadow: inset 0px 4px 18px rgba(217, 239, 255, 0.71);
	backdrop-filter: blur(12px);
	/* Note: backdrop-filter has minimal browser support */
	border-radius: 28px;
	width: 890px;
	min-height: 354px;
	max-width: 90vw;
	align-items: center;
	display: flex;
	flex-direction: column;
	padding: 75px 0 53px 0;
	gap: 30px;
}
.subscribe {
	flex: 1;
	display: flex;
	flex-direction: row;
	gap: 24px;
	align-items: center;
}
input,
select {
	display: block;
	padding: 10px 6px;
	width: 100%;
	box-sizing: bordre-box;
	border: none;
	border-bottom: 1px solid #ddd;
	color: #555;
	width: 313px;
	height: 46px;
	border-radius: 4px;
	font-size: 15px;
}
input::placeholder {
	font-size: 15px;
}
button {
	height: 46px;
	width: 125px;
	background: #aa1fff;
	border-radius: 4px;
	border: none;
	font-size: 15px;
	color: #ffffff;
	cursor: pointer;
}
button:active {
	transform: scale(0.95);
}
.row {
	display: flex;
	flex-direction: row;
	gap: 30px;
}
.row a {
	cursor: pointer;
	flex: 1;
	width: 50px;
	height: 50px;
	text-decoration: none;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 8px;
	display: flex;
	flex-direction: row;
	align-items: center;
	box-shadow: -1px -1px 0 #87a5f8, 1px 1px 0 #ffffff;
	transition: all 0.4s ease;
}
.row a img {
	flex: 1;
	object-fit: contain;
	width: 32px;
	height: 32px;
	filter: brightness(0) invert(1);
}
.row a:hover {
	background: white;
	box-shadow: none;
}
.row a:active {
	transform: scale(0.95);
}
.row a:hover img {
	filter: none;
}
@media (max-width: 1120px) {
	.row {
		flex-direction: column;
	}
}
@media (max-width: 550px) {
	.subscribe {
		flex-direction: column;
	}
}
</style>
