<template>
	<Modal />
	<Loading v-if="this.$store.state.loading" />
	<div class="content">
		<main class="dsn">
			<section class="main">
				<Top :isDsn="true" />
			</section>
		</main>
		<section class="wrapper">
			<section>
				<main class="l">
					<h2>Confirm your order</h2>
					<h3>Invitation code</h3>
					<p>
						If you have invite codes, you can use them to get discounts on
						purchases.
					</p>
					<form spellcheck="false">
						<input
							type="text"
							name="coupon"
							id="coupon"
							placeholder="Enter invitation code"
							v-model="coupon"
							maxlength="6"
							autocomplete="off"
							@input="couponHandler"
							:class="{ error: couponError }"
						/>
						<h4>Enter the Quantity</h4>
						<input
							type="text"
							name="qty"
							id="qty"
							placeholder="Please input quantity"
							v-model="qty"
							autocomplete="off"
							@input="qtyHandler"
							:class="{ error: qtyError }"
						/>
						<h4 class="red" v-if="this.errorMessage">
							{{ this.errorMessage }}
						</h4>
					</form>
				</main>
				<action
					class="back btn"
					@click="
						() => {
							this.router.push('/dsn')
						}
					"
				>
					<Arrow /><span>Back</span>
				</action>
			</section>
			<section>
				<main class="r">
					<h2>SEER Digital Residency ID</h2>
					<box class="a">
						<div class="row">
							<span>original price</span>
							<span
								>{{ formatNumber(this.quantity * this.unitPrice) }} Usdt</span
							>
						</div>
						<div class="row">
							<span>Discount</span>
							<span>{{ formatNumber(discount) }} Usdt</span>
						</div>
					</box>
					<box class="b">
						<div class="row">
							<span>&nbsp;</span>
							<span class="st"
								>{{ formatNumber(this.quantity * this.unitPrice) }} Usdt</span
							>
						</div>
						<div class="row">
							<span class="head">Total</span>
							<b>{{ formatNumber(this.totalPrice) }} Usdt</b>
						</div>
					</box>
				</main>
				<action class="pay btn" :class="{ disabled: disabled }" @click="pay">
					place order ＆ pay
				</action>
			</section>
		</section>
	</div>
</template>
<script lang="ts">
import Top from '../components/dao/Top.vue'
import Modal from '../components/common/Modal.vue'
import Loading from '../components/common/Loading.vue'
import { defineComponent } from 'vue'
import Arrow from '/src/assets/ui/arrow-left.svg'
import { ref } from 'vue'
import { formatNumber } from '../common/helper'
let addr = ref('')
let coupon = ref('')
let qty = ref('1')
export default defineComponent({
	data: () => {
		return {
			addr,
			qty,
			quantity: 1,
			coupon,
			prevCoupon: '',
			couponError: false,
			qtyError: false,
			addressError: false,
			discount: 0,
			totalPrice: 0,
			unitPrice: 0,
			multiplier: 1, //discount multiplier
			runningDiscountCheck: false,
			disabled: true,
			allowance: 0,
			balance: 0,
			loading: false,
			errorMessage: '',
		}
	},
	async mounted() {
		if (!this.$store.state.addr) {
			// this.router.push('/dsn')
			// let r1 = await this.web3.enable()
		}
		await this.web3.createPayContracts()
		let r1 = await this.web3.testPayNetwork()
		if (!r1) this.router.push('/dsn')
		this.unitPrice = (await this.web3.payPrice()) ?? 0
		this.totalPrice = this.quantity * this.unitPrice * this.multiplier
		this.allowance = await this.web3.payAllowance()
		this.balance = await this.web3.payBalance()
		this.disabled = false
	},
	beforeRouteLeave() {
		this.web3.swichBackNetwork()
	},
	watch: {
		addressError() {
			this.checkAll()
		},
		qtyError() {
			this.checkAll()
		},
		couponError() {
			this.checkAll()
		},
		quantity() {
			this.recalcPrice()
		},
		multiplier() {
			this.recalcPrice()
		},
		discount() {
			this.recalcPrice()
		},
	},
	methods: {
		recalcPrice() {
			this.discount =
				this.quantity *
				this.unitPrice *
				(Math.round((1 - this.multiplier) * 10000) / 10000)
			this.totalPrice = this.quantity * this.unitPrice * this.multiplier
		},
		checkAll() {
			if (this.addressError) this.disabled = true
			else if (this.qtyError) this.disabled = true
			else if (this.couponError) this.disabled = true
			else this.disabled = false
		},
		formatNumber(n) {
			return formatNumber(n, 2, false)
		},
		async tryGetDiscount(coupon) {
			console.log('tryGet', `${'coupon'}`)
			if (!this.runningDiscountCheck && this.prevCoupon != coupon) {
				let multi = await this.web3.payDiscount(coupon.trim())
				if (multi == 0) multi = 1
				this.multiplier = multi
				console.log('this.multiplier', this.multiplier)
				this.prevCoupon = coupon
				setTimeout(() => {
					this.runningDiscountCheck = false
				}, 900)
			} else {
				setTimeout(() => {
					this.tryGetDiscount(coupon)
				}, 1000)
			}
		},
		async couponHandler() {
			if (this.coupon.value == '') {
				this.couponError = false
				this.discount = 0
			} else {
				this.tryGetDiscount(coupon.value)
			}
		},
		addressHandler() {
			if (this.addr == '') {
				this.addressError = false
			} else {
				if (this.addr) this.addr = this.addr.trim()
				this.addressError = !this.web3.web3js.utils.isAddress(this.addr)
			}
		},
		qtyHandler() {
			if (qty.value == '') {
				this.qtyError = true
				this.quantity = 0
			}
			if (parseInt(qty.value) > 0 && parseInt(qty.value) < 101) {
				this.qtyError = false
				this.quantity = parseInt(qty.value)
			} else {
				this.qtyError = true
				this.quantity = 0
			}
			parseInt(qty.value) > 100
				? (this.errorMessage = 'Too many')
				: (this.errorMessage = '')
			if (isNaN(this.quantity)) this.quantity = 0
		},
		async pay() {
			if (this.disabled) return
			this.$store.dispatch('save', {
				k: 'loading',
				v: true,
			})

			await this.web3.testPayNetwork()
			if (this.balance < this.totalPrice) {
				this.popup({
					text: `Insufficient balance: ${formatNumber(
						this.balance
					)} USDT, required: ${formatNumber(this.totalPrice)} USDT`,
				})
				this.$store.dispatch('save', {
					k: 'loading',
					v: false,
				})

				return
			}
			if (this.web3.address.toLowerCase() == this.addr.toLowerCase()) {
				this.popup({
					text: `You cannot input your own address as a reference`,
				})
				this.$store.dispatch('save', {
					k: 'loading',
					v: false,
				})

				return
			}
			if (this.allowance < this.totalPrice) {
				if (this.allowance > 0) {
					//first approve 0, then required amount if allowance > 0
					let r1 = await this.web3.payApprove(0)
					console.log('r1', r1)
					if (!r1) {
						this.$store.dispatch('save', {
							k: 'loading',
							v: false,
						})

						return
					}
				}
				let r2 = await this.web3.payApprove(this.totalPrice)
				console.log('r2', r2)
				if (!r2) {
					this.$store.dispatch('save', {
						k: 'loading',
						v: false,
					})
					return
				}
			}
			let r3 = await this.web3.payBuy(
				this.quantity,
				this.coupon.trim()
				// this.addr
			)
			if (r3) {
				this.popup({ text: 'Success!' })
			}
			this.$store.dispatch('save', {
				k: 'loading',
				v: false,
			})

			// directly pay
		},
	},
	components: { Top, Modal, Arrow, Loading },
})
</script>
<style scoped>
nav.top2 {
	margin: 10px 0 12px 0;
}
.row {
	justify-content: space-between;
	color: #6c747f;
	font-weight: 500;
}
box {
	gap: 34px;
	display: flex;
	flex-direction: column;
	padding: 10px 0 30px 0;
}
box.a {
	border-bottom: 1px solid #ebedef;
}
box.b {
	gap: 32.5px;
}
.head {
	font-weight: 600;
	font-size: 22px !important;
	color: #1f2226;
}
.st {
	text-decoration: line-through;
}
box span:first-child {
	font-size: 15px;
}
box span:last-child {
	font-size: 18px;
}
input {
	padding: 15.5px 14px;
	border: 2px solid #cdd0d4;
	border-radius: 12px;
	width: 362px;
	height: 54px;
	border-radius: 12px;
}
main.dsn {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	background: rgba(255, 255, 255, 0.7);
	border-bottom: 1px solid #ebedef;
	backdrop-filter: blur(7px);
}
section.main {
	flex: 1;
	width: 100%;
	max-width: 1130px;
	/* background-color: aqua; */
	display: flex;
	flex-direction: column;
	/* overflow: hidden; */
	position: relative;
	overflow-x: visible;
	/* min-height: 200vh; */
}
div.content {
	width: 100%;
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
}
section.wrapper {
	display: flex;
	flex-direction: row;
	width: 100%;
	max-width: 1130px;
	min-height: 80vh;
}
section.wrapper > section {
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: space-between;
	min-height: 952px;
	padding: 40px 30px;
}
main.l,
main.r {
	flex-direction: column;
	display: flex;
}
main.l {
	gap: 8px;
}
main.r {
	gap: 20px;
}
main.l h2 {
	margin-block-end: 22px;
}
main.l p {
	margin-block-end: 12px;
}
main.l h4 {
	margin-block-start: 22px;
	margin-block-end: 11px;
}
section.wrapper > *:first-child {
	flex: 678;
	/* background-color: blue; */
}
section.wrapper > *:last-child {
	flex: 442;
	border-left: 1px solid #ebedef;
}
section.wrapper > *:last-child main {
	padding: 0 0;
}

h2,
h3,
h4 {
	font-weight: 600;
	text-align: left;
}
h2 {
	font-size: 22px;
}
h3 {
	font-size: 18px;
}
h4 {
	font-size: 15px;
}
p {
	font-weight: 500;
	font-size: 15px;
	line-height: 123%;
	color: #6c747f;
}

b {
	font-weight: 600;
	font-size: 18px;
	color: #1f2226;
}

action {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px;
	gap: 10px;
	font-weight: 600;
	font-size: 16px;
	padding: 16px 47px;
	border: 1px solid #1f2226;
	border-radius: 8px;
	gap: 14px;
	align-self: flex-start;
}
action.pay {
	padding: 16px 80.5px;
	color: white;
	background: #17bb7f;
	border: none;
	align-self: center;
	/* margin-left: 66px; */
}
action.back.btn svg {
	display: none;
}
action.pay.btn.disabled {
	background: #cdd0d4;
	color: #1f2226;
}
input.error,
.red {
	color: red;
	font-weight: bold;
	border-color: red;
}
input.error:focus {
	outline: none;
}
@media (max-width: 1100px) {
	input {
		width: calc(100vw - 2rem);
	}
	box.b {
		margin-top: 28px;
	}
	action.back.btn {
		border: none;
		border-bottom: 1px solid #ebedef;
		width: 100%;
		height: 72px;
		justify-content: flex-start;
		padding: 0;
		border-radius: 0;
		padding: 0 12px;
	}
	main.l,
	main.r {
		padding: 0 16px;
	}
	main.r {
		margin-bottom: 24px;
	}
	action.back.btn svg {
		display: block;
	}
	action.pay.btn {
		align-self: center;
		margin-bottom: 40px;
	}
	action.back.btn:active {
		transform: none;
	}
	main.dsn {
		/* min-height: 64px; */
		padding: 0 0 15px 0;
	}
	section.wrapper {
		display: flex;
		flex-direction: column;
	}
	section.wrapper > section {
		min-height: 390px;
		padding: 0px 13px;
		margin-top: 0;
	}
	section.wrapper > *:first-child,
	section.wrapper > *:last-child {
		flex: auto;
	}
	section.wrapper > *:first-child {
		padding: 0 0 43px 0;

		border-bottom: 1px solid #ebedef;
	}
	section.wrapper > *:first-child h2 {
		padding-top: 40px;
	}

	section.wrapper > *:last-child {
		padding-top: 45px;
	}
	section.wrapper > *:first-child {
		flex-direction: column-reverse;
		justify-content: flex-end;
	}
}
</style>
