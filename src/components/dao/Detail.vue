<template>
	<div
		class="detail"
		ref="detail"
		:style="`left:${this.$store.state.detail.left}px;top:${this.$store.state.detail.top}px;`"
	>
		<div class="bg" :style="`background-image:url(${this.detailSample})`">
			<div class="close" @click="close"><Close /></div>
		</div>
		<div class="head"><h3>Event info</h3></div>
		<div class="main">
			<div class="time">
				<span class="pic"><Calendar /></span>
				<span class="value">Happening now</span>
			</div>
			<div class="desc">
				{{ d(detail).substr(0, 124) }}
			</div>
			<div class="username">
				<span class="pic"><img :src="spaceLogo || userpicSample" /></span>
				<span class="value">{{ spaceName }}</span>
			</div>
			<div class="location">
				<span class="pic"><Geo /></span>
				<span class="value"
					><a :href="spaceUrl" target="_blank">{{ spaceUrl || '' }}</a></span
				>
			</div>
			<div class="group">
				<span class="pic"><TwoUsers /></span>
				<span class="value">{{ interestedCount }} person interested</span>
			</div>
			<div class="creator">
				<span class="pic"><img :src="userLogo || userpicSample" /></span>
				<span class="value">{{ userName }}</span>
			</div>
			<div class="desc2">
				{{ this.detail.substr(0, 155) }}
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
		d(k: String) {
			if (this.$store.state.eventDetail) {
				Object.entries(this.$store.state.eventDetail).forEach(
					([key, value]) => {
						this[key] = value
					}
				)
			}
			return this.k || ''
		},
		openSpace() {
			window.open(this.spaceUrl, '_blank')
		},
		close(e) {
			this.$store.dispatch('save', {
				k: 'detail',
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
</style>
