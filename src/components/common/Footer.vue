<template>
	<footer>
		<aside>
			<h2 class="rainbow">{{ footer.aside.h2 }}</h2>
			<nav>
				<img :src="footer.aside.nav.flag" class="flag" alt="" />
				<div class="lang">
					<span>{{ footer.aside.nav.lang }}</span>
					<img class="icon" src="/09footer/arrowdown.svg" />
				</div>
			</nav>
		</aside>
		<div class="sitemap">
			<div class="columns">
				<div class="column" v-for="el in $data.footer.navigation">
					<ul>
						<li>
							<h3>{{ el.header }}</h3>
						</li>
						<li v-for="el2 in el.items">
							<a :href="el2.hash" target="_blank">{{ el2.name }}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
	<section class="line">
		<aside class="madein">
			<span class="version">v1.13.0-beta</span>
			<a href="/"
				><img src="/01head/seer.png" alt="Logo seer" class="logo"
			/></a>
		</aside>
	</section>
</template>

<script lang="ts">
import { footer } from '../../components/common/contents.js'

export default {
	name: 'Footer',
	data() {
		return { footer }
	},
}
</script>

<style scoped>
.line {
	width: 100vw;
	/* margin: 4rem 0 100px 0; */
	/* opacity: 0; */
	border-top: 2px solid #d9d9d9;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: flex-end;
	padding: 50px 90px;
}
aside.madein {
	width: 221px;
	height: 32px;
	display: flex;
	flex-direction: row;
	align-items: center;
	flex: 1;
	max-width: 221px;
	color: black;
	font-weight: 600;
	font-size: 13px;
}
aside.madein .logo {
	flex: 1;
	height: 32px;
}
aside.madein .version {
	flex: 1;
	width: 126px;
}

footer {
	max-width: 1120px;
	width: 100%;
	/* background: #aa1fff; */
	border-radius: 10px;
	padding: 22px 45px;
	display: flex;
	flex-direction: row;
	margin: 1rem;
	margin-bottom: 6rem;
	justify-content: space-between;
	align-items: flex-start;
}
footer aside {
	/* background-color: antiquewhite; */
	flex: 259;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 52px;
	align-items: flex-start;
}
footer aside h2 {
	flex: 1;
	text-align: left;
	font-weight: 600;
	font-size: 32px;
	line-height: 48px;
	max-width: 272px;
}
footer aside nav {
	/* background-color: #d9d9d9; */
	flex: 1;
	display: flex;
	flex-direction: row;
	gap: 16px;
	align-items: center;
}
footer aside nav .flag {
	flex: 1;
	width: 33px;
	height: 22px;
}
footer aside nav .lang {
	flex: 1;
	width: 106px;
	height: 32px;
	flex-direction: row;
	align-items: flex-start;
	padding: 8px 16px;
	gap: 10px;
	display: flex;
	gap: 13px;
	font-size: 13px;
	border: 1.5px solid #b4b4b4;
	border-radius: 4px;
	align-items: center;
	background: white;
	cursor: pointer;
}
footer aside nav .lang:active {
	transform: scale(0.98);
}
footer aside nav .lang span {
	flex: 1;
}
footer aside nav .lang .icon {
	height: 5px;
	width: 11px;
}

.sitemap {
	flex: 494;
	margin-bottom: 4rem;
	width: 100%;
}
.sitemap .columns {
	display: grid;
	/* flex-direction: row; */
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr;
	grid-template-areas: 'col1 col2 col3 col4';
	/* margin-top: 100px; */
	grid: 1rem;
	/* align-items: flex-start; */
}
.sitemap .columns .column {
	justify-self: space-around;
	width: 100%;
}
.sitemap .columns .column:nth-child(1) {
	grid-area: col1;
	/* justify-self: left; */
}
.sitemap .columns .column:nth-child(2) {
	/* justify-self: center; */
	grid-area: col2;
}
.sitemap .columns .column:nth-child(3) {
	/* justify-self: right; */
	grid-area: col3;
}
.sitemap .columns .column:nth-child(4) {
	/* justify-self: right; */
	grid-area: col4;
}
.sitemap .columns h3 {
	font-weight: bold;
	font-size: 16px;
	color: #1f2226;
	margin-bottom: 10px;
}
.sitemap .columns li {
	font-size: 15px;
	min-height: 32px;
}
.sitemap .columns a {
	color: rgba(0, 0, 0, 0.3);
	text-decoration: none;
}

footer .button {
	border: none;
	/* width: 204px; */
	height: 50px;
	background-color: black;
	border-radius: 26px;
	text-align: center;
	text-decoration: none;
	color: white;
	font-size: 1.2rem;
	font-weight: 200;
	padding: 0 20px;
}

@media (max-width: 1320px) {
	footer {
		flex-direction: column;
		gap: 1rem;
		max-width: 100vw;
	}
	.sitemap .columns {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas: 'col1 col2' 'col3 col4';
		align-items: center;
	}
	.sitemap .columns {
		margin: 0 1rem;
	}
}
@media (max-width: 400px) {
	.sitemap .columns {
		/* grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		grid-template-areas: 'col1' 'col2' 'col3' 'col4'; */
		align-items: center;
		display: flex;
		flex-direction: column;
	}
	.sitemap .columns .column {
		margin-top: 3rem;
	}
}
</style>
