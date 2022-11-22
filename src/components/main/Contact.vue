<template>
	<section class="contact">
		<div class="back"></div>
		<div class="front">
			<h2>Want to know more about us?</h2>
			<div class="row">
				<a href="https://discord.gg/zpy6tXP5Qt" target="_blank">
					<img :src="discord" alt="discord" />
				</a>
				<a href="https://twitter.com/SeerFoundation" target="_blank">
					<img :src="twitter" alt="twitter" />
				</a>
				<a href="https://t.me/seer_official" target="_blank">
					<img :src="telegram" alt="telegram" />
				</a>
				<a @click="handleSubmit" href="#">
					<img :src="youtube" alt="youtube" />
				</a>
				<a @click="handleSubmit" href="#">
					<img :src="tiktok" alt="tiktok" />
				</a>
				<a @click="handleSubmit" href="#">
					<img :src="instagram" alt="instagram" />
				</a>
			</div>
			<form @submit.prevent="handleSubmit">
				<div class="subscribe">
					<input
						type="email"
						v-model="email"
						placeholder="Email Address"
						autocomplete="off"
					/>
					<div class="button">
						<button class="submit" type="submit">Subscribe</button>
					</div>
				</div>
			</form>
		</div>
	</section>
</template>
<script>
import { useRouter } from 'vue-router'
import { router } from '/src/main'
import discord from '/src/assets/08contact/discord.png'
import instagram from '/src/assets/08contact/instagram.png'
import telegram from '/src/assets/08contact/telegram.png'
import tiktok from '/src/assets/08contact/tiktok.png'
import twitter from '/src/assets/08contact/twitter.png'
import youtube from '/src/assets/08contact/youtube.png'

export default {
	name: 'Contact',
	data() {
		return {
			email: '',
			discord,
			instagram,
			telegram,
			tiktok,
			twitter,
			youtube,
		}
	},
	methods: {
		handleSubmit: (e) => {
			e.preventDefault()
			// console.log(this.email)
			router.push({ path: '/coming-soon' })
		},
	},
}
</script>
<style scoped>
section.contact {
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
	color: rgba(0, 0, 0, 0.2);
	font-weight: 600;
	padding-left: 6px;
	font-family: 'Poppins';
}
button {
	height: 46px;
	width: 125px;
	background-color: #aa1fff;
	background: linear-gradient(-90deg, #aa1fff, #2ba1ff);
	border-radius: 4px;
	border: none;
	font-size: 15px;
	color: #ffffff;
	cursor: pointer;
	font-weight: 600;
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
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas: 'l1 l2 l3' 'l4 l5 l6';
	}
	.row a:nth-child(1) {
		grid-area: l1;
	}
	.row a:nth-child(2) {
		grid-area: l2;
	}
	.row a:nth-child(3) {
		grid-area: l3;
	}
	.row a:nth-child(4) {
		grid-area: l4;
	}
	.row a:nth-child(5) {
		grid-area: l5;
	}
	.row a:nth-child(6) {
		grid-area: l6;
	}
}
@media (max-width: 550px) {
	input[type='email'] {
		display: flex;
		max-width: calc(100vw - 40px);
	}
	.subscribe {
		flex-direction: column;
	}
	section.contact {
		margin-top: 100px;
		margin-bottom: 100px;
	}
	.front {
		transform: translateX(-6px) translateY(-6px);
	}
}

@media (max-width: 800px) {
	h2 {
		font-size: 6vw;
		padding: 0 1rem;
	}
}
</style>
