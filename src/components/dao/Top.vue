<template>
	<ChooseConnect />
	<nav class="top2">
		<router-link :to="this.calcLink">
			<img :src="logoMobile" alt="logo" class="logo mobile" />
			<img :src="logo" alt="logo" class="logo desktop" v-if="isDao" />
			<img
				src="/01head/seer.dsn.png"
				alt="logo"
				class="logo desktop"
				v-else-if="isDsn"
			/>
			<img src="/01head/seer.png" alt="logo" class="logo2 desktop" v-else />
		</router-link>
		<div class="r">
			<button v-if="isDsn" @click="myDsn" class="btn fsq">
				<Foursquare class="foursquare" />
				<span>My DSN</span>
			</button>

			<button @click="connect()" class="btn">
				<!--  :class="{ disabled: !this.window.ethereum }" -->
				<span class="loader" v-if="loading" />
				<Wallet v-if="!loggedIn" />
				<img :src="metamask" alt="wallet" v-else />
				<span>{{
					loggedIn ? this.web3.addressPartially() : this.ui._('Connect Wallet')
				}}</span>
			</button>
		</div>
	</nav>
</template>
<script lang="ts">
import logo from '/src/assets/dao/logodao.png'
import lock from '/src/assets/dao/lock.png'
import metamask from '/src/assets/dao/metamask@3x.png'
import Wallet from '/src/assets/dao/wallet.svg'
import Foursquare from '/src/assets/dsn/foursquare.svg'
import logoMobile from '/src/assets/dao/logo.png'
import { defineComponent } from 'vue'
import ChooseConnect from '../common/ChooseConnect.vue'
declare const window: any
export default defineComponent({
	props: {
		isDao: Boolean,
		isDsn: Boolean,
	},
	data() {
		return {
			logo,
			lock,
			metamask,
			logoMobile,
			// loading: false,
		}
	},
	mounted() {
		const updateList = () => {
			setTimeout(() => {
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
		calcLink() {
			if (this.$route.path.includes('/reviewer/')) return '/dao'
			if (['/incentive-center'].find((a) => a === this.$route.path))
				return '/dao'
			if (this.$route.path === '/my_dsn') return '/dsn'
			if (this.$route.path === '/pay') return '/dsn'
			return '/'
		},
		loading() {
			return this.$store.state.walletLoading || false
		},
		loggedIn() {
			let loggedIn = !!this.$store.state.address
			let seerToken = !!this.$store.state.seerToken
			if (loggedIn && seerToken)
				this.$store.dispatch('save', { k: 'walletLoading', v: false })
			return loggedIn && seerToken
		},
	},
	methods: {
		myDsn() {
			if (!this.$store.state.address) {
				this.web3.chooseConnect()
				return
				// return this.popup({
				// 	text: 'Please connect to your wallet account first',
				// 	timeout: 3000,
				// })
			}
			// this.popup({ text: 'not implemented' })
			this.router.push('/my_dsn')
		},

		async connect() {
			if (this.$store.state.walletLoading) return
			if (this.loggedIn) {
				// window.location.reload()
				this.web3.logout()
			} else {
				// this.$store.dispatch('save', { k: 'walletLoading', v: true })
				// setTimeout(() => {
				// if (this.$store.state.walletLoading)
				// this.$store.dispatch('save', { k: 'walletLoading', v: false })
				// }, 5000)
				await this.web3.onLogin(() => {
					// this.$store.dispatch('unset', ['eventList'])
				})

				if (window.ethereum) {
					//choose between Metamask Wallet connect
					this.$store.dispatch('save', {
						k: 'chooseConnect',
						v: 'block',
					})
					return
				} else {
					this.web3.walletconnect()
					return
				}
				// const loginRes = await this.web3.login()
				// // console.log('loginRes', loginRes)
				// // if (!loginRes)
				// this.$store.dispatch('save', { k: 'walletLoading', v: false })
				// setTimeout(() => {
				// 	window.location.reload()
				// }, 3000)
			}
		},
	},
	components: {
		Wallet,
		Foursquare,
		ChooseConnect,
	},
})
</script>
<style scoped>
img.logo.mobile {
	display: none;
	width: 32px;
	height: 32px;
}
.r {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 18px;
}
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
button.fsq {
	width: 134px;
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
	img.logo.mobile {
		display: block;
	}
	.desktop {
		display: none;
	}
}
@media (max-width: 570px) {
	.r {
		/* flex-direction: column-reverse; */
		align-items: flex-end;
	}
}
@media (max-width: 550px) {
	nav.top2 {
		flex-direction: row;
		width: 100%;
		align-self: center;
		justify-content: space-between;
		align-items: flex-start;
	}

	.logo {
		width: calc(50vw - 3rem);
		height: auto;
	}
	button.btn {
		width: auto;
		/* width: calc(50vw - 1rem); */
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
<style>
.top2 .btn.fsq svg rect {
	fill: #741fff;
}
.top2 .btn.fsq:hover svg rect {
	fill: #ffffff;
}
</style>
