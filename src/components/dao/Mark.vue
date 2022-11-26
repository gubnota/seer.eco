<template>
	<div class="mark" @mouseenter="show" @mouseleave="show" @click="show">
		<div class="hover" v-if="hovered != 0">
			<span
				>For the convenience of tracking the source, the space information in
				the activity list is the mirror data at the time of publishing</span
			>
		</div>
		<svg
			width="24"
			height="25"
			viewBox="0 0 24 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="el"
		>
			<defs>
				<linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" style="stop-color: #1f2226; stop-opacity: 1" />
					<stop offset="100%" style="stop-color: #1f2226; stop-opacity: 1" />
				</linearGradient>
				<linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" style="stop-color: #2ba1ff; stop-opacity: 1" />
					<stop offset="100%" style="stop-color: #aa1fff; stop-opacity: 1" />
				</linearGradient>
			</defs>
			<path
				d="M18.9608 5.53878C15.1225 1.6998 8.8767 1.6998 5.03842 5.53878C1.19943 9.37707 1.19943 15.6229 5.03842 19.4612C8.87673 23.3002 15.1225 23.3002 18.9608 19.4612C22.7998 15.6229 22.7998 9.37707 18.9608 5.53878ZM17.9617 18.4621C14.6742 21.7502 9.32431 21.7495 6.03753 18.4621C2.74938 15.1746 2.74938 9.82537 6.03753 6.53756C9.32431 3.25044 14.6742 3.24975 17.9617 6.53756C21.2491 9.82468 21.2491 15.1753 17.9617 18.4621Z"
				fill="url(#grad1)"
				class="mark"
			/>
			<path
				d="M12.051 7.48962C11.4667 7.48962 10.9912 7.96515 10.9912 8.54975C10.9912 9.13544 11.4667 9.61166 12.051 9.61166C12.636 9.61166 13.1122 9.13544 13.1122 8.54975C13.1122 7.96515 12.636 7.48962 12.051 7.48962Z"
				fill="url(#grad1)"
				class="mark"
			/>
			<path
				d="M12.0504 10.5146C11.6098 10.5146 11.25 10.8737 11.25 11.315V17.5857C11.25 18.027 11.6098 18.3861 12.0504 18.3861C12.4918 18.3861 12.8515 18.027 12.8515 17.5857V11.315C12.8515 10.8737 12.4918 10.5146 12.0504 10.5146Z"
				fill="url(#grad1)"
				class="mark"
			/>
		</svg>
	</div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
	computed: {
		hovered() {
			return this.$store.state.hovered || 0
		},
	},
	methods: {
		show(state) {
			console.log('clicked')
			if (!this.$store.state.hovered) {
				this.$store.dispatch('save', {
					k: 'hovered',
					v: setTimeout(() => {
						this.$store.dispatch('save', { k: 'hovered', v: 0 })
					}, 800),
				})
			}
		},
	},
})
</script>
<style>
.mark {
	position: relative;
	cursor: pointer;
	margin-top: 5px;
}
.hover {
	transition: all 0.5s ease-in;
	z-index: 10;
	border-radius: 1rem;
	position: absolute;
	width: 300px;
	height: 60px;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	padding: 10px;
	top: 40px;
	left: 0;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 10px;
	gap: 10px;
	width: 315px;
	height: 68px;
	background: rgba(0, 0, 0, 0.62);
	border-radius: 0px 8px 8px 8px;
	flex: none;
	order: 1;
	flex-grow: 0;
}
.hover span {
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 123%;
}
.el {
}
svg:hover path.mark {
	/* fill: #1f2226 !important; */
	fill: url(#grad2);
}
/* #btn .push:hover{
  fill:url(#pushbtn2);
  cursor:pointer;
} */
@media (max-width: 550px) {
	.hover {
		left: -250px;
		border-radius: 8px 0 8px 8px;
	}
}
</style>
