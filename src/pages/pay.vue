<template>
	<Modal />
	<div class="content">
		<main class="dsn">
			<section class="main">
				<Top isDsn="true" />
			</section>
		</main>
		<section class="wrapper">
			<section>
				<main class="l">
					<h2>Confirm your order</h2>
					<h3>Redemption Code</h3>
					<p>
						If you have coupons, you can use them to get discounts on your
						purchases.
					</p>
					<input
						type="text"
						name="coupon"
						id="coupon"
						placeholder="enter coupon"
						v-model="coupon"
						autocomplete="off"
					/>
					<h4>Enter Address</h4>
					<input
						type="text"
						name="address"
						id="address"
						placeholder="Please enter the Ethereum address"
						v-model="addr"
						autocomplete="off"
					/>
					<h4>Enter the Quantity</h4>
					<input
						type="text"
						name="qty"
						id="qty"
						placeholder="e.g. 1"
						v-model="qty"
						autocomplete="off"
					/>
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
							<span>1500.00 Usdt</span>
						</div>
						<div class="row">
							<span>Discount</span>
							<span>75.00 Usdt</span>
						</div>
					</box>
					<box class="b">
						<div class="row">
							<span>&nbsp;</span>
							<span class="st">1500.00 Usdt</span>
						</div>
						<div class="row">
							<span class="head">Total</span>
							<b>1500.00 Usdt</b>
						</div>
					</box>
				</main>
				<action class="pay btn" :class="{ disabled: 1 }">
					place order ＆ pay
				</action>
			</section>
		</section>
	</div>
</template>
<script>
import Top from '../components/dao/Top.vue'
import Modal from '../components/common/Modal.vue'
import { defineComponent } from 'vue'
import Arrow from '/src/assets/ui/arrow-left.svg'
import { ref } from 'vue'
let addr = ref('')
let coupon = ref('')
let qty = ref('1')
export default defineComponent({
	data: () => {
		return {
			addr,
			qty,
			coupon,
		}
	},
	components: { Top, Modal, Arrow },
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
	/* margin-left: 66px; */
}
action.back.btn svg {
	display: none;
}
action.pay.btn.disabled {
	background: #cdd0d4;
	color: #1f2226;
}

@media (max-width: 1100px) {
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
