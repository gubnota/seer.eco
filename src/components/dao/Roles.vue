<template>
	<section class="cols">
		<div class="col" v-for="(el, i) in $data.roles">
			<div class="row">
				<h3>{{ el.name }}</h3>
				<button @click="callback(el.action, i)" class="btn">
					<ArrowRight />
					<span>{{ el.action }}</span>
				</button>
			</div>
			<p>{{ el.text }}</p>
		</div>
	</section>
</template>
<script lang="ts">
// import arrow from '/src/assets/dao/arrow-right.png'
import ArrowRight from '/src/assets/dao/arrow-right.svg'

export default {
	data() {
		return {
			roles: [
				{
					name: 'DAO Application',
					text: "The SEER DAO jury is the upper-level autonomous organization of SEER DAO and an important part of SEER's decentralized autonomy. Come and participate in the future construction of SEER DAO.",
					action: 'Apply',
				},
				{
					name: 'DAO Rules',
					text: 'The rules determine the rights and obligations of the SEER DAO jury, so as to ensure the fairness and impartiality of proposal voting and the stable operation of the project.',
					action: 'Details',
				},
				{
					name: 'DAO reward',
					text: 'The incentive center has given the SEER DAO jury a corresponding amount of rewards and remuneration to realize the governance structure of the community of interests.',
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
			if (id == 1) {
				this.router.push('/seer_dao.html')
				this.$store.dispatch('save', { k: 'daoRulesVisited', v: true })
			}
			if (id == 2) {
				if (!this.loggedIn()) this.web3.login()
				this.router.push('/incentive-center')
			}
		},
	},
	components: { ArrowRight },
}
</script>
<style scoped>
svg {
	stroke: #000;
}
.btn:hover svg {
	stroke: #fff;
}
section.cols {
	display: flex;
	flex-direction: row;
	margin-bottom: 21px;
	max-width: calc(100vw - 2rem);
	align-self: center;
}
.col {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 0 40px;
	position: relative;
}
.col:first-child {
	padding: 0 40px 0 0;
}
.col:last-child {
	padding: 0 0 0 40px;
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
	padding: 12px 32px;
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
	justify-content: space-between;
}
h3 {
	font-size: 26px;
	font-weight: bold;
}
button img {
	width: 24px;
	height: 24px;
}
@media (max-width: 1120px) {
	section.cols {
		flex-direction: column;
		gap: 2rem 0;
		width: 100vw;
		align-self: center;
	}
	.col::before {
		display: none;
	}
	.col:last-child,
	.col:first-child,
	.col {
		padding: 0;
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
@media (max-width: 550px) {
	.col {
		padding: 0 6px;
		width: calc(100% - 12px);
	}
	h3 {
		font-size: 14px;
	}
	button {
		padding: 6px 12px;
	}
}

.btn:hover {
	color: white;
	background: linear-gradient(96.45deg, #346dff 0%, #aa1fff 100%);
}
</style>
