<script setup lang="ts">
import { ref } from 'vue'
defineProps({
	msg: String,
})

const count = ref(0)
</script>
<script lang="ts">
import { defineComponent } from 'vue'
import VideoPlaceholder from '../components/main/VideoPlaceholder.vue'
// normal <script>, executed in module scope (only once)

// declare additional options
export default defineComponent({
	// inheritAttrs: false,
	// customOptions: {},
	components: {
		VideoPlaceholder,
	},
})
</script>
<template>
	<h1>f</h1>
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
