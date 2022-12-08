<template>
	<Template>
		<div class="meta">
			<BackButton />
			<section class="review">
				<h1>DAO Reviewer</h1>
				<h2>Together to achieve SEER DAO community</h2>
				<div class="line"></div>
				<div class="block">
					<h3>Application conditions</h3>
					<!-- <div class="row"><div class="line"></div></div> -->
					<div class="row" v-for="el in conds">
						<div class="key">
							<span>
								<nft_calendar v-if="el.icon == 'nft_calendar'" />
								<twitter v-if="el.icon == 'twitter'" />
								<figures v-if="el.icon == 'figures'" />
								<medal_star v-if="el.icon == 'medal_star'" />
							</span>
							<span>{{ ui(el.name) }}</span>
						</div>
						<div class="val">
							<passed v-if="getStatus[el.action]" />
							<div class="btn" v-else @click="callback(el.action)">
								<arrow_right /> <span>{{ el.actionText }}</span>
							</div>
						</div>
					</div>
				</div>
			</section>
			<aside class="conditions_unmet" v-if="unmet">
				<span>Please meet all the above conditions first</span>
			</aside>
		</div>
	</Template>
</template>
<script lang="ts">
import Template from '../components/dao/reviewer/Template2.vue'
import passed from '/src/assets/reviewer/passed.svg'
import nft_calendar from '/src/assets/reviewer/nft_calendar.svg'
import twitter from '/src/assets/reviewer/twitter.svg'
import figures from '/src/assets/reviewer/figures.svg'
import medal_star from '/src/assets/reviewer/medal_star.svg'
import arrow_right from '/src/assets/reviewer/arrow-right.svg'
import BackButton from '../components/dao/BackButton.vue'
export default {
	data() {
		return {
			s: this.$store.state,
			// unmet: true,
			conds: [
				{
					name: 'DSN duration > 30 days',
					icon: 'nft_calendar',
					actionText: 'Approve',
					// passed: this.getStatus('nft'),
					action: 'nft',
				},
				{
					name: 'Certified by twitter',
					icon: 'twitter',
					actionText: 'Approve',
					// passed: this.getStatus('twitter'),
					action: 'twitter',
				},
				{
					name: 'Understand the relevant specifications of SEER DAO',
					icon: 'figures',
					actionText: 'Learn',
					// passed: this.getStatus('learn'),
					action: 'learn',
				},
				{
					name: 'Pass the Review Rules Competency Exam',
					icon: 'medal_star',
					actionText: 'Test',
					// passed: this.getStatus('test'),
					action: 'test',
				},
			],
		}
	},
	computed: {
		unmet() {
			if (!this.$store.state.daoInfo) return false
			return !this.$store.state.daoInfo.isDao
		},

		getStatus() {
			let d = this.$store.state.daoInfo
			if (!d)
				return {
					nft: false,
					twitter: false,
					learn: false,
					test: false,
				}
			if (d.isDao)
				return {
					nft: true,
					twitter: true,
					learn: true,
					test: true,
				}

			return {
				nft: d.steps.holdDSN,
				twitter: d.steps.twitter,
				learn: (this.$store.state.daoRulesVisited || {}).hasOwnProperty(
					this.$store.state.address || 'empty'
				),
			}
		},
	},
	mounted() {
		if (!this.loggedIn()) {
			this.router.push('/dao')
			// this.web3.login()
		}
		if (this.$store.state.daoInfo) this.unmet = !this.$store.state.daoInfo.isDao
		// ;(async () => {
		// 	if (!this.$store.state.address) await this.web3.login()
		// 	// setTimeout(() => {
		// 	// }, 1000)
		// })()
	},
	methods: {
		ui(name) {
			if (name.includes('DSN') && this.$store.state.daoInfo)
				return `DSN duration > ${this.$store.state.daoInfo.configs.dsnHoldDay} days`
			return name
		},
		loggedIn() {
			let loggedIn = this.$store.state.daoInfo != null
			if (loggedIn)
				this.$store.dispatch('save', { k: 'walletLoading', v: false })
			return loggedIn
		},
		async callback(e) {
			if (!this.$store.state.daoInfo) {
				this.popup({
					text: `<p>Please, go to <a href="//app.seer.eco" target=_blank>app.seer.eco</a> and register an account first</p>`,
					timeout: 5000,
				})
				return
			}
			// console.log('callback', e)
			if (e == 'twitter') {
				let link = await this.web3.PreTwitter()
				window.open(link, '_blank')
			}
			if (e == 'learn') {
				let daoRulesVisitedList = {}
				daoRulesVisitedList[this.$store.state.address || 'empty'] = true
				Object.assign(daoRulesVisitedList, this.$store.state.daoRulesVisited)
				this.$store.dispatch('save', {
					k: 'daoRulesVisited',
					v: daoRulesVisitedList,
				})
				this.router.push('/seer_dao.html')
			}
			if (e == 'test') {
				if (this.$store.state.daoInfo.steps.holdDSN == false) {
					this.popup({
						text: `<span>Please, fulfill the requirement of <b class="rainbow">NFT duration</b> > ${
							this.$store.state.daoInfo.configs.dsnHoldDay ?? 0
						} days</span>`,
						timeout: 5000,
					})
				} else if (this.$store.state.daoInfo.steps.twitter == false) {
					this.popup({
						text: `<span>Please, verify with the <b class="rainbow">Twitter</b> first</span>`,
						timeout: 5000,
					})
				} else if (!this.$store.state.daoRulesVisited) {
					this.popup({
						text: `<span>Please, read carefully <b class="rainbow">DAO rules</b></span>`,
						timeout: 5000,
					})
				} else {
					this.router.push({ path: '/reviewer/intro' })
				}
			}
		},
	},
	components: {
		Template,
		passed,
		nft_calendar,
		twitter,
		figures,
		medal_star,
		arrow_right,
		BackButton,
	},
}
</script>

<style scoped>
.meta {
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: 21px;
}

h1 {
	font-size: 32px;
	font-weight: 600;
	color: #1f2226;
}
h2 {
	font-size: 15px;
	font-weight: 400;
	color: #3a4048;
	text-align: left;
}
h3 {
	font-size: 18px;
	font-weight: 600;
	color: #3a4048;
	text-align: center;
}
.line {
	/* width: 458px; */
	margin: 0 24px;
	width: 100%;
	height: 1px;
	background: #ebedef;
	align-self: center;
}

.row .line {
	margin: 0;
}
section.review {
	display: flex;
	flex-direction: column;
	margin: 61px 0 0 0;
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
.block {
	margin-top: 40px;
	max-width: 506px;
	width: 100%;
	align-self: center;
	/* background-color: aqua; */
	padding: 24px;
	align-items: center;
	justify-content: flex-start;
	gap: 24px;
	display: flex;
	flex-direction: column;
}
.row {
	flex-direction: row;
	display: flex;
	gap: 8px;
	height: 56px;
	align-items: center;
	justify-content: space-between;
	max-width: 458px;
	/* background-color: #3a4048; */
	border-bottom: 1px solid #ebedef;
	width: 100%;
	padding-bottom: 14px;
}
.key {
	flex-direction: row;
	display: flex;
	gap: 8px;
	justify-self: flex-start;
	align-items: center;
	font-size: 13px;
	font-weight: 600;
	line-height: 123%;
}
.val {
	justify-self: flex-end;
}
.btn {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	gap: 8px;
	width: 113px;
	height: 32px;
	border-radius: 8px;
	opacity: 1;
	border: 1px solid rgba(0, 0, 0, 0.2);
	padding: 0 16px;
	font-size: 13px;
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
}
@media (max-width: 550px) {
	section.review {
		width: calc(100% - 2rem);
		align-self: center;
		/* margin: 141px 0 0 0; */
	}
}
</style>
