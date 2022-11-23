<template>
	<div
		class="modal2"
		:style="`display:${this.$store.state.operateModal || 'none'};`"
	>
		<div class="message-container" @click="cancel">
			<div class="actual-message" @click="floatClick">
				<div class="top">
					<h2>Reward</h2>
					<CloseSquare @click="cancel" />
				</div>
				<div class="body">
					<div class="row">
						<span>Type</span>
						<span>Extractable</span>
						<span>Extracted</span>
						<span>&nbsp;</span>
					</div>
					<div class="row item" v-for="el in rewards">
						<span>{{ el.token }}</span>
						<span>{{ format(el.unGot) }}</span>
						<span>{{ format(el.got) }}</span>
						<span
							><div
								class="btn success"
								@click="claim(el)"
								:class="{ disabled: !(el.unGot > el.minAmount) }"
							>
								claim
							</div></span
						>
					</div>

					<h2>Reward</h2>
					<p>Set the node name and invite people to join your node.</p>
					<div class="copyfield" @click="copy">
						<span>{{ `https://to.seer.eco/?n=${node || ''}` }}</span>
						<div class="btn">Copy</div>
					</div>
					<div class="bottom">
						<div class="btn" @click="cancel">Cancel</div>
						<div class="btn success" @click="cancel">Confirm</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import CloseSquare from '/src/assets/dsn/close-square.svg'
import { formatNumber, getFQN, copyToClipboard } from '../../common/helper'
export default {
	data() {
		return {
			name: '',
		}
	},
	props: {
		message: String,
	},
	computed: {
		node() {
			let a = this.$store.state.Rewards
			if (!a) return ''
			return a.node
		},
		rewards() {
			let a = this.$store.state.Rewards
			if (!a) return []
			return a.data
		},
	},
	methods: {
		format(n) {
			return formatNumber(n)
		},
		async claim(el) {
			// TODO: make a request to backend
			console.log('claim…', el)
			if (el.unGot > el.minAmount) {
				await this.web3.Withdraw(getFQN(this.node), el.token)
				// if (res) {
				await this.web3.Rewards(this.node)
				// }
			}
		},
		cancel(e) {
			console.log('bgClick', e.target)
			this.$store.dispatch('save', {
				k: 'operateModal',
				v: 'none',
			})
		},
		floatClick(e) {
			// console.log('floatClick', e.target)
			e.stopPropagation()
		},
		confirm(e) {
			// TODO: make a request to backend
			// console.log('sending data…', this.name)
		},
		copy(e) {
			e.stopPropagation()
			// TODO: copy write value
			copyToClipboard(
				`https://to.seer.eco/?n=${this.$store.state.Rewards.node || ''}`
			)
				// navigator.clipboard
				// 	.writeText(
				// 		`https://to.seer.eco/?n=${this.$store.state.Rewards.node || ''}`
				// 	)
				.then(
					() => {
						this.comingSoon({
							timeout: 500,
							text: `<b class="rainbow">copied!</b>`,
						})

						/* clipboard successfully set */
					},
					() => {
						/* clipboard write failed */
					}
				)
			// copy2('This is some cool text')
		},
	},
	components: {
		CloseSquare,
	},
}
</script>

<style scoped>
/*--------------------- MODAL & POP-UP ----------------------*/
svg {
	cursor: pointer;
}
input[type='name'] {
	border: none;
	padding: 14px 10px;
	background: #e3e5e8;
	border-radius: 8px;
	/* color: #606771; */
	font-size: 13px;
	margin: 0 16px;
}
input[type='name']::placeholder {
	font-size: 13px;
	color: #606771;
}
.message-container {
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: Arial, Helvetica, sans-serif;
}
.body {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	background: white;
	border-radius: 0 0 8px 8px;
}
.row {
	height: 66px;
	align-items: center;
	/* justify-content: space-between; */
	padding: 0 16px 0 24px;
	gap: 60px;
}
.row.item {
	border-bottom: 1px solid #e3e5e8;
	font-weight: 500;
}
.row.item > span:last-child {
	margin-left: 36px;
}
.row.item > span:nth-child(3) {
	color: #acacac;
}
.copyfield {
	margin: 0 16px;
	display: flex;
	flex-direction: row;
	padding: 10px;
	gap: 10px;
	font-size: 13px;
	color: #606771;
	background: #e3e5e8;
	border-radius: 8px;
	justify-content: space-between;
	align-items: center;
}
.btn.disabled {
	cursor: not-allowed;
}
.row .btn,
.copyfield .btn {
	padding: 9.5px 18.5px;
	font-size: 13px;
	color: white;
	background: #17bb7f;
}
.row .btn {
	padding: 9.5px 19px;
}
.row > span:nth-child(3) {
}
.body h2 {
	text-align: left;
	margin: 0 27px;
}
.top {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 20px 24px;
	gap: 18px;
	width: 100%;
}
.bottom {
	display: flex;
	height: 68px;
	flex-direction: row;
	background-color: #ebedef;
	justify-self: flex-end;
	border-radius: 0 0 8px 8px;
	padding: 14px 16px;
	gap: 8px;
	justify-content: flex-end;
	align-items: center;
}
.btn {
	background: #6c747f;
	border-radius: 4px;
	padding: 12px 24px;
	color: white;
}
.btn.success {
	background-color: #17bb7f;
}
.actual-message {
	font-size: 15px;
	width: 498px;
	height: 540px;
	background: white;
	text-align: center;
	opacity: 1;
	margin-top: 0;
	position: relative;
	box-shadow: 6px 6px 32px rgba(0, 0, 0, 0.25);
	border-radius: 8px;
	/* border-radius: 10px; */
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: space-between;
}
.modal2 {
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.3);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999999;
	transition: all 0.4s ease;
}

.message-container p {
	font-weight: 400;
	font-size: 15px;
	line-height: 24px;
	padding: 0 27px;
	align-self: flex-start;
	width: 343px;
	text-align: left;
}

.message-container h2 {
	text-transform: none;
	/* margin-top: 20px; */
	font-size: 17px;
}

.message-container .free {
	color: #aa1fff;
	font-size: 2rem;
	font-weight: bold;
}

.message-container .link-button-dark {
	margin-bottom: 0;
}
/* .message-container button {
	cursor: pointer;
	border: none;
	margin-top: 3rem;
	background-color: #AA1FFF;
	color: white;
	font-size: 1rem;
	border-radius: 8px;
	padding: 0.8rem 1.4rem;
} */
@media (max-width: 1023px) {
	.actual-message {
		padding: 10px;
		max-width: calc(100% - 10rem);
		min-width: 320px;
	}
	.message-container .actual-message h2 {
		font-size: 1.5rem;
	}
}
</style>

<style scoped>
.message-container a {
	font-weight: 600;
	line-height: 29px;
	background: linear-gradient(245deg, #aa1fff 0%, #2ba1ff 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	text-decoration: none;
}
.message-container b,
.message-container strong {
	font-weight: bold;
}
h2 {
	font-size: 2rem;
}
@media (max-width: 550px) {
	.actual-message {
		padding: 0;
		max-width: calc(100% - 1rem);
	}
	.row {
		height: auto;
		padding: 0;
		gap: 1rem;
		margin: 0 1rem;
	}
	.row.item {
		justify-content: space-around;
		margin: 0;
		padding: 0 0 10px 0;
	}
}
</style>
