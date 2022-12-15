<script lang="ts">
declare const window: any
import { isLocal } from './common/helper'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
export default {
	mounted() {
		// if (store.state.daoInfo) web3obj.info()
		this.web3.restoreWeb3() // otherwise after refreshing a page signing doesn't work if (store.state.address)
		if (isLocal()) window.web3 = this.web3
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
