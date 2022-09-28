<template>
	<div class="basement">
		<Billboard />
	</div>
</template>

<script lang="ts">
let window: any = { inst: 0 }
import { getCurrentInstance, ref } from 'vue'
import { useStore } from 'vuex'
import store from '../store'
import Billboard from '../components/billboard.vue'
export default {
	data() {
		return {}
		// return { data: ['dfdd', 'sdfds dsf', 'SDfsdf', 'dsf dfs'] }
	},
	created() {
		// let temp1 = getCurrentInstance()
		setTimeout(() => {
			this.$store.dispatch('save', {
				k: 'data',
				v: [...this.$store.state.data, 'sdfsdfdf'],
			})
		}, 1000)
	},
	setup() {
		store.dispatch('save', {
			k: 'data',
			v: ['dfdd', 'sdfds dsf', 'SDfsdf', 'dsf dfs'],
		})
	},
	methods: {},
	components: { Billboard },
}
</script>

<style scoped>
.basement {
	display: flex;
	/* transform: rotateY(18deg) rotateX(61deg) rotate(144deg) rotateZ(180deg); */
	transform-origin: center center;
	transform-style: preserve-3d;
}

/* main {
	flex: 1;
	display: flex;
	width: 100%;
	flex-direction: column;
} */
h3 {
	flex: 1;
}
</style>
