<template>
	<div class="actions">
		<div
			class="btn pass"
			@click="
				() => {
					passed = true
					rejected = false
				}
			"
		>
			<span class="ticket" v-if="passed"><Ticket /></span> <span>Pass</span>
		</div>
		<div
			class="btn reject"
			@click="
				() => {
					passed = false
					rejected = true
				}
			"
		>
			<span class="ticket" v-if="rejected"><Ticket /></span><span>Reject</span>
		</div>
	</div>
</template>
<script lang="ts">
import Ticket from '/src/dao/assets/ticket.svg'

export default {
	data() {
		return {
			passed: false,
			rejected: false,
		}
	},
	props: {
		id: Number,
	},
	components: { Ticket },
}
</script>
<style scoped>
.actions {
	margin-left: 12px;
	width: 178px;
	gap: 11px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	text-align: center;
}
.btn {
	flex: 1;
	width: 83px;
	height: 34px;
	justify-content: center;
	display: flex;
	align-items: center;
	border-radius: 8px;
	gap: 5px;
	cursor: pointer;
}
.btn:active {
	transform: translateY(5px);
}
.btn.pass {
	background-color: #3a4048;
	color: white;
}
.btn.reject {
	border: 1px solid #3a4048;
	background-color: white;
}
.btn.reject:hover,
.btn.reject:active {
	color: #e94f4d;
	border-color: #e94f4d;
}
.btn.pass:hover,
.btn.pass:active {
	background: linear-gradient(-90deg, #aa1fff, #2ba1ff);
}
.ticket svg {
	width: 13px;
	height: 13px;
}
</style>
