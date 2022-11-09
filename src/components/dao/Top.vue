<template>
	<nav class="top2">
		<router-link to="/dao">
			<img :src="logo" alt="logo" class="logo" />
		</router-link>
		<button
			@click="connect()"
			class="btn"
			:class="{ disabled: !this.window.ethereum }"
		>
			<span class="loader" v-if="loading()" />
			<img :src="loggedIn() ? metamask : lock" alt="wallet" />
			<span>{{
				loggedIn() ? this.web3.addressPartially() : this.ui._('Connect Wallet')
			}}</span>
		</button>
	</nav>
</template>
<script lang="ts">
import logo from '/src/assets/dao/logodao.png'
import lock from '/src/assets/dao/lock.png'
import metamask from '/src/assets/dao/metamask@3x.png'
export default {
	data() {
		return {
			logo,
			lock,
			metamask,
			// loading: false,
		}
	},
	mounted() {
		this.web3.eventList()
	},
	methods: {
		loggedIn() {
			let loggedIn = this.$store.state.daoInfo != null
			if (loggedIn)
				this.$store.dispatch('save', { k: 'walletLoading', v: false })
			return loggedIn
		},
		loading() {
			return this.$store.state.walletLoading || false
		},
		async connect() {
			if (this.loggedIn()) {
				// window.location.reload()
				this.$store.dispatch('save', { k: 'daoInfo', v: null })
				return
			} else {
				this.$store.dispatch('save', { k: 'walletLoading', v: true })
				setTimeout(() => {
					if (this.$store.state.walletLoading)
						this.$store.dispatch('save', { k: 'walletLoading', v: false })
				}, 5000)
				await this.web3.login()
				// await this.web3.connect()
				// // setTimeout(async () => {
				// await this.web3.info()
				// // setTimeout(async () => {
				// await this.web3.ticketsNumber()
				// await this.web3.eventList()
				// }, 1000)
				// }, 1000)
			}
		},
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
@media (max-width: 1140px) {
	nav.top2 {
		padding: 0 1rem;
	}
}

@media (max-width: 405px) {
	nav.top2 {
		flex-direction: column;
		gap: 1rem;
	}
}

.loader {
	width: 24px;
	height: 24px;
	border: 5px solid #999;
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
</style>
