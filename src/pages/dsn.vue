<template>
	<div class="content">
		<Modal />
		<main class="dsn">
			<section class="main">
				<Top :isDsn="true" />
				<Header />
				<DSNEl />
				<Data />
				<Database />
				<Graph />
			</section>
		</main>
		<section class="wrapper2"></section>
		<section class="arrow_down dsn"></section>
		<Bottom />
		<Footer />
	</div>
</template>
<script lang="ts">
import Top from '../components/dao/Top.vue'
import Footer from '../components/common/Footer.vue'
import Modal from '../components/common/Modal.vue'
import Header from '../components/dsn/Header.vue'
import DSNEl from '../components/dsn/DSN.vue'
import Data from '../components/dsn/Data.vue'
import Database from '../components/dsn/Database.vue'
import Graph from '../components/dsn/Graph.vue'
import Bottom from '../components/dsn/Bottom.vue'
import dsnBg from '/src/assets/dsn/dsn_bg.jpg'

import { defineComponent } from 'vue'
export default defineComponent({
	data() {
		return { dsnBg }
	},
	components: {
		Top,
		Footer,
		Modal,
		Bottom,
		Header,
		DSNEl,
		Data,
		Database,
		Graph,
	},
	mounted() {
		;(async () => {
			const dsnList1 = await this.web3.DSNList()
			this.$store.dispatch('save', {
				k: 'dsnListTop',
				v: dsnList1.list.slice(0, 1),
			})
			if (this.$store.state.seerToken) {
				//TODO: fetch My DSN Data
				this.web3.MyDSNs()
			}
		})()
	},
})
</script>
<style scoped>
section.wrapper2 {
	/* height: 100vh; */
}
.bg {
	/* background-color: aquamarine; */
	content: '';
	width: 100%;
	height: 808px;
	position: absolute;
	left: 0;
	top: 64px;
	right: 0;
	align-self: flex-start;
}
.bg .front {
	height: 408px;
	content: '';
	z-index: 2;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	background: linear-gradient(
		0deg,
		#fcfcff 29.01%,
		rgba(252, 252, 255, 0) 113.48%
	);
}
.bg img {
	z-index: 1;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	height: 408px;
	width: 100%;
	object-fit: cover;
}
main.dsn {
	background: linear-gradient(
		180deg,
		#ffffff 0%,
		#f8f7fd 28.54%,
		#f8f7fd 68.63%,
		#f8f7fd 76.81%
	);
	width: 100%;
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
}
main.dsn {
	position: relative;
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
	/* min-height: 200vh; */
}
div.content {
	width: 100%;
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
}
</style>
