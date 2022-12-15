<template>
	<div
		class="chooseConnect"
		:style="`display:${this.$store.state.chooseConnect};`"
	>
		<div class="lightbox" @click="bgClick">
			<div class="container">
				<div class="card" @click="floatClick">
					<div class="wrapper">
						<div class="card-container btn" @click="connect(1)">
							<div class="icon">
								<Metamask />
							</div>
							<div class="name">MetaMask</div>
							<div class="description">Connect to your MetaMask Wallet</div>
						</div>
					</div>
					<div class="wrapper">
						<div class="card-container btn" @click="connect(2)">
							<div class="icon">
								<Walletconnect class="wc" />
							</div>
							<div class="name">Walletconnect</div>
							<div class="description">Scan with WalletConnect to connect</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import store from '../../store'
import { defineComponent } from 'vue'
import Metamask from '/src/assets/ui/metamask.svg'
import Walletconnect from '/src/assets/ui/walletconnect.svg'

export default defineComponent({
	data() {
		return {}
	},
	methods: {
		async connect(choice: number) {
			var loginRes
			this.$store.dispatch('save', { k: 'walletLoading', v: false })
			switch (choice) {
				case 1: //Metamask
					this.$store.dispatch('save', {
						k: 'isMetamask',
						v: true,
					})
					this.$store.dispatch('save', { k: 'loading', v: true })
					this.$store.dispatch('save', { k: 'chooseConnect', v: 'none' })

					loginRes = await this.web3.login()
					console.log('loginRes', loginRes)
					// if (!loginRes)
					break

				default: // WalletConnect
					this.$store.dispatch('save', {
						k: 'isMetamask',
						v: false,
					})
					loginRes = await this.web3.login(true)
					console.log('loginRes', loginRes)
					// this.web3.walletconnect()
					break
			}
			this.$store.dispatch('save', {
				k: 'chooseConnect',
				v: 'none',
			})
		},
		bgClick(e) {
			console.log('bgClick')
			this.$store.dispatch('save', {
				k: 'chooseConnect',
				v: 'none',
			})
			this.$store.dispatch('save', { k: 'walletLoading', v: false })
		},
		floatClick(e) {
			e.stopPropagation()
		},
	},
	components: { Metamask, Walletconnect },
})
</script>
<style scoped>
.chooseConnect {
	z-index: 500;
}
svg {
	width: 45px;
	height: 45px;
}
svg.wc {
	background: #006fff;
	border-radius: 50%;
}
.wrapper:hover .card-container {
	background-color: rgba(195, 195, 195, 0.14);
}

.chooseConnect * {
	box-sizing: border-box !important;
}
.lightbox {
	transition: opacity 0.1s ease-in-out 0s;
	text-align: center;
	position: fixed;
	width: 100vw;
	height: 100vh;
	margin-left: -50vw;
	top: 0px;
	left: 50%;
	z-index: 2;
	will-change: opacity;
	background-color: rgba(0, 0, 0, 0.4);
	opacity: 1;
	visibility: visible;
	pointer-events: auto;
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	align-items: center;
}
.container {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 15px;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	opacity: 1;
	visibility: visible;
	pointer-events: auto;
}
.card {
	position: relative;
	width: 100%;
	background-color: rgb(255, 255, 255);
	border-radius: 12px;
	margin: 10px;
	padding: 0px;
	opacity: 1;
	visibility: visible;
	pointer-events: auto;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	max-width: 800px;
	min-width: fit-content;
	max-height: 100%;
	overflow: auto;
}
.wrapper {
	width: 100%;
	padding: 8px;
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	align-items: center;
	flex-direction: column;
	cursor: pointer;
	border-radius: 0px;
	border: 1px solid rgba(195, 195, 195, 0.14);
}
.card-container {
	transition: background-color 0.2s ease-in-out 0s;
	width: 100%;
	display: flex;
	flex-direction: column;
	-webkit-box-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	align-items: center;
	background-color: rgb(255, 255, 255);
	border-radius: 12px;
	padding: 24px 16px;
}
.icon {
	width: 45px;
	height: 45px;
	display: flex;
	border-radius: 50%;
	overflow: visible;
	box-shadow: none;
	-webkit-box-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	align-items: center;
}
.name {
	width: 100%;
	font-size: 24px;
	font-weight: 700;
	margin-top: 0.5em;
	color: rgb(12, 12, 13);
}
.description {
	width: 100%;
	font-size: 18px;
	margin: 0.333em 0px;
	color: rgb(169, 169, 188);
}
@media (max-width: 1130px) {
	.card {
		grid-template-columns: auto;
	}
}
</style>
