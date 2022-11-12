<template>
	<Template>
		<main class="meta">
			<section class="incentive">
				<nav class="actions">
					<div :class="{ selected: firstTab }" @click="setTab(0)">
						Incentive Center
					</div>
					<div :class="{ selected: !firstTab }" @click="setTab(1)">
						Reward Details
					</div>
				</nav>
				<IncentiveCenter v-if="firstTab" />
				<RewardDetails v-else />
			</section>
			<aside class="warn">&nbsp;</aside>
		</main>
	</Template>
</template>
<script lang="ts">
import Template from '../components/dao/reviewer/Template2.vue'
import IncentiveCenter from '../components/incentives/IncentiveCenter.vue'
import RewardDetails from '../components/incentives/RewardDetails.vue'

export default {
	components: { Template, IncentiveCenter, RewardDetails },
	computed: {
		firstTab() {
			let a = this.$store.state.currentTab
			if (a) {
				return a == 0 || a == '0'
			}
			return true
		},
	},
	mounted() {
		let s = this.$store.state
		if (!this.$store.state.daoInfo)
			this.comingSoon({
				text: `<p>Please, go to <a href="//app.seer.eco" target=_blank>app.seer.eco</a> and register an account first</p>`,
				timeout: 5000,
			})
		else if (this.$store.state.daoInfo && !this.$store.state.daoInfo.isDao) {
			this.comingSoon({
				text: `<p>Please, go to <a href="/#/reviewer/conditions">/reviewer/conditions</a> and become a DAO reviewer</p>`,
				timeout: 5000,
			})
		}
	},
	methods: {
		setTab(no) {
			this.$store.dispatch('save', { k: 'currentTab', v: no })
		},
	},
}
</script>
<style scoped>
.meta {
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: 56px;
}
section.incentive {
	display: flex;
	flex-direction: column;
	margin: 90px 0 90px 0;
	background: #ffffff;
	border-radius: 8px 8px 0px 0px;
	/* height: 30vh; */
	align-items: stretch;
	padding: 26px 24px;
	gap: 38px;
	min-height: 384px;
	z-index: 1;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	max-width: 1120px;
	color: #1f2226;
}
section.incentive *::selection {
	background-color: transparent;
}
nav.actions {
	background: #ebedef;
	border-radius: 8px;
	width: 276px;
	height: 39px;
	align-items: center;
	display: flex;
	flex-direction: row;
	gap: 0;
	font-size: 13px;
}
nav.actions > div {
	cursor: pointer;
	/* flex: 1; */
	text-align: center;
	padding: 12px 6px;
	font-weight: 600;
	color: #6c747f;
	width: 142px;
}
nav.actions > div.selected {
	background: linear-gradient(257.98deg, #aa1fff 2.42%, #2ba1ff 95.24%);
	border-radius: 8px;
	color: #ffffff;
}
.warn {
	display: none;
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
@media (max-width: 1120px) {
	section.incentive {
		width: calc(100vw - 20px);
		align-self: center;
	}
}
</style>
