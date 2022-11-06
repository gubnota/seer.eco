<template>
	<div class="actions">
		<div
			class="btn pass"
			@click="
				(e) => {
					e.stopPropagation()
					if (passed || rejected) return
					passed = true
					rejected = false
				}
			"
			:class="{ inactive: rejected }"
		>
			<span class="ticket" v-if="passed"><Ticket /></span> <span>Pass</span>
		</div>
		<div
			class="btn reject"
			@click="
				(e) => {
					e.stopPropagation()
					if (passed || rejected) return
					passed = false
					rejected = true
				}
			"
			:class="{ inactive: passed }"
		>
			<span class="ticket" v-if="rejected"><Ticket /></span><span>Reject</span>
		</div>
	</div>
</template>
<script lang="ts">
import Ticket from '/src/assets/dao/ticket.svg'

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
	methods: {
		handler(pass: true) {},
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
.btn.inactive:active {
	transform: none;
}
.btn.inactive {
	cursor: not-allowed;
}
.btn.pass {
	background-color: #1f2226;
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
.btn.reject.inactive {
	color: #3a4048;
	border-color: #3a4048;
}
.btn.pass:hover,
.btn.pass:active {
	background: linear-gradient(-90deg, #aa1fff, #2ba1ff);
}
.btn.pass.inactive,
.btn.pass.inactive:hover,
.btn.pass.inactive:active {
	background: #3a4048;
}

.ticket svg {
	width: 13px;
	height: 13px;
}
</style>
