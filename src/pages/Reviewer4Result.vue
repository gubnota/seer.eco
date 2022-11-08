<template>
	<Template>
		<main class="meta">
			<section class="review">
				<prize class="prize" v-if="passed" />
				<h1 v-if="!passed">Exam failed</h1>
				<h1 v-else class="congrats">Congratulations</h1>
				<div class="block" :class="{ success: passed }">
					<p v-if="!passed">
						You failed the exam, please learn more about DAO in order to become
						a DAO reviewer！
					</p>
					<p v-if="passed">
						Congratulations, you passed the SEER DAO exam and obtained the SEER
						DAO membership. You can participate in the DAO construction and
						review.
					</p>
					<p v-if="passed">
						You can learn, grow, work, contribute, and contribute to the new
						world of web3 with SEER DAO.
					</p>
					<p v-if="passed">
						seer dao is based on the community and gives back to the community.
						Hurry up to find out the details of the next feedback.
					</p>
				</div>
				<div class="line"></div>
				<div class="row">
					<div class="logo"><logo /></div>
					<span>{{ now }}</span>
				</div>
			</section>
			<div class="btn" @click="intro()">Confirmation</div>
		</main>
	</Template>
</template>
<script lang="ts">
import Template from '../components/dao/reviewer/template.vue'
import Reviewer2TestIntro from './Reviewer2TestIntro.vue'
import logo from '/src/assets/reviewer/black_logo.svg'
import prize from '/src/assets/reviewer/prize.svg'

export default {
	props: {
		// score: Number,
		passed: Boolean,
	},
	setup(props) {
		console.log(props.passed)
	},
	data() {
		return {
			// passed: true,
			now: '',
		}
	},
	mounted() {
		// this.passed = this.score > 4 ? true : false
	},
	methods: {
		intro() {
			if (!this.passed) this.router.push('/reviewer/intro')
			else this.router.push('/dao')
			setTimeout(() => {
				// window.location.reload()
			}, 0)
			// window.location.reload
		},
	},
	components: { Template, logo, prize },
}
</script>
<style scoped>
.meta {
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: 114px;
}
section.review {
	display: flex;
	flex-direction: column;
	margin: 134px 0 0 0;
	background: #ffffff;
	border-radius: 8px 8px 0px 0px;
	/* height: 30vh; */
	align-items: stretch;
	padding: 24px 24px;
	gap: 8px;
	min-height: 384px;
	z-index: 1;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	width: 554px;
	align-self: center;
	max-width: 100%;
	max-width: 1120px;
	position: relative;
}
.prize {
	position: absolute;
	right: 10px;
	top: 0;
}
.btn {
	align-self: center;
	border-radius: 8px;
	opacity: 1;
	border: 1px solid rgba(0, 0, 0, 0.2);
	padding: 12px 46px;
	font-weight: bold;
}
h1 {
	margin-top: 15px;
	font-size: 18px;
	font-weight: 600;
	color: #e94f4d;
	text-align: center;
	margin-bottom: 0;
	width: 150px;
	align-self: center;
	border-bottom: 1px solid #ebedef;
	padding-bottom: 15px;
}
.congrats {
	background: linear-gradient(257.98deg, #aa1fff 2.42%, #2ba1ff 95.24%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
}
.line {
	margin: 0 24px;
	width: 100%;
	height: 1px;
	background: #ebedef;
	align-self: center;
}
.block {
	margin: 35px 0 161px 0;
	font-size: 13px;
	font-weight: 400;
	color: #3a4048;
	line-height: 16px;
	gap: 38px;
	display: flex;
	flex-direction: column;
}
.block.success {
	margin-bottom: 65px;
}
.row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.logo {
}
.row span {
	font-size: 13px;
	font-weight: 400;
	color: #1f2226;
	line-height: 16px;
}
</style>
