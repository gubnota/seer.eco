<template>
	<section class="nav" :class="{ sticky: isSticky }">
		<nav class="top">
			<router-link to="/">
				<img src="/01head/seer.png" alt="logo" class="logo"
			/></router-link>
			<MobileNav />

			<div class="navbar">
				<div
					v-for="el in $data.menu"
					v-bind:key="el.name"
					:class="{ dropdown: !el.hash, link: el.hash }"
				>
					<router-link
						:to="{ path: el.hash }"
						v-if="el.hash"
						@click="toggleMenu"
						>{{ el.name }}</router-link
					>
					<div class="dropdown" v-else>
						<button class="dropbtn">
							<span>{{ el.name }}</span>
							<svg
								width="22"
								height="22"
								viewBox="0 0 22 22"
								fill="none"
								class="icon chevron-right"
							>
								<path
									d="M18.26 8.20416L12.2833 14.1808C11.5775 14.8867 10.4225 14.8867 9.71667 14.1808L3.74001 8.20416"
									stroke-width="1.5"
									stroke-miterlimit="10"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
						<div class="dropdown-content">
							<ul>
								<li v-for="el2 in el.children" v-bind:key="el.name">
									<!-- <a
										:href="el2.hash"
										@click="toggleMenu"
										:target="el2.hash == '#' ? '' : '_blank'"
										>{{ el2.name }}</a
									> -->
									<router-link :to="{ path: el2.hash }" @click="toggleMenu">{{
										el2.name
									}}</router-link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- <div class="link"><a href="#home">Home</a></div> -->
				<!-- <div class="dropdown">
					<button class="dropbtn">
						<span>Dropdown</span>
						<svg
							width="22"
							height="22"
							viewBox="0 0 22 22"
							fill="none"
							class="icon chevron-right"
						>
							<path
								d="M18.26 8.20416L12.2833 14.1808C11.5775 14.8867 10.4225 14.8867 9.71667 14.1808L3.74001 8.20416"
								stroke="#1F2226"
								stroke-width="1.5"
								stroke-miterlimit="10"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					<div class="dropdown-content">
						<a href="#">Link 1</a>
						<a href="#">Link 2</a>
						<a href="#">Link 3</a>
					</div>
				</div> -->
			</div>

			<ul class="main">
				<li
					v-for="el in $data.menu"
					v-bind:key="el.name"
					:class="{ parent: !el.hash, single: el.hash }"
				>
					<ul v-if="!el.hash" class="sub">
						<li class="head">
							<span>{{ el.name }}</span>
							<svg
								width="22"
								height="22"
								viewBox="0 0 22 22"
								fill="none"
								class="icon chevron-right"
								v-if="!el.hash"
							>
								<path
									d="M18.26 8.20416L12.2833 14.1808C11.5775 14.8867 10.4225 14.8867 9.71667 14.1808L3.74001 8.20416"
									stroke="#1F2226"
									stroke-width="1.5"
									stroke-miterlimit="10"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</li>
						<li class="subitem">
							<ul class="float">
								<li v-for="el2 in el.children" v-bind:key="el.name" class="sub">
									<router-link :to="{ path: el2.hash }" @click="toggleMenu">{{
										el2.name
									}}</router-link>
								</li>
							</ul>
						</li>
					</ul>
					<router-link :to="{ path: el.hash }" v-else @click="toggleMenu">{{
						el.name
					}}</router-link>
				</li>
			</ul>

			<!-- <ul>

				<li><a href="https://sdid.seer.eco/" target="_blank">SDID</a></li>
				<li><a href="#">NFT</a></li>
				<li><a href="#">DAO</a></li>
				<li><a href="#">ADS</a></li>
				<li><a href="#">Account</a></li>
				
			</ul> -->
		</nav>
	</section>
</template>

<script>
import { menu } from '../../common/contents'
import MobileNav from '../MobileNav.vue'
import { defineComponent } from 'vue'
var onscroll = (evt) => {
	console.log('nounte', evt)
}

export default defineComponent({
	name: 'Nav',
	data() {
		return { menu, isSticky: false }
	},

	created() {
		window.addEventListener('scroll', this.onscroll)
	},
	destroyed() {
		window.removeEventListener('scroll', this.onscroll)
	},
	methods: {
		toggleMenu(evt) {
			// console.log(evt.target, 'toggleMenu')
		},
		onscroll(e) {
			this.isSticky =
				document.body.offsetWidth > 1023 &&
				window.pageYOffset &&
				window.pageYOffset > (100 || document.querySelector('.stats').offsetTop)
			// window.onscroll((ev) => {
			// 	console.log(ev)
			// })
		},
	},
	components: { MobileNav },
})
</script>

<style scoped>
nav.top {
	max-width: 1120px;
	display: flex;
	justify-content: space-between;
	margin: 23px 0 0 0;
	flex-direction: row;
	/* max-width: 90vw; */
	/* background-color: blanchedalmond; */
}

.navbar {
	display: flex;
	flex-direction: row;
	margin-top: -20px;
	gap: 5px;
	/* overflow: hidden; */
	/* background-color: #333; */
}
.navbar > div {
	display: flex;
	flex-direction: column;
}
.navbar a {
	flex: 1;
	font-size: 16px;
	color: black;
	text-align: center;
	padding: 18px 16px;
	text-decoration: none;
}

.dropdown {
	/* overflow: hidden; */
	position: relative;
}
.dropdown .dropbtn {
	font-size: 16px;
	border: none;
	outline: none;
	color: black;
	padding: 14px 16px;
	background-color: inherit;
	font-family: inherit;
	margin: 0;
	display: flex;
	flex-direction: row;
	gap: 12px;
	font-weight: 600;
}

.dropdown-content {
	display: none;
	position: absolute;
	top: 0;
	margin-top: 50px;
	z-index: 1;
	flex-direction: column;
	align-items: flex-start;
	padding: 20px 20px;
	gap: 0;
	min-width: 122px;
	min-height: 142px;
	background: #ffffff;
	border-radius: 12px;
	box-shadow: 0px 4px 4px rgba(194, 189, 189, 0.25);
}

.dropdown-content a {
	/* float: none; */
	color: black;
	padding: 12px 16px;
	text-decoration: none;
	font-size: 15px;
	line-height: 150%;
	padding: 0;
	width: 100%;
	text-align: left;
	line-height: 40px;
	/* display: block; */
	/* text-align: left; */
}
.dropdown,
.dropdown-content,
.dropdown:hover,
.dropdown-content:hover {
	transition: all 2s ease;
}
.dropdown:hover .dropdown-content,
.dropdown:active .dropdown-content,
.dropdown:focus .dropdown-content {
	display: flex;
	flex-direction: column;
}

section.nav {
	display: flex;
	width: 100%;
	/* max-width: 1120px; */
	justify-content: center;
	z-index: 1000;
	font-weight: 600;
	font-size: 15px;
}
section.nav.sticky {
	position: fixed;
	top: 0;
	background: white;
}

ul.main {
	display: none !important;
}
li.single {
	line-height: 25px;
}
li {
	cursor: pointer;
}
.top ul li {
	flex: 1;
	list-style: none;
	white-space: nowrap;
}
.top ul li a {
	color: #000;
	text-decoration: none;
}
.top ul {
	display: flex;
	flex-direction: column;
	text-align: left;
	width: 100%;
}

nav.top {
	display: flex;
	flex-direction: row;
	flex: 1;
}

.icon {
	/* transform: rotate(90deg); */
	width: 22px;
	height: 22px;
	stroke: #1f2226;
}

ul.sub {
	display: flex;
	flex-direction: column;
}
li.head {
	display: flex;
	flex-direction: row;
}
sub.sub > li {
	display: none;
}
sub.sub > li.head {
	display: initial;
}
li.head > * {
	flex: 1;
}
.logo {
	margin-top: -10px;
	flex: 1;
	max-width: 117px;
	/* height: 117px; */
}
.link,
.navbar > div.dropdown {
	transition: all 0.5s ease;
}
.link:hover,
.navbar > div.dropdown:hover {
	transform: translateY(3px);
}
.link:hover > a,
.navbar > div.dropdown:hover > div.dropdown > button.dropbtn > span {
	background: linear-gradient(-90deg, #aa1fff, #2ba1ff);
	background-clip: text;
	text-fill-color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.navbar > div.dropdown:hover > div.dropdown > button.dropbtn > svg {
	stroke: #aa1fff;
}
@media (max-width: 1200px) {
	.navbar {
		padding: 0 2rem;
	}
}
@media (max-width: 1210px) {
	.logo {
		margin-top: 0;
	}
	section.nav {
		max-width: 100%;
	}
	nav.top,
	.navbar {
	}
	nav.top {
		justify-content: space-between;
		gap: 14px;
		padding: 0 1rem;
	}
	.navbar {
		margin-top: -10px;
	}
}

@media (max-width: 1024px) {
	.navbar {
		display: none;
	}
	.logo {
		margin-top: 10px;
	}
}
</style>
