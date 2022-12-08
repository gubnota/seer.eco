<template>
	<div
		class="detail"
		ref="detail"
		:style="`left:${left}px;top:${top}px;`"
		:class="{
			short: !ui.cover,
			alt: disappearing,
			genie: appearing,
		}"
	>
		<div class="bg" v-if="ui.video">
			<video autoplay muted controls loop playsinline id="bgdetailvideo">
				<source :src="ui.video as string" id="videtailsource" />
			</video>
			<div class="close" @click="close"><Close /></div>
		</div>
		<div
			class="bg"
			:style="
				ui.cover
					? `background-image:url(${ui.cover});background-size: cover;`
					: 'background:#e0e0e0'
			"
			v-else
		>
			<div class="close" @click="close"><Close /></div>
		</div>
		<div class="head">
			<h3>Event info</h3>
			<div class="close" @click="close" v-if="!ui.cover"><Close /></div>
		</div>
		<div class="main scroll">
			<div class="contents">
				<div class="time">
					<span class="pic"><Calendar /></span>
					<span class="value ellipsis">Happening now</span>
				</div>
				<div class="desc ellipsis">
					{{ ui.topic /*ui2(, 120)*/ }}
				</div>
				<div class="username">
					<span class="pic" v-if="ui.spaceLogo || ui.userpicSample"
						><img :src="ui.spaceLogo || ui.userpicSample"
					/></span>
					<span class="value ellipsis">{{ ui.spaceName }}</span>
				</div>
				<div class="location">
					<span class="pic"><Geo /></span>
					<span class="value ellipsis">
						<a
							:href="ui.location"
							target="_blank"
							v-if="this.isLink(ui.location)"
							>{{ ui.location }}</a
						>
						<span v-else>{{ ui.location }}</span>
					</span>
				</div>
				<div class="group">
					<span class="pic"><TwoUsers /></span>
					<span class="value ellipsis"
						>{{ ui.interestedCount }} person interested</span
					>
				</div>
				<div class="creator">
					<span class="pic" v-if="ui.userLogo || ui.userpicSample"
						><img :src="ui.userLogo || ui.userpicSample"
					/></span>
					<span class="value ellipsis">{{ ui.userName }}</span>
				</div>
				<div class="desc2 ellipsis" v-html="detailHTML"></div>
			</div>
		</div>
		<div class="footer">
			<div class="join" @click="openSpace"><span>Join space</span></div>
		</div>
	</div>
</template>
<script lang="ts">
import Close from '/src/assets/dao/close.svg'
import Calendar from '/src/assets/dao/calendar.svg'
import TwoUsers from '/src/assets/dao/twousers.svg'
import Geo from '/src/assets/dao/geo.svg'
import detailSample from '/src/assets/dao/detail.jpg'
import userpicSample from '/src/assets/dao/defaultUserPic@2x.png'
import { defineComponent } from 'vue'

export default defineComponent({
	computed: {
		detailHTML() {
			if (!this.$store.state.eventDetail) return
			let text = this.$store.state.eventDetail.detail
			text = text.replace(/\n/g, '<br />')
			var expression = /(https?:\/\/[^ <]+)/gi
			var regex = new RegExp(expression)
			text = text.replaceAll(regex, '<a href="$1" target="_blank">$1</a>')
			return text
		},
		left() {
			return this.$store.state.detail.left
		},
		top() {
			return this.$store.state.detail.top
		},
		ui() {
			var d = this.$store.state.eventDetail
			return {
				cover: (d && d.cover) || '',
				video: (d && d.video) || '',
				detail: (d && d.detail) || '',
				spaceLogo: (d && d.spaceLogo) || '',
				userpicSample: (d && d.userpicSample) || '',
				spaceName: (d && d.spaceName) || '',
				spaceUrl: (d && d.spaceUrl) || '',
				location: (d && d.location) || '',
				interestedCount: (d && d.interestedCount) || '',
				userName: (d && d.userName) || '',
				openSpace: (d && d.openSpace) || '',
				userLogo: (d && d.userLogo) || '',
				topic: (d && d.topic) || '',
			}
		},
	},
	data() {
		return {
			appearing: false,
			disappearing: false,
			// detailSample,
			// userpicSample,
			// classify: '', //DAO
			// cover: '',
			// detail: '',
			// endTime: '',
			// hasAds: false,
			// hasAoe: false,
			// interestedCount: 0, //1
			// location: '', //"场所"
			// spaceLogo: '',
			// spaceName: '', //"Windows"
			// spaceUrl: '', //"https://app.seer.eco/#/room/!wLVoJfsqeCwhGRSqJo:genesis.seer.eco"
			// startTime: '', //"2022-11-08 09:00:00"
			// status: '', //"ongoing"
			// topic: '', //"标题"
			// userLogo: '',
			// userName: '',
			// video: '',
		}
	},
	mounted() {
		this.appearing = true
		setTimeout(() => {
			this.appearing = false
		}, 300)
		if (this.$store.state.eventDetail) {
			Object.entries(this.$store.state.eventDetail).forEach(([key, value]) => {
				this[key] = value
			})
		}
	},

	components: {
		Close,
		Calendar,
		TwoUsers,
		Geo,
	},
	methods: {
		isLink(url: string) {
			const isLink =
				url.substring(0, 7) === 'http://' || url.substring(0, 8) === 'https://'
			return isLink
			// return isLink ? `<a href="${url}" target="_blank">${url}</a>` : url
		},
		ui2(k: String, maxLength?: number) {
			let o = k
			if ((o as string).length > maxLength) {
				o = (o as string).substring(0, maxLength - 2) + `…`
			}
			return o || ''
		},
		openSpace() {
			window.open(this.ui.spaceUrl, '_blank')
		},
		close(e) {
			this.appearing = false
			this.disappearing = true
			setTimeout(() => {
				this.$store.dispatch('save', {
					k: 'detail',
					v: false,
				})
				this.$store.dispatch('save', {
					k: 'eventDetail',
					v: false,
				})
			}, 300)
		},
	},
})
</script>
<style scoped>
.detail {
	background-repeat: no-repeat;
	position: absolute;
	width: 600px;
	height: 683px;
	z-index: 10;
	background-color: white;
	box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	max-width: calc(100% - 12px);
}
.detail.short {
	height: 447px;
}
.detail.short .bg {
	display: none;
}
.bg {
	position: relative;
	width: 100%;
	height: 238.4px;
}
.close {
	cursor: pointer;
	position: absolute;
	top: 13px;
	right: 15px;
}
.short .close {
	top: 7px;
}
.head {
	border-bottom: 1px solid #e4e8ef;
	width: 100%;
	height: 48px;
	flex-direction: row;
	align-items: center;
	display: flex;
	padding-left: 16px;
}
h3 {
	color: #1f2226;
	font-weight: 500;
	font-size: 13px;
}
.main {
	height: 329px;
	/* width: fit-content; */
	/* padding: 20px 16px; */
	overflow-x: hidden;
}
.contents {
	display: flex;
	flex-direction: column;
	margin-top: 6px;
	align-items: flex-start;
	padding: 20px 16px;
}

.contents > div {
	flex: 1;
	display: flex;
	flex-direction: row;
	gap: 2px;
	align-items: center;
	word-break: break-all;
	margin: 1rem 0;
	width: 100%;
}

.contents > .time {
	color: #17bb7f;
	font-size: 15px;
	font-weight: 600;
	gap: 8px;
}
.contents > .desc {
	font-size: 17px;
	font-weight: 600;
	color: #1f2226;
	overflow: initial;
}
.contents > .username {
	gap: 4px;
}
.contents > .username .pic img,
.contents > .creator .pic img {
	width: 20px;
	height: 20px;
	border-radius: 10px;
	object-fit: cover;
}
.contents > .location {
	color: #17bb7f;
}
.contents > .location a {
	text-decoration: none;
	color: #17bb7f;
}
.contents > .group {
}
.contents > .creator {
}
.contents > .desc2 {
	overflow: initial;
	display: block;
	line-height: 140%;
}

.footer {
	height: 68px;
	background: #ebedef;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	padding: 18px 12px;
	border-radius: 0 0 8px 8px;
}
.join {
	cursor: pointer;
	display: flex;
	padding: 4px 14px;
	color: white;
	background: #6c747f;
	border-radius: 4px;
	font-size: 13px;
	height: 32px;
	align-items: center;
}
.join::selection {
	background-color: none;
}
.join:active {
	transform: translateY(5px);
}
.ellipsis {
	text-overflow: ellipsis;
	/* overflow: hidden; */
	width: 544px;
}
.scroll {
	/* overflow: scroll; */
	/* text-overflow: clip; */
}
/* width */
.scroll::-webkit-scrollbar {
	width: 10px;
}

/* Track */
.scroll::-webkit-scrollbar-track {
	/* box-shadow: inset 0 0 5px grey; */
	border-radius: 5px;
}

/* Handle */
.scroll::-webkit-scrollbar-thumb {
	background: #f0f0f0;
	border-radius: 5px;
}

/* Handle on hover */
.scroll::-webkit-scrollbar-thumb:hover {
	background: #e0e0e0;
}

#bgdetailvideo {
	height: 238.4px;
	width: 100%;
	/* height: 300px; */
	object-fit: cover;
	overflow-x: hidden;
}
@media (max-width: 550px) {
	.detail {
		left: 6px !important;
		max-width: calc(100vw - 12px);
		box-shadow: 4px 4px 16px 10px rgb(0 0 0 / 22%);
		height: auto;
	}
	.main > * {
		width: 100%;
	}
	.main > .location a,
	.value {
		word-break: break-word;
	}
	.ellipsis {
		overflow: visible;
	}
}

.genie {
	animation: 0.3s ease-in-out none genie;
}
.alt {
	animation: 0.5s ease-in-out none alt;
	/* animation-direction: reverse; */
}
@keyframes genie {
	from {
		opacity: 0;
		transform: scale(0.1);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}
@keyframes alt {
	from {
		opacity: 1;
		transform: scale(1);
	}
	to {
		opacity: 0;
		transform: scale(0.1);
	}
}
</style>
