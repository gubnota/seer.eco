<template>
	<div class="navtop">
		<div class="btn" @click="back"><span>&lt;</span></div>
	</div>
</template>
<script type="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	methods: {
		back(){
      this.router.go(-1)
		}
	},
})
</script>
<style scoped>
.navtop {
	display: none;
}
@media (max-width: 550px) {
	.navtop {
		/* background-color: aqua; */
		height: 60px;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		display: flex;
		padding: 0px 0 0 16px;
		transform: translateY(86px);
	}
	.navtop > div {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		width: 32px;
		height: 32px;
		background-color: white;
		color: black;
		font-size: 2rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
}
</style>
