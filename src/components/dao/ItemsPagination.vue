<template>
	<nav class="pag">
		<div class="btn">
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
		<div class="btn">
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
export default {
	props: {
		total: Number,
	},
	data() {
		return {
			num: 0,
			sel: 1, // current
			prev: 1, // n-1
			next: 1, // n+1
			els: [],
		}
	},
	mounted() {
		this.num = this.total
		// console.log(this.$store.eventList.total)
		// this.num = Math.ceil(this.total / 15)
		this.select(1)
	},
	updated() {
		console.log('updated', this.$store.eventList)
	},

	methods: {
		pagination() {
			this.els = Array.from({ length: this.num }, (_, i) => {
				console.log('this.sel', this.sel)
				// if (i > this.sel && i < this.num - 1) return '…'
				return i + 1
			}) //Array.from(Array(this.num).keys())
		},
		select(num: any) {
			this.sel = num
			this.prev = this.sel > 1 ? this.sel - 1 : 0
			this.next = this.sel < this.num ? this.sel + 1 : 0
			this.pagination()
		},
		goNext() {
			if (this.sel < this.num) this.select(this.sel + 1)
		},
		goPrev() {
			if (this.sel > 1) this.select(this.sel - 1)
		},
	},
}
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
