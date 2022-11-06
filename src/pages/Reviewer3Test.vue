<template>
	<Template>
		<main class="meta">
			<section class="review">
				<div class="row">
					<div class="key question">
						<span class="q">Q{{ current }}</span
						>&nbsp;/&nbsp;{{ total }}
					</div>
					<div class="val time">{{ this.formatTime() }}</div>
				</div>
				<h3>Single Choice</h3>
				<div class="line"></div>
				<h2>
					The first year of SEER's DAO is the story of which famous hero
					founded？
				</h2>
				<div class="block">
					<div
						class="option"
						@click="option(1)"
						:class="{ selected: selected == 1 }"
					>
						<span>A</span> <span>Option 1Option 1Option 1Option 1Option 1</span>
					</div>
					<div
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
					</div>
				</div>
				<div class="btn">Next Question</div>
			</section>
			<aside class="warn" v-if="this.message">{{ this.message }}</aside>
		</main>
	</Template>
</template>
<script lang="ts">
import Template from '../components/dao/reviewer/template.vue'
export default {
	data() {
		return {
			message: '',
			selected: -1,
			remainedTime: 30 * 60, //30 mins
			current: 1,
			total: 20,
		}
	},
	components: {
		Template,
	},
	mounted() {
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
		},
		formatTime() {
			let mins = Math.floor(this.remainedTime / 60).toString()
			let secs = (this.remainedTime % 60).toString()
			return `${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`
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
.warn {
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
}
.option.selected > span:last-child {
	background: linear-gradient(257.98deg, #aa1fff 2.42%, #2ba1ff 95.24%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
}
.option span {
	overflow-wrap: break-all;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.option span:last-child {
	flex: 1;
	text-align: center;
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
</style>
