<template>
	<div
		class="detail"
		ref="detail"
		:style="`left:${left}px;top:${top}px;`"
		:class="{ short: !ui.cover }"
	>
		<div class="bg" v-if="ui.video">
			<video autoplay muted loop playsinline id="bgdetailvideo">
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
		<div class="main">
			<div class="time">
				<span class="pic"><Calendar /></span>
				<span class="value ellipsis">Happening now</span>
			</div>
			<div class="desc ellipsis">
				{{ ui2(ui.detail, 120) }}
			</div>
			<div class="username">
				<span class="pic" v-if="ui.spaceLogo || ui.userpicSample"
					><img :src="ui.spaceLogo || ui.userpicSample"
				/></span>
				<span class="value ellipsis">{{ ui.spaceName }}</span>
			</div>
			<div class="location">
				<span class="pic"><Geo /></span>
				<span class="value ellipsis"
					><a :href="ui.spaceUrl || '	'" target="_blank">{{
						ui.spaceUrl || ''
					}}</a></span
				>
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
			<div class="desc2 ellipsis">
				{{ ui2(ui.detail, 126) }}
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

export default {
	computed: {
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
				interestedCount: (d && d.interestedCount) || '',
				userName: (d && d.userName) || '',
				openSpace: (d && d.openSpace) || '',
				userLogo: (d && d.userLogo) || '',
			}
		},
	},
	data() {
		return {
			detailSample,
			userpicSample,
			classify: '', //DAO
			cover: '',
			detail: '',
			endTime: '',
			hasAds: false,
			hasAoe: false,
			interestedCount: 0, //1
			location: '', //"场所"
			spaceLogo: '',
			spaceName: '', //"Windows"
			spaceUrl: '', //"https://app.seer.eco/#/room/!wLVoJfsqeCwhGRSqJo:genesis.seer.eco"
			startTime: '', //"2022-11-08 09:00:00"
			status: '', //"ongoing"
			topic: '', //"标题"
			userLogo: '',
			userName: '',
			video: '',
		}
	},
	mounted() {
		console.log(this.$store.state.eventDetail)

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
			this.$store.dispatch('save', {
				k: 'detail',
				v: false,
			})
			this.$store.dispatch('save', {
				k: 'eventDetail',
				v: false,
			})
		},
	},
}
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
	width: 100%;
	padding: 20px 16px;
	display: flex;
	flex-direction: column;
	margin-top: 6px;
	align-items: flex-start;
}
.main > div {
	flex: 1;
	display: flex;
	flex-direction: row;
	gap: 2px;
	align-items: center;
}

.main > .time {
	color: #17bb7f;
	font-size: 15px;
	font-weight: 600;
	gap: 8px;
}
.main > .desc {
	font-size: 17px;
	font-weight: 600;
	color: #1f2226;
	overflow: initial;
}
.main > .username {
	gap: 4px;
}
.main > .username .pic img,
.main > .creator .pic img {
	width: 20px;
	height: 20px;
	border-radius: 10px;
}
.main > .location {
	color: #17bb7f;
}
.main > .location a {
	text-decoration: none;
	color: #17bb7f;
}
.main > .group {
}
.main > .creator {
}
.main > .desc2 {
	overflow: initial;
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
	overflow: hidden;
	width: 544px;
}
.scroll {
	overflow: scroll;
	text-overflow: clip;
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
</style>
