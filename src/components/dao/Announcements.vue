<template>
	<section class="announce">
		<div class="front">
			<h3>DAO Announcements</h3>
			<ul>
				<li v-for="el in $data.entries">
					<span>{{ el.title }}</span> <span class="date">{{ el.date }}</span>
				</li>
			</ul>
		</div>
		<div class="back"></div>
	</section>
</template>
<script lang="ts">
export default {
	data() {
		return {
			entries: [
				{
					title: 'Community Jury Specifications',
					date: '25th January',
				},
				{
					title: 'Announcement on the suspension of the trial of DEFI category',
					date: '18th May',
				},
				{
					title: 'Announcement on the suspension of the trial of DEFI category',
					date: '18th May',
				},
			],
		}
	},
}
</script>
<style scoped>
section.announce {
	margin: 39px 0 0 0;
	border-radius: 8px;
	flex: 1;
	display: flex;
	flex-direction: column;
	position: relative;
}
.back {
	z-index: 0;
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #dca3ff88;
	border-radius: 8px;
	filter: blur(12px);
	/* box-shadow: inset 0px 4px 16px rgba(254, 217, 255, 0.31); */
}
.front {
	z-index: 1;
	transform: translateY(-19px);
	/* background: rgba(233, 242, 255, 0.6); */
	flex: 1;
	border-radius: 8px;
	color: white;
	padding: 26px 24px;
	background: #1f2226;
	gap: 36px;
	display: flex;
	flex-direction: column;
}
h3 {
	font-size: 32px;
	font-weight: bold;
}
ul {
	list-style: disc;
	padding: 0 2rem;
}
li {
	font-weight: 400;
	line-height: 32px;
	font-size: 14px;
}
.date {
	margin-left: 24px;
	font-size: 13px;
	font-weight: 400;
	background: linear-gradient(245deg, #aa1fff 0%, #2ba1ff 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	text-transform: uppercase;
}

/* section.announce::after {
	display: block;
	z-index: 0;
	content: '';
	width: 100%;
	height: 400px;
	background: linear-gradient(180deg, #dca3ff 0%, rgba(170, 31, 255, 0) 84%);
	border-radius: 8px;
} */
</style>
