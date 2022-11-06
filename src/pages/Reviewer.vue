<template>
	<Modal />
	<main class="reviewer">
		<section class="main">
			<Top />
			<slot></slot>
			<div class="crystal" />
			<div class="oval" />
		</section>
	</main>
</template>
<script lang="ts">
import Top from '../components/dao/Top.vue'
import Modal from '../components/common/Modal.vue'
import oval from '/src/assets/reviewer/oval@2x.png'
import crystal from '/src/assets/reviewer/crystal@2x.png'
export default {
	data() {
		return {
			oval: `url(${oval})`,
			crystal: `url(${crystal})`,
		}
	},
	components: { Top, Modal },
}
</script>
<style scoped>
main.reviewer {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	flex: 1;
	align-items: center;
	background: linear-gradient(180deg, #ffffff 0%, #f8f7fd 100%);
}
section.main {
	flex: 1;
	width: 100%;
	max-width: 1130px;
	/* background-color: aqua; */
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
.crystal {
	position: absolute;
	width: 381px;
	height: 407px;
	right: 0;
	top: 56.97px;
	background-image: v-bind('crystal');
	background-size: contain;
}
.oval {
	position: absolute;
	width: 354px;
	height: 337px;
	background-image: v-bind('oval');
	background-size: contain;
	left: 126px;
	bottom: 0;
	background-repeat: no-repeat;
}
</style>
