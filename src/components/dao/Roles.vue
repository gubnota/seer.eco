<template>
	<section class="cols">
		<div class="col" v-for="(el, i) in $data.roles">
			<div class="row">
				<h3>{{ el.name }}</h3>
				<button @click="callback(el.action, i)" class="btn">
					<img :src="arrow" />
					<span>{{ el.action }}</span>
				</button>
			</div>
			<p>{{ el.text }}</p>
		</div>
	</section>
</template>
<script lang="ts">
import arrow from '/src/assets/dao/arrow-right.png'
export default {
	data() {
		return {
			arrow,
			roles: [
				{
					name: 'Reviewer',
					text: "The SEER DAO jury is the upper-level autonomous organization of SEER DAO and an important part of SEER's decentralized autonomy. Come and participate in the future construction of SEER DAO.",
					action: 'Apply',
				},
				{
					name: 'DAO Rules',
					text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
					action: 'Details',
				},
				{
					name: 'Incentive Center',
					text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
					action: 'Details',
				},
			],
		}
	},
	methods: {
		loggedIn() {
			let loggedIn = this.$store.state.daoInfo != null
			if (loggedIn)
				this.$store.dispatch('save', { k: 'walletLoading', v: false })
			return loggedIn
		},

		callback(action: String, id: number) {
			if (id == 0) {
				;(async () => {
					// check if user is logged in
					if (!this.loggedIn()) {
						this.$store.dispatch('save', { k: 'walletLoading', v: true })
						await this.web3.login()
					} else {
						this.router.push('/reviewer/conditions')
					}
				})()
			}
			// if (id == 2)
			// 	this.router.push({ path: '/reviewer/result', params: { passed: true } })
		},
	},
}
</script>
<style scoped>
section.cols {
	display: flex;
	flex-direction: row;
	margin-bottom: 21px;
}
.col {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 0 40px;
	position: relative;
}
.col::before {
	display: block;
	content: ' ';
	background: #cdd0d4;
	width: 1px;
	height: 152px;
	position: absolute;
	left: 0;
}
.col:first-child::before {
	display: none;
}
p {
	font-size: 13px;
	line-height: 153%;
}
button {
	border-radius: 10px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	padding: 12px 24px;
	align-items: center;
	justify-content: center;
	display: flex;
	flex-direction: row;
	gap: 10px;
	background: transparent;
}
button span {
	font-size: 15px;
	font-weight: 600;
}
.row {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 24px;
	justify-content: center;
}
h3 {
	font-size: 26px;
	font-weight: bold;
}
button img {
	width: 24px;
	height: 24px;
}
@media (max-width: 950px) {
	section.cols {
		flex-direction: column;
		gap: 2rem 0;
		width: 100vw;
		align-self: center;
	}
	.col {
		border-bottom: 1px #cdd0d4 solid;
		align-self: center;
		padding-bottom: 1rem;
	}
	.col:last-child {
		border-bottom: none;
	}
	.row {
		justify-content: space-between;
		padding: 0 1rem;
	}
	p {
		padding: 0 1rem;
	}
}
</style>
