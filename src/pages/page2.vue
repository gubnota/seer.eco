<script lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import store from '../store'

// defineProps({
// 	msg: String,
// })

const count = ref(0)

export default {
	setup() {
		const store = useStore()
	},
	methods: {
		goToPage(evt) {
			this.$router.push('/')
		},
		increment() {
			// store.dispatch('increment')
			this.$store.dispatch('save', {
				k: 'count',
				v: parseInt(this.$store.state.count) + 1,
			})
		},
		//		this.$store.dispatch('increment')
	},
}
</script>

<template>
	<h1>Page2</h1>

	<div class="card">
		<button type="button" @click="increment">
			count is {{ $store.state.count }}
		</button>
		<p>
			Edit
			<code id="cardcode">components/HelloWorld.vue</code> to test HMR
		</p>
	</div>

	<p>
		<router-link to="/">Check out page1</router-link>
	</p>
	<button v-on:click="goToPage">goToPage</button>&nbsp;
	<button v-on:click="$store.dispatch('save', { k: 'count', v: 0 })">
		Reset
	</button>
</template>

<style scoped>
.card {
	background-color: #f0f0f0;
}
.read-the-docs {
	color: #888;
}
</style>
