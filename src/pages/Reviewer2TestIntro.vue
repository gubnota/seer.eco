<template>
	<Template>
		<main class="meta">
			<section class="review">
				<h1>Assessment Rules Aptitude Test</h1>
				<h2>80 points to pass</h2>
				<div class="line"></div>
				<div class="book">
					<div class="page">
						<div class="title">number of questions</div>
						<div class="text">
							<div class="count">30</div>
							<span>Que</span>
						</div>
					</div>
					<div class="page">
						<div class="title">Exam duration</div>
						<div class="text">
							<div class="count">30</div>
							<span>min</span>
						</div>
					</div>
				</div>
				<div class="info">
					3 exam opportunities. <i>{{ attempts }}</i
					>&nbsp; remaining
				</div>
				<div class="btn" @click="start">start answering</div>
			</section>
			<aside class="conditions_unmet" v-if="attempts == 0">
				<span
					>You have run out of exam opportunities and can no longer take the
					exam</span
				>
			</aside>
		</main>
	</Template>
</template>
<script lang="ts">
import { appendFile } from 'fs'
import Template from '../components/dao/reviewer/template.vue'
export default {
	data() {
		return {
			attempts: 0,
		}
	},
	methods: {
		start() {
			this.router.push({ path: '/reviewer/test' })
		},
	},
	components: { Template },
}
</script>
<style scoped>
.meta {
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: 56px;
}
h1 {
	font-size: 32px;
	font-weight: 600;
	line-height: 39px;
}
h2 {
	font-size: 15px;
	font-weight: 400;
	color: #3a4048;
	line-height: 18px;
	text-align: left;
}
.line {
	margin: 0 24px;
	width: 100%;
	height: 1px;
	background: #ebedef;
	align-self: center;
}

.book {
	display: flex;
	flex-direction: row;
	width: 100%;
	align-self: center;
	justify-content: center;
}
.page {
	display: flex;
	flex-direction: column;
	width: 100%;
	flex: 1;
	height: 248px;
	padding: 32px;
	gap: 36px;
	justify-content: space-around;
	align-items: center;
	max-width: 268px;
	position: relative;
}
.page:first-child::after {
	position: absolute;
	right: 0;
	content: ' ';
	width: 1px;
	height: 180px;
	background: #ebedef;
}
.title {
	font-size: 18px;
	font-weight: 600;
	color: #3a4048;
	line-height: 22px;
}
.text {
	display: flex;
	flex-direction: row;
	gap: 15px;
	align-items: flex-end;
}
.count {
	font-size: 64px;
	font-weight: 400;
	color: #7c72ea;
}
.text span {
	font-size: 16px;
	font-weight: 600;
	color: #000000;
	margin-bottom: 10px;
}
.page:last-child .count {
	color: #17bb7f;
}

section.review {
	display: flex;
	flex-direction: column;
	margin: 132px 0 0 0;
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
	max-width: 1120px;
}
.info {
	font-size: 15px;
	font-family: Poppins-SemiBold, Poppins;
	font-weight: 600;
	color: #3a4048;
	text-align: center;
}
.info i {
	font-style: italic;
	font-weight: bolder;
	font-size: 120%;
}
.btn {
	align-self: center;
	border-radius: 8px;
	opacity: 1;
	border: 1px solid rgba(0, 0, 0, 0.2);
	padding: 12px 46px;
}
.conditions_unmet {
	padding: 24px;
	font-weight: 600;
	font-size: 15px;
	line-height: 123%;
	text-align: center;
	color: #ffffff;
	background: rgba(0, 0, 0, 0.62);
	border-radius: 8px;
	max-width: fit-content;
	align-self: center;
	font-size: 13px;
	font-weight: 600;
}
</style>
