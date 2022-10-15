<script setup>
import { ref } from 'vue'

defineProps({
	msg: String,
})

const count = ref(0)
</script>

<template>
	<g-carousel>a</g-carousel>
	<h1>Page1 {{ $store.state.count }}</h1>

	<div class="card">
		<button type="button" @click="this.$store.dispatch('increment')">
			count is {{ $store.state.count }}
		</button>
		<p>
			Edit
			<code>components/HelloWorld.vue</code> to test HMR
		</p>
	</div>

	<p>
		<router-link to="/page2/">Check out page2</router-link>
	</p>
	<button
		v-on:click="
			$store.dispatch('save', { k: 'a', v: { a: $store.state.count } })
		"
	>
		Save
	</button>
	&nbsp;
	<button v-on:click="$router.push('page2/page3.html')">Page3</button>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
g-carousel {
	display: flex;
	flex-direction: row;
	background-color: #888;
	height: 400px;
	width: 100%;
}
</style>
