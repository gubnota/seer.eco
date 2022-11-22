<template>
	<nav class="top2">
		<router-link :to="isDao ? '/' : '/'">
			<img :src="logo" alt="logo" class="logo" v-if="isDao" />
			<img src="/01head/seer.png" alt="logo" class="logo2" v-else />
		</router-link>
		<button
			@click="connect()"
			class="btn"
			:class="{ disabled: !this.window.ethereum }"
		>
			<span class="loader" v-if="loading" />
			<Wallet v-if="!loggedIn" />
			<img :src="metamask" alt="wallet" v-else />
			<span>{{
				loggedIn ? this.web3.addressPartially() : this.ui._('Connect Wallet')
			}}</span>
		</button>
	</nav>
</template>
<script lang="ts">
import logo from '/src/assets/dao/logodao.png'
import lock from '/src/assets/dao/lock.png'
import metamask from '/src/assets/dao/metamask@3x.png'
import Wallet from '/src/assets/dao/wallet.svg'
export default {
	props: {
		isDao: Boolean,
	},
	data() {
		return {
			logo,
			lock,
			metamask,
			// loading: false,
		}
	},
	mounted() {
		const updateList = () => {
			setTimeout(() => {
				this.web3.eventList()
				// window.location.reload()
				// this.$store.dispatch('save', { k: 'eventsTab', v: 0 })
				// this.$store.dispatch('save', { k: 'eventsPage', v: 1 })
			}, 1000)
		}
		this.web3.onLogin = updateList
		this.web3.onLogout = updateList
	},
	beforeUnmount() {
		this.web3.onLogin = null
		this.web3.onLogout = null
	},

	computed: {
		loading() {
			return this.$store.state.walletLoading || false
		},
		loggedIn() {
			let loggedIn = this.$store.state.daoInfo != null
			if (loggedIn)
				this.$store.dispatch('save', { k: 'walletLoading', v: false })
			return loggedIn
		},
	},
	methods: {
		async connect() {
			if (this.$store.state.walletLoading) return
			if (this.loggedIn) {
				// window.location.reload()
				this.web3.logout()
			} else {
				this.$store.dispatch('save', { k: 'walletLoading', v: true })
				setTimeout(() => {
					if (this.$store.state.walletLoading)
						this.$store.dispatch('save', { k: 'walletLoading', v: false })
				}, 5000)
				await this.web3.onLogin(() => {
					// this.$store.dispatch('unset', ['eventList'])
				})
				await this.web3.login()

				// setTimeout(() => {
				// 	window.location.reload()
				// }, 3000)
			}
		},
	},
	components: {
		Wallet,
	},
}
</script>
<style scoped>
nav.top2 {
	z-index: 1;
	margin: 15px 0 0 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
button {
	background-color: transparent;
	border: none;
	width: 194px;
	height: 42px;
	border-radius: 10px 10px 10px 10px;
	opacity: 1;
	border: 1px solid rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center; /*vertically*/
	justify-content: center; /* horizontally*/
	position: relative;
}
button img {
	width: 18px;
	height: 18px;
}
button span {
	font-size: 15px;
	font-weight: 600;
}
.logo {
	width: 174px;
	height: 32px;
}
.logo2 {
	width: 117px;
}
@media (max-width: 1140px) {
	nav.top2 {
		padding: 0 1rem;
	}
}
@media (max-width: 550px) {
	nav.top2 {
		flex-direction: row;
		width: 100%;
		align-self: center;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		width: calc(50vw - 3rem);
		height: auto;
	}
	button.btn {
		width: calc(50vw - 1rem);
		gap: 4px;
		height: 32px;
	}
}

.loader {
	width: 24px;
	height: 24px;
	border: 2px solid #999;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
	position: absolute;
	left: 4px;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.top2 .btn svg {
	fill: black;
}
.top2 .btn:hover {
	color: white;
	background: linear-gradient(96.45deg, #346dff 0%, #aa1fff 100%);
}
.top2 .btn:hover svg {
	fill: white;
}
</style>
