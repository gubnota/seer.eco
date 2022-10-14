<template>
	<section class="factory">
		<div class="text">
			In addition, you can communicate freely with your relatives and friends,
			and SEER will become the social assistant who knows you best.
		</div>
		<div class="ill"></div>
	</section>
</template>
<script>
export default {
	name: 'Factory',
}
</script>
<style scoped>
section.factory {
	max-width: 1120px;
	width: 100%;
	min-height: 100px;
	gap: 54px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 32px 0 180px 0;
}
.text {
	font-weight: 600;
	flex: 498;
	font-size: 24px;
	padding: 0 8px;
	line-height: 36px;
}
.ill {
	flex: 568;
	object-fit: contain;
	background: url('/06factory/plant.png');
	min-height: 450px;
	background-size: contain;
	background-repeat: no-repeat;
	background-position-y: center;
}
@media (max-width: 550px) {
	section.factory {
		gap: 0;
		flex-direction: column;
	}
	.ill {
		min-height: 400px;
		width: 100%;
	}
	.text {
		flex: 2000;
	}
}
</style>
