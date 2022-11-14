<template>
	<section class="footer">
		<div class="back"></div>
		<div class="front">
			<p>
				As a stakeholder of SEER distributed server, we carry the user's E2E
				social data on the premise that we also get a steady stream of curation
				revenue share from the user's own revenue. It is our real door to
				wealth, please do your best to help them secure this door of safety.
				cast your vote
			</p>
			<button @click="handleSubmit">
				<img :src="arrow" /> <span>DAO Space</span>
			</button>
		</div>
	</section>
</template>
<script>
// import { router } from '../../main.ts'
import arrow from '/src/assets/dao/arrow-right_white.png'
export default {
	name: 'Footer',
	data() {
		return {
			email: '',
			arrow,
		}
	},
	methods: {
		handleSubmit(e) {
			window.open('https://to.seer.eco/#/#seer:genesis.seer.eco', '_blank')
			// console.log(this.router)
			// e.preventDefault()
			// this.router.push({ path: '/coming-soon' })
			// alert('d')
			// console.log(this.email)
			// router.push({ path: '/coming-soon' })
		},
	},
}
</script>
<style scoped>
section.footer {
	justify-self: flex-end;
	align-self: flex-end;
	align-items: center;
	display: flex;
	flex-direction: column;
	background: linear-gradient(257.98deg, #aa1fff 2.42%, #2ba1ff 95.24%);
	border-radius: 16px;
	margin-top: 80px;
	margin-bottom: 20px;
	/* transform: translateX(18px) translateY(18px); */
	position: relative;
	width: calc(100% - 22px);
}
.front {
	z-index: 1;
	flex: 1;
	padding: 70px 98px 66px 85px;
	align-self: flex-end;
	transform: translateY(-19px);
	background: rgba(233, 242, 255, 0.6);
	box-shadow: inset 0px 4px 18px rgba(217, 239, 255, 0.71);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	/* Note: backdrop-filter has minimal browser support */
	border-radius: 16px;
	width: calc(100% + 22px);
	/* width: 890px; */
	/* min-height: 354px;
	max-width: 90vw; */
	align-items: center;
	justify-content: center;
	display: flex;
	flex-direction: row;
	gap: 88px;
}
p {
	flex: 1;
	color: white;
	font-size: 15px;
	line-height: 120%;
}
button {
	/* flex: 1; */
	display: flex;
	flex-direction: row;
	gap: 13px;
	align-items: center;
	justify-content: center; /* important*/
	background: rgba(255, 255, 255, 0.2);
	border-radius: 8px 8px 8px 8px;
	font-size: 15px;
	color: #ffffff;
	cursor: pointer;
	font-weight: 600;
	padding: 14px 8px;
	border: none;
	opacity: 1;
	box-shadow: -2px -2px 0 #aa1fff55, 2px 2px 0 rgba(255, 255, 255, 0.5);
	/* border: 1px solid;
	border-image: linear-gradient(
			146deg,
			rgba(0, 0, 0, 1),
			rgba(255, 255, 255, 1)
		)
		1 1; */
}
button:active {
	transform: scale(0.95);
}
img {
	width: 20px;
	height: 16px;
}
.row {
	display: flex;
	flex-direction: row;
	gap: 30px;
}

@media (max-width: 1120px) {
	.front {
		padding: 20px 28px 26px 25px;
		flex-direction: column;
		gap: 1rem;
	}
	section.footer {
		align-self: center;
		width: calc(100% - 22px);
	}
	.front {
		width: 100%;
		transform: translateY(-5px);
	}
}
@media (max-width: 550px) {
	section.footer {
		margin-top: 100px;
		margin-bottom: 100px;
		max-width: 100vw;
	}
}
</style>
