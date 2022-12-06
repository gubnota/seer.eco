<template>
	<nav class="pag" v-if="els.length > 0">
		<div class="btn" @click="goPrev">
			<svg width="10" height="18" viewBox="0 0 10 18" fill="none">
				<path
					d="M8.49984 16.92L1.97984 10.4C1.20984 9.62996 1.20984 8.36996 1.97984 7.59996L8.49984 1.07996"
					stroke="#1F2226"
					stroke-width="1.5"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
		<div class="row">
			<div
				class="btn"
				v-for="el in els"
				:class="{ sel: sel == el }"
				@click="select(el)"
			>
				{{ el }}
			</div>
		</div>
		<div class="btn" @click="goNext">
			<svg width="10" height="18" viewBox="0 0 10 18" fill="none">
				<path
					d="M1.41016 16.92L7.93016 10.4C8.70016 9.62996 8.70016 8.36996 7.93016 7.59996L1.41016 1.07996"
					stroke="#1F2226"
					stroke-width="1.5"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	</nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		total: Number,
		selected: Number,
		perPage: Number,
	},
	data() {
		return {
			sel: 1, // current page
		}
	},
	computed: {
		els() {
			// console.log('this.getNum', this.getNum, this.getTotal)
			// els: []
			let els = Array.from({ length: this.getNum }, (_, i) => {
				// console.log('this.sel', this.sel)
				// if (i > this.sel && i < this.getNum - 1) return '…'
				return i + 1
			}) //Array.from(Array(this.getNum).keys())
			return els
		},
		getSearchTerm() {
			let a = this.$store.state.myDSNSearch
			if (!a) return ''
			return a
		},
		getTotal() {
			let a = this.$store.state.MyDSNs
			if (!a) return this.total
			return a.total
		},
		getNum() {
			return Math.ceil(this.getTotal / this.perPage)
		},
	},
	mounted() {},
	updated() {},

	methods: {
		pagination() {},
		select(num: any, save: boolean = true) {
			if (save) {
			}
			this.sel = num
			this.prev = this.sel > 1 ? this.sel - 1 : 0
			this.next = this.sel < this.getNum ? this.sel + 1 : 0
			// this.pagination()
			if (this.$store.state.myDSNPage != num) {
				this.web3.MyDSNs(
					(num - 1) * this.perPage + 1,
					this.perPage,
					this.getSearchTerm
				)
				this.$store.dispatch('save', { k: 'myDSNPage', v: num })
			}
		},
		goNext() {
			if (this.sel < this.getNum) this.select(this.sel + 1)
		},
		goPrev() {
			if (this.sel > 1) this.select(this.sel - 1)
		},
	},
})
</script>
<style scoped>
nav.pag {
	align-self: center;
	display: flex;
	flex-direction: row;
	gap: 37;
}
.btn {
	cursor: pointer;
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
}
.row {
	display: flex;
	flex-direction: row;
	text-align: center;
	align-items: center;
	justify-content: center;
	color: #cdd0d4;
}
.row .sel {
	color: #1f2226;
}
.row .btn {
	width: 22px;
}
.btn:hover {
	border-radius: 12px;
	background: rgba(0, 0, 0, 0.1);
}
.btn:active,
.btn:hover {
	transform: scale(0.95);
}
</style>
