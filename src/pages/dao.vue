<template>
	<Modal />
	<main class="dao">
		<section class="main">
			<CheckIn />
			<Top :is-dao="true" />
			<SectionTop />
			<Roles />
			<Announcements />
			<ReviewUpdates />
			<FooterDao />
		</section>
	</main>
</template>
<script lang="ts">
import Top from '../components/dao/Top.vue'
import SectionTop from '../components/dao/SectionTop.vue'
import Announcements from '../components/dao/Announcements.vue'
import Roles from '../components/dao/Roles.vue'
import ReviewUpdates from '../components/dao/ReviewUpdates.vue'
import FooterDao from '../components/dao/Footer.vue'
import Modal from '../components/common/Modal.vue'
import CheckIn from '../components/dao/CheckIn.vue'

// import CheckIn from
// import Top from '/src/components/dao/Top.vue'
// import Top from '/src/components/dao/Top.vue'

export default {
	name: 'DAO',

	components: {
		FooterDao,
		Top,
		SectionTop,
		Announcements,
		Roles,
		ReviewUpdates,
		Modal,
		CheckIn,
	},
}
</script>
<style scoped>
main.dao {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	flex: 1;
	align-items: center;
	background: linear-gradient(180deg, #ffffff 0%, #f8f7fd 30%);
}
section.main {
	flex: 1;
	width: 100%;
	max-width: 1130px;
	/* background-color: aqua; */
	display: flex;
	flex-direction: column;
	/* overflow: hidden; */
	position: relative;
	overflow-x: visible;
}
</style>
