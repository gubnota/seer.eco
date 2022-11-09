<template>
	<Template>
		<main class="meta">
			<section class="review" :class="{ hide: transition, show: showing }">
				<div class="row">
					<div class="key question">
						<span class="q">Q{{ current + 1 }}</span
						>&nbsp;/&nbsp;{{ total }}
					</div>
					<div class="val time">{{ this.formatTime() }}</div>
				</div>
				<h3>Single Choice</h3>
				<div class="line"></div>
				<h2>
					{{ this.questions[this.current].text }}
				</h2>
				<div class="block style2">
					<div
						class="option"
						@click="option(i)"
						:class="{ selected: selected == i }"
						v-for="(el, i) in this.questions[this.current].options"
					>
						<span>{{ el.k }}</span> <span>{{ el.v }}</span>
					</div>
					<!-- <div
						class="option"
						@click="option(2)"
						:class="{ selected: selected == 2 }"
					>
						<span>B</span> <span>Option 2</span>
					</div>
					<div
						class="option"
						@click="option(3)"
						:class="{ selected: selected == 3 }"
					>
						<span>C</span> <span>Option 3</span>
					</div>
					<div
						class="option"
						@click="option(4)"
						:class="{ selected: selected == 4 }"
					>
						<span>D</span> <span>Option 4</span>
					</div> -->
				</div>
				<div class="btn" :class="{ disabled: selected == -1 }" @click="next()">
					Next Question
				</div>
			</section>
			<aside class="warn" v-if="this.message">{{ this.message }}</aside>
		</main>
	</Template>
</template>
<script lang="ts">
import Template from '../components/dao/reviewer/Template2.vue'
import score from '../web3/scoreChecksum'
import Reviewer4Result from './Reviewer4Result.vue'

export default {
	data() {
		return {
			questions: this.questions_en,
			message: '',
			selected: -1,
			remainedTime: 30 * 60, //30 mins
			current: 0,
			total: this.questions_en.length, //1, //
			transition: false,
			showing: false,
			score: 0, // +5 for each question
			en: true,
		}
	},
	components: {
		Template,
	},
	mounted() {
		if (!this.$store.state.daoInfo) {
			this.router.push({ path: '/dao' })
			return
		}

		setInterval(() => {
			if (this.remainedTime > 0) this.remainedTime--
			if (this.remainedTime == 0) {
				this.router.push('/reviewer/intro')
			}
		}, 1000)
	},
	methods: {
		option(no) {
			this.selected == no ? (this.selected = -1) : (this.selected = no)
			if (this.selected == -1) {
				this.message = 'Please, select at least one option'
				setTimeout(() => {
					this.message = ''
				}, 1000)
			}
		},
		formatTime() {
			let mins = Math.floor(this.remainedTime / 60).toString()
			let secs = (this.remainedTime % 60).toString()
			return `${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`
		},
		next() {
			if (this.transition) return
			let sel_opt = this.questions[this.current].options[this.selected]
			if (typeof sel_opt.correct === 'boolean') {
				this.score += 5
			}
			// console.log('score.checksum()', score.checksum(this.score))
			this.transition = true
			if (this.current == this.total - 1) {
				// TODO: API backend request
				//last question
				this.web3.examResult(score.checksum(this.score))
				this.router.push(
					this.score > 80 ? '/reviewer/success' : '/reviewer/failure'
				)
				return
			}
			setTimeout(() => {
				this.transition = false
				this.showing = true
				this.selected = -1

				if (this.current < this.total - 1) {
					this.current++
				}
			}, 500)
		},
	},
}
</script>
<style scoped lang="scss">
.meta {
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: 56px;
}
.meta *::selection {
	background-color: transparent;
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
	gap: 24px;
	min-height: 384px;
	z-index: 1;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	max-width: 1120px;
}
section.review.show {
	animation: 1s ease-in-out 0s 1 slideInFromLeft;
}
section.review.hide {
	animation: 1s ease-in-out 0s 1 slideOutFromLeft;
}
.warn {
	transition: all 1s ease;
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
@keyframes slideInFromBottom {
	0% {
		transform: translateY(100%);
	}
	80% {
		opacity: 1;
	}
	100% {
		transform: translateY(0);
		opacity: 0;
	}
}
@keyframes slideInFromLeft {
	0% {
		transform: translateX(100%);
		opacity: 0;
	}
	80% {
		opacity: 1;
	}
	100% {
		transform: translateX(0);
	}
}
@keyframes slideOutFromLeft {
	0% {
		transform: translateX(0);
		opacity: 1;
	}
	60% {
		opacity: 0;
	}
	100% {
		transform: translateX(-100%);
	}
}
.warn {
	animation: 1s ease-out 0s 1 slideInFromBottom;
}
.row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.line {
	margin: 0 24px 6px 24px;
	width: 100%;
	height: 1px;
	background: #ebedef;
	align-self: center;
}
.question {
	font-size: 14px;
}
.time {
	font-weight: 700;
	font-size: 18px;
	color: #17bb7f;
}
.q {
	font-weight: 700;
	font-size: 24px;
	color: #7c72ea;
}
h3 {
	font-weight: 400;
	font-size: 15px;
	line-height: 123%;
	margin: 0;
}

h2 {
	font-weight: 600;
	font-size: 15px;
	line-height: 123%;
	margin: 0;
	text-align: left;
}
.block {
	display: grid;
	grid-template-areas: 'a b' 'c d';
	gap: 12px 35px;
	max-width: 471px;
	width: 100%;
	align-self: center;
}
.block.style2 {
	display: flex;
	flex-direction: column;
	gap: 24px;
	align-self: flex-start;
	align-items: flex-start;
	margin-top: 18px;
}

.block span::selection {
	background-color: transparent;
}
.option {
	background: #ffffff;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	display: flex;
	flex-direction: row;
	gap: 12px;
	font-weight: 600;
	font-size: 15px;
	padding: 22px 12px;
	width: 218px;
	max-height: 62px;
	cursor: pointer;
	align-items: center;
}
.block.style2 .option {
	width: auto;
	max-height: initial;
}
.block.style2 .option span:last-child {
	font-weight: normal;
}
.option.selected > span:last-child {
	background: linear-gradient(257.98deg, #aa1fff 2.42%, #2ba1ff 95.24%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
}
.option span {
	white-space: nowrap;
	// overflow-wrap: break-all;
	// white-space: wrap;
	// overflow: hidden;
	// text-overflow: ellipsis;
	// line-height: 140%;
}
.option span:last-child {
	flex: 1;
	text-align: center;
}
.en .option span:last-child {
	text-align: left;
}
.en .option {
	max-height: 92px;
}
.option span:first-child {
	text-transform: uppercase;
}
.option:first-child {
	grid-area: a;
}
.option:nth-child(2) {
	grid-area: b;
}
.option:nth-child(3) {
	grid-area: c;
}
.option:last-child {
	grid-area: d;
}
.btn {
	margin-top: 72px;
	align-self: center;
	border-radius: 8px;
	opacity: 1;
	border: 1px solid rgba(0, 0, 0, 0.2);
	padding: 12px 46px;
}
.btn.disabled {
	color: #666;
}
@media (max-width: 1024px) {
	section.review {
		max-width: calc(100vw - 2rem);
		align-self: center;
	}
	.block.style2 .option span:last-child {
		white-space: normal;
		line-height: 150%;
	}
}
@media (max-width: 532px) {
	.block {
		grid-template-areas: 'a' 'b' 'c' 'd';
		justify-content: center;
	}
}
</style>
