<template>
	<aside class="float" v-if="isShown">
		<checkin v-if="!isTapped" @click="checkin" />
		<checkin_success
			v-else
			:class="{ dismissed: isDismissed }"
			@click="dismiss"
		/>
	</aside>
</template>
<script lang="ts">
import checkin from '/src/assets/reviewer/checkin.svg'
import checkin_success from '/src/assets/reviewer/checkin_success.svg'
import { defineComponent } from 'vue'

declare const window: any
export default defineComponent({
	data() {
		return {
			isDismissed: false,
			isTapped: false,
		}
	},
	mounted() {},
	computed: {
		isShown() {
			let s = this.$store.state
			if (this.isDismissed) return false // already dismissed
			if (s.daoInfo && s.daoInfo.isDao && s.daoInfo.daySign == false) {
				return true
			}
			return false // default is not shown
		},
	},
	methods: {
		dismiss() {
			this.isDismissed = true
		},
		checkin() {
			this.web3.daily()
			this.isTapped = true
			setTimeout(() => {
				this.isDismissed = true
			}, 1000)
		},
	},
	components: { checkin, checkin_success },
})
</script>
<style scoped>
aside.float {
	left: -205px;
	top: 601px;
	position: absolute;
	z-index: 10;
	cursor: pointer;
}
.waiting:active {
	transform: translateY(5px);
}
.dismissed {
	display: none;
}
</style>
