<template>
	<div class="actions">
		<div class="btn pass" @click="pass" :class="{ inactive: rejected }">
			<span class="ticket" v-if="isPassed()"><Ticket /></span> <span>Pass</span>
		</div>
		<div class="btn reject" @click="reject" :class="{ inactive: passed }">
			<span class="ticket" v-if="isRejected()"><Ticket /></span
			><span>Reject</span>
		</div>
	</div>
</template>
<script lang="ts">
import Ticket from '/src/assets/dao/ticket.svg'
import { defineComponent } from 'vue'
declare const window: any
export default defineComponent({
	data() {
		return {
			passed: false,
			rejected: false,
		}
	},
	props: {
		id: Number,
	},

	mounted() {
		this.passed = false
		this.rejected = false
		this.updateVoted()
		return this.passed
	},
	methods: {
		loggedIn() {
			let loggedIn = this.$store.state.address
			return !!loggedIn
		},
		notAppUser() {
			return this.$store.state.notAppUser
		},

		isRejected() {
			this.updateVoted()
			return this.rejected
		},
		isPassed() {
			this.updateVoted()
			return this.passed
		},
		updateVoted() {
			if (this.$store.state.eventList)
				var filtered = this.$store.state.eventList.list.filter((el) => {
					return el.showId == this.id
				})
			if (filtered[0])
				switch (filtered[0].voteResult) {
					case 1:
						this.passed = true
						break
					case 2:
						this.rejected = true
						break
					default:
						break
				}
		},
		pass(e: any) {
			e.stopPropagation()
			if (!this.loggedIn()) {
				this.popup({ text: 'Please connect to your wallet account first' })
			} else if (this.notAppUser()) {
				this.popup({ code: 10002 })
			} else {
				this.vote(true)
			}
		},
		reject(e: any) {
			e.stopPropagation()
			if (!this.loggedIn()) {
				this.popup({ text: 'Please connect to your wallet account first' })
			} else if (this.notAppUser()) {
				this.popup({ code: 10002 })
			} else {
				this.vote(false)
			}
		},
		vote(pass: true) {
			if (this.passed || this.rejected) return
			;(async () => {
				if (
					!this.$store.state.daoInfo ||
					this.$store.state.daoInfo.isDao != true
				) {
					this.popup({
						text: !this.$store.state.daoInfo
							? `<p>Please log in to your wallet account first</p>`
							: `<p>Please, become a <b class="rainbow">DAO reviewer</b> first</p>`,
						timeout: 3000,
					})
					if (!this.$store.state.daoInfo) this.web3.login()
					return
				}
				if (pass) {
					var voteResult = await this.web3.vote(this.id, true)
					// if (voteResult !== true) return
					console.log('voteResult', voteResult)
					if (voteResult) {
						this.passed = true
						this.rejected = false
					}
				} else {
					var voteResult = await this.web3.vote(this.id, false)
					console.log('voteResult', voteResult)
					// if (voteResult !== false) return
					if (voteResult) {
						this.passed = false
						this.rejected = true
					}
				}
				setTimeout(() => {
					this.web3.eventList({
						tab: this.$store.state.eventsTab || 0,
						from: 8 * ((parseInt(this.$store.state.eventsPage) || 1) - 1) + 1,
						limit: 8,
					})
				}, 5000)
			})()
		},
	},
	components: { Ticket },
})
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
