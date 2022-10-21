<template>
	<!-- <HeadView /> -->
	<ul class="mob">
		<!-- <span class="nbox">☰</span>
		<ul class="menu-sidebar">
			<li v-for="el in $data.menu" v-bind:key="el.name">
				<router-link :to="{ path: el.hash }">{{ el.name }}</router-link>
			</li>
		</ul> -->
		<!-- <li>Open, Sesame!</li> -->
		<li class="menu-container" :class="{ opened }">
			<!-- <input id="menu-toggle" type="checkbox" @click="toggleMenu()" /> -->
			<label for="menu-toggle" class="menu-button" @click="toggleMenu">
				<svg class="icon icon-open" viewBox="0 0 24 24">
					<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
				</svg>
				<svg class="icon icon-close" viewBox="0 0 100 100">
					<path
						d="M83.288 88.13c-2.114 2.112-5.575 2.112-7.69 0L53.66 66.188c-2.113-2.112-5.572-2.112-7.686 0l-21.72 21.72c-2.114 2.113-5.572 2.113-7.687 0l-4.693-4.692c-2.114-2.114-2.114-5.573 0-7.688l21.72-21.72c2.112-2.115 2.112-5.574 0-7.687L11.87 24.4c-2.114-2.113-2.114-5.57 0-7.686l4.842-4.842c2.113-2.114 5.57-2.114 7.686 0l21.72 21.72c2.114 2.113 5.572 2.113 7.688 0l21.72-21.72c2.115-2.114 5.574-2.114 7.688 0l4.695 4.695c2.112 2.113 2.112 5.57-.002 7.686l-21.72 21.72c-2.112 2.114-2.112 5.573 0 7.686L88.13 75.6c2.112 2.11 2.112 5.572 0 7.687l-4.842 4.84z"
					/>
				</svg>
			</label>
			<ul class="menu-sidebar">
				<li
					v-for="(el, j) in $data.menu"
					v-bind:key="el.name"
					:class="{
						active:
							(this.$store.state.MobileMenu &&
								this.$store.state.MobileMenu[j]) ||
							false,
					}"
				>
					<ul v-if="el.children" class="sub">
						<li class="head" @click="groupHandler(j)" :data-i="j">
							<span>{{ el.name }}</span>
							<svg
								class="icon chevron-right"
								v-if="el.children"
								fill-rule="evenodd"
								clip-rule="evenodd"
								viewBox="0 0 298 511.93"
							>
								<path
									fill-rule="nonzero"
									d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"
								/>
							</svg>
						</li>
						<li v-for="el2 in el.children" v-bind:key="el.name" class="sub">
							<router-link :to="{ path: el2.hash }" @click="toggleMenu">{{
								el2.name
							}}</router-link>
						</li>
					</ul>
					<router-link v-else :to="{ path: el.hash }" @click="toggleMenu">{{
						el.name
					}}</router-link>
				</li>
			</ul>
		</li>
	</ul>
</template>

<script lang="ts">
// import { ref } from 'vue'
declare const document: any, window: any
import { defineComponent } from 'vue'
import { menu } from '../common/contents'
import store from '../store'

export default defineComponent({
	name: 'MobileNav',
	data() {
		return {
			opened: false,
			menu,
		}
	},
	mounted() {
		//this.$store.state.MobileMenu[i]
		store.dispatch('save', {
			k: 'MobileMenu',
			v: new Array(menu.length).fill(false),
		})
	},
	methods: {
		toggleMenu(evt) {
			console.log(evt.target, 'toggleMenu')
			this.opened = !this.opened
			if (this.opened) {
				document.querySelector('body').setAttribute('style', 'overflow:hidden')
			} else {
				document.querySelector('body').setAttribute('style', 'overflow:auto')
			}
		},
		groupHandler(sel_id, evt) {
			store.dispatch('save', {
				k: 'MobileMenu',
				v: this.$store.state.MobileMenu.map(function (val, id) {
					if (id == sel_id) return !val
					else {
						return false
					}
				}),
			})
		},
	},
})
</script>

<style scoped>
* {
	-webkit-tap-highlight-color: transparent;
}
.opened {
	transition: any 0.3s cubic-bezier(0, 0, 0.3, 1);
}

ul.menu-sidebar {
	overflow-y: scroll;
}
ul.menu-sidebar li.sub {
	background: white;
}
ul.menu-sidebar > li > ul {
	width: 100%;
}
li {
	font-weight: normal;
}
li.head {
	font-size: 1.2rem;
	font-weight: 600;
	cursor: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}
.menu-sidebar > li {
	font-weight: 600;
	padding-left: 20px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.menu-sidebar {
	transition: any 0.3s cubic-bezier(0, 0, 0.3, 1);
	display: block;
	width: 100vw;
	bottom: 0;
	background: white;
	color: #333;
	position: fixed;
	transform: translateX(100%);
	transition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);
	top: 70px;
	z-index: 2;
	list-style-type: none;
	padding: 0;
	left: 0;
}

.menu-sidebar .arrow {
	position: absolute;
	line-height: 50px;
	font-size: 32px;
	color: #555;
	top: 0;
	z-index: 0;
}
.menu-sidebar.left {
	left: 25px;
}
.menu-sidebar.right {
	right: 25px;
}
.menu-sidebar li {
	min-height: 55px;
	line-height: 55px;
	text-align: left;
	position: relative;
}
.menu-sidebar:hover {
}
.menu-sidebar .menu-sub {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	width: 0;
	overflow: hidden;
	background: white;
	visibility: hidden;
	transition: all 0.3s cubic-bezier(0, 0, 0.3, 1);
	border-left: 1px solid #ccc;
	list-style-type: none;
	padding: 0;
	margin: 0;
	z-index: 2;
	max-width: 400px;
}
.menu-sidebar .menu-sub li {
	overflow: hidden;
}
.menu-sidebar .menu-sub .menu-sub-title {
	padding-left: 50px;
}
.menu-sidebar .submenu-label {
	cursor: pointer;
	width: 100%;
	height: 100%;
	display: block;
}
.menu-sidebar .submenu-toggle {
	display: none;
}

.menu-sidebar .submenu-toggle.active ~ .menu-sub,
.menu-sidebar .submenu-toggle:checked ~ .menu-sub {
	width: 65vw;
	visibility: visible;
	z-index: 1;
	transition: width 0.35s cubic-bezier(0, 0, 0.3, 1);
}

.opened .menu-sidebar {
	transform: translateX(0);
}
svg.chevron-right {
	width: 18px !important;
	height: 18px !important;
	transform: rotate(90deg);
	margin-right: 40px;
}
svg.chevron-right path {
	fill: #000 !important;
}
ul.sub li.sub {
	display: none;
}
.active ul.sub li.sub {
	display: initial;
}
.active .head svg.chevron-right {
	transform: rotate(-90deg);
}
.mob {
	position: absolute;
	right: 0;
	top: 12px;
	display: none;
	color: #fff;
	padding: 0;
	margin: 0;
	cursor: auto;
	font-size: 18px;
	list-style-type: none;
}
.mob:after {
	content: '';
	display: table;
	clear: both;
}
.mob svg {
	height: 35px;
	width: 35px;
}
.mob svg path {
	fill: #646cff;
}
.mob .menu-container .icon-close {
	width: 25px;
	display: none;
}
.mob li {
	width: 100%;
	min-height: 72px;
	line-height: 72px;
	text-align: left;
	float: left;
	display: flex;
	max-width: 100vw;
	align-items: center;
}
.mob li a {
	display: block;
	color: #333;
	width: 100%;
	height: 100%;
	text-decoration: none;
	font-size: 1.2rem;
}
.mob .menu-button {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	margin: 0;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.mob .menu-button:after {
	opacity: 0;
	top: 45px;
	content: '';
	width: 100vw;
	display: block;
	position: fixed;
	height: 100vh;
	/* background: rgba(0, 0, 0, 0.5);*/
	content: '';
	pointer-events: none;
	transition: opacity 0.2s cubic-bezier(0, 0, 0.3, 1);
	transition-delay: 0.1s;
}
/* #menu-toggle {*/
/* 	display: none;*/
.mob .opened .menu-button .icon-close {
	display: block;
}
.mob .opened .menu-button .icon-open {
	display: none;
}
.mob .opened .menu-button:after {
	opacity: 1;
	pointer-events: auto;
	transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1);
}

.mob .menu-container {
	width: 65px;
	float: left;
	cursor: pointer;
	position: absolute;
	right: 0;
	display: none;
}

.nbox {
	font-size: 2.5rem;
	flex: 1;
	align-self: self-end;
}

@media (max-width: 1024px) {
	.menu-container {
		display: block !important;
	}
	.mob {
		display: block;
		height: 36px;
		width: 66px;
		z-index: 100;
	}
}
.up {
	transform: rotate(-90deg);
}
.down {
	transform: rotate(90deg);
}
@media (max-width: 480px) {
	/* .mob li {*/
	/* 	min-height: 50px;*/
	/* 	line-height: 50px;*/
	/* }*/
}
@media (min-width: 551px) and (max-width: 1024px) {
}
</style>
