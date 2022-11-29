<template>
	<div
		class="modal3"
		:style="`display:${this.$store.state.setNameModal || 'none'};`"
	>
		<div class="message-container" @click="cancel">
			<div class="actual-message" @click="floatClick">
				<div class="top">
					<h2>Set The Name</h2>
					<CloseSquare @click="cancel" />
				</div>
				<div class="body">
					<p>Set the node name and invite people to join your node.</p>
					<input
						type="name"
						v-model="input"
						placeholder="Please enter a name (within 16 characters)"
						maxlength="16"
						spellcheck="false"
						@input="inputHandler"
						:class="{ error }"
					/>
					<div class="bottom">
						<div class="btn" @click="cancel">Cancel</div>
						<div
							class="btn success"
							@click="confirm"
							:class="{ disabled: error }"
						>
							Confirm
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import CloseSquare from '/src/assets/dsn/close-square.svg'
import { defineComponent } from 'vue'
export default defineComponent({
	data() {
		return {
			input: '',
			error: false,
		}
	},
	props: {
		message: String,
	},
	methods: {
		cancel() {
			this.$store.dispatch('save', {
				k: 'setNameModal',
				v: 'none',
			})
		},
		floatClick(e) {
			console.log('floatClick', this.data)
			e.stopPropagation()
		},
		async confirm(e) {
			if (!this.error) {
				//TODO: send a request
				let res = await this.web3.SetNodeName(
					this.$store.state.setNameModalSelected.no,
					this.input
				)
				console.log('confirm result', res)
				if (res) {
					await this.web3.MyDSNs((this.$store.state.myDSNPage - 1) * 8 + 1, 8)
					this.cancel()
				}
			}
			console.log('sending data…', this.name)
		},
		inputHandler() {
			this.error = !/^([a-z0-9]{1,16})$/.test(this.input)
			console.log('inputhandler', this.input)
		},
	},
	components: {
		CloseSquare,
	},
})
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
input[type='name'].error {
	color: red;
	font-weight: bold;
}
btn.disabled {
	cursor: not-allowed;
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
	font-family: 'Poppins', Arial, Helvetica, sans-serif;
}
.body {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
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
	height: 294px;
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
.modal3 {
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
@media (max-width: 550px) {
	.actual-message {
		padding: 0;

		max-width: calc(100% - 1rem);
	}
}
</style>

<style>
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
</style>
