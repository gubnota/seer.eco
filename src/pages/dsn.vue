<template>
	<Modal />
	<main class="dsn">
		<section class="main">
			<Top />
			<Header />
			<DSN />
			<Market />
			<Data />
			<Database />
			<Graph />
		</section>
		<section class="wrapper2"></section>
		<section class="arrow_down"></section>
		<Bottom />
	</main>
	<Footer />
</template>
<script>
import Top from '../components/dao/Top.vue'
import Footer from '../components/common/Footer.vue'
import Modal from '../components/common/Modal.vue'
import Header from '../components/dsn/Header.vue'
import DSN from '../components/dsn/DSN.vue'
import Market from '../components/dsn/Market.vue'
import Data from '../components/dsn/Data.vue'
import Database from '../components/dsn/Database.vue'
import Graph from '../components/dsn/Graph.vue'
import Bottom from '../components/dsn/Bottom.vue'
export default {
	components: {
		Top,
		Footer,
		Modal,
		Bottom,
		Header,
		DSN,
		Market,
		Data,
		Database,
		Graph,
	},
}
</script>
<style scoped>
section.wrapper2 {
	height: 100vh;
}
main.dsn {
	background: linear-gradient(
		180deg,
		#ffffff 0%,
		#f8f7fd 28.54%,
		#f8f7fd 68.63%,
		#ffffff 76.81%
	);
	width: 100%;
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
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
	min-height: 200vh;
}
</style>
