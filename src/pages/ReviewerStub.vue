<template>
	<Template>
		<main class="meta">
			<section class="review">
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</section>
			<aside class="warn">&nbsp;</aside>
		</main>
	</Template>
</template>
<script lang="ts">
import Template from '../components/dao/reviewer/template.vue'
export default {
	components: { Template },
}
</script>
<style scoped>
.meta {
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: 56px;
}
section.review {
	display: flex;
	flex-direction: column;
	margin: 132px 0 0 0;
	background: #ffffff;
	border-radius: 8px 8px 0px 0px;
	/* height: 30vh; */
	align-items: stretch;
	padding: 24px 24px;
	gap: 8px;
	min-height: 384px;
	z-index: 1;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	max-width: 1120px;
}
.warn {
	padding: 24px;
	font-weight: 600;
	font-size: 15px;
	line-height: 123%;
	text-align: center;
	color: #ffffff;
	background: rgba(0, 0, 0, 0.62);
	border-radius: 8px;
	max-width: fit-content;
	align-self: center;
	font-size: 13px;
	font-weight: 600;
}
</style>
