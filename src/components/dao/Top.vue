<template>
	<nav class="top">
		<router-link to="/">
			<img :src="logo" alt="logo" class="logo" />
		</router-link>
		<button @click="connect">
			<img :src="lock" alt="" />
			<span>Connect Wallet</span>
		</button>
	</nav>
</template>
<script lang="ts">
import logo from '/src/dao/assets/logodao.png'
import lock from '/src/dao/assets/lock.png'
export default {
	data() {
		return {
			logo,
			lock,
		}
	},
	methods: {
		connect() {
			console.log('connect')
		},
	},
}
</script>
<style scoped>
nav.top {
	margin: 15px 0 0 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
button {
	background-color: transparent;
	border: none;
	width: 194px;
	height: 42px;
	border-radius: 10px 10px 10px 10px;
	opacity: 1;
	border: 1px solid rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center; /*vertically*/
	justify-content: center; /* horizontally*/
}
button img {
	width: 18px;
	height: 18px;
}
button span {
	font-size: 15px;
	font-weight: 600;
}
.logo {
	width: 174px;
	height: 32px;
}
</style>
