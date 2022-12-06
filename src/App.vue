<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
export default {
	mounted() {
		this.web3.restoreWeb3()
	},
}
</script>

<template>
	<router-view v-slot="{ Component, route }">
		<!-- <transition name="route" mode="out-in"> -->
		<component :is="Component" :key="route.path" />
		<!-- </transition> -->
	</router-view>
</template>

<style scoped>
.route-enter-active,
.route-leave-active {
	transition: all 0.5s ease-in-out;
}
.route-enter-from,
.route-leave-to {
	opacity: 0;
}
.route-enter-from {
	opacity: 0;
	transform: translateX(100px);
}
.route-enter-to {
	transform: translateX(0px);
}
.route-leave-to {
	opacity: 0;
	transform: translateX(-100px);
}
</style>
