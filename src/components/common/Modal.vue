<template>
	<div class="modal" :style="`display:${this.$store.state.modal};`">
		<div class="message-container" @click="bgClick">
			<div class="actual-message" @click="floatClick">
				<div v-html="msg" class="msg"></div>
				<!-- {{ this.$store ? this.$store.state.modal : '' }} -->
				<!-- <h2>{{ this.message ? this.message : this.ui._('Coming soon') }}</h2> -->
				<!-- <div class="close-button close_modal">&times;</div> -->
				<!-- <button class="close_modal">OK</button> -->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import store from '../../store'
import { defineComponent } from 'vue'
export default defineComponent({
	props: {
		message: String,
	},
	computed: {
		msg: () => {
			return store.state.comingSoon ? store.state.comingSoon.text : ''
		},
	},
	methods: {
		bgClick(e) {
			// console.log('bgClick', e.target)
			this.$store.dispatch('save', {
				k: 'modal',
				v: 'none',
			})
		},
		floatClick(e) {
			// console.log('floatClick', e.target)
			e.stopPropagation()
		},
	},
})
</script>

<style scoped>
/*--------------------- MODAL & POP-UP ----------------------*/

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

.actual-message {
	font-size: 1.5em;
	line-height: 1.5em;
	max-width: calc(100% - 1rem);
	width: 500px;
	background: white;
	padding: 20px;
	text-align: center;
	opacity: 1;
	flex: 0;
	margin-top: 0;
	position: relative;
	border-radius: 10px;
}

.modal {
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.3);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999999;
	transition: all 0.4s ease;
}

.close-button {
	position: absolute;
	top: -20px;
	right: -20px;
	color: #545454;
	background: #aa1fff;
	color: white;
	padding: 15px;
	border: 10px solid white;
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	line-height: 0;
	cursor: pointer;
	font-size: 1.5em;
}

.message-container p {
	line-height: 2em;
	font-weight: 400;
}

.message-container h2 {
	text-transform: none;
	/* margin-top: 20px; */
	font-size: 2rem;
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
.msg {
	white-space: nowrap;
	/* overflow: scroll; */
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
