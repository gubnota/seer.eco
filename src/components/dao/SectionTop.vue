<template>
	<section class="top">
		<div class="col">
			<h1>Become A <br />DAO Reviewer</h1>
			<h2>Cast your precious vote for the project</h2>
		</div>
		<img
			src="/dao/bird.jpg"
			srcset="/dao/bird@2x.webp 1x, /dao/bird@2x.webp 2x"
		/>
	</section>
</template>
<script lang="ts">
export default {}
</script>
<style scoped>
section.top {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 26px 0 0 0;
	gap: 146px;
	justify-content: center;
}
img {
	mix-blend-mode: darken;
}
.col {
	display: flex;
	flex-direction: column;
}

.col h1 {
	font-size: 64px;
	font-weight: 600;
	color: #1f2226;
	line-height: 79px;
}
.col h2 {
	font-size: 25px;
	font-weight: 600;
	line-height: 29px;
	background: linear-gradient(245deg, #aa1fff 0%, #2ba1ff 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
