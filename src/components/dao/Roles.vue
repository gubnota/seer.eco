<template>
	<section class="cols">
		<div class="col" v-for="el in $data.roles">
			<div class="row">
				<h3>{{ el.name }}</h3>
				<button @click="">
					<img :src="arrow" />
					<span>{{ el.action }}</span>
				</button>
			</div>
			<p>{{ el.text }}</p>
		</div>
	</section>
</template>
<script lang="ts">
import arrow from '/src/dao/assets/arrow-right.png'
export default {
	data() {
		return {
			arrow,
			roles: [
				{
					name: 'Reviewer',
					text: "The SEER DAO jury is the upper-level autonomous organization of SEER DAO and an important part of SEER's decentralized autonomy. Come and participate in the future construction of SEER DAO.",
					action: 'Apply',
				},
				{
					name: 'DAO Rules',
					text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
					action: 'Details',
				},
				{
					name: 'Incentive Center',
					text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
					action: 'Details',
				},
			],
		}
	},
}
</script>
<style scoped>
section.cols {
	display: flex;
	flex-direction: row;
	margin-bottom: 21px;
}
.col {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 0 40px;
	position: relative;
}
.col::before {
	display: block;
	content: ' ';
	background: #cdd0d4;
	width: 1px;
	height: 152px;
	position: absolute;
	left: 0;
}
.col:first-child::before {
	display: none;
}
p {
	font-size: 13px;
	line-height: 153%;
}
button {
	border-radius: 10px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	padding: 12px 24px;
	align-items: center;
	justify-content: center;
	display: flex;
	flex-direction: row;
	gap: 10px;
	background: transparent;
}
button span {
	font-size: 15px;
	font-weight: 600;
}
.row {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 24px;
	justify-content: center;
}
h3 {
	font-size: 26px;
	font-weight: bold;
}
button img {
	width: 24px;
	height: 24px;
}
</style>
