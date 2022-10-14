<template>
	<div id="wrapper">
		<div class="part part1">
			<div class="col">
				<h1 class="header">Make encounters<br />More Valuable</h1>
				<div class="sub">WEB3 Social Value Discovery Protocol</div>
				<div class="badges">
					<div class="row">
						<div class="appstore badge" @click="comingSoon">
							<img src="/01head/apple.png" alt="AppStore" />
							<p>Download on the <br />AppStore</p>
						</div>
						<div class="google badge" @click="comingSoon">
							<img src="/01head/google.png" alt="Google" />
							<p>Download on the <br />Google Play</p>
						</div>
					</div>
					<div class="row">
						<div class="apk badge" @click="comingSoon">
							<img src="/01head/apk.png" alt="Apk Android" />
							<p>
								Download for<br />
								Apk
							</p>
						</div>
						<div class="chrome badge" @click="comingSoon">
							<!-- https://chrome.google.com/webstore/detail/seer-chat/enjolihhaijimgfaedhiilljgcooocgm -->
							<img src="/01head/chrome.png" alt="Chrome" />
							<p>Add to <br />Chrome</p>
						</div>
					</div>
				</div>
			</div>
			<div class="col"></div>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>
#wrapper {
	flex: 1;
	max-width: 1120px;
	content: '&nbsp;';
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	z-index: 5;
	overflow: visible;
}

.part1 {
	padding-top: 194px;
	display: flex;
	flex-direction: row;
	/* overflow: visible !important; */
	overflow-x: hidden;
	max-width: 100vw;
}
.part1 .col {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.part1 .col:first-child {
	z-index: 2;
	flex: 693;
}
.part1 .col:last-child {
	overflow-x: hidden;
	flex: 608;
}
.part1 .row {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	gap: 26px;
}

.part1 .header {
	font-weight: 600;
	font-size: 64px;
	font-stretch: expanded;
	grid-area: header;
	font-family: Poppins;
	width: 574px;
	color: #1f2226;
	line-height: 123%;
}
.part1 .sub {
	width: 6475px;
	font-size: 25px;
	grid-area: sub;
	align-self: flex-start;
	text-align: left;
	line-height: 2rem;
	font-weight: 600;
	margin: 5px 0 5px 0;
	color: #aa1fff;
}
.part1 .sub,
.part1 .header {
	text-shadow: 1px 0 #ffffff, 0 0 1px #ffffff, -1px -1px 0 #ffffff,
		-1px 1px 0 #ffffff, 1px -1px 0 #ffffff;
}
.part1 .badges {
	margin: 36px 0 42px 0;
}

.part1 .image {
	flex: 1;
	height: 600px;
	grid-area: image;
	object-fit: scale-down;
	overflow: hidden;
}

.part1 .badge {
	width: 226px;
	height: 76px;
	background-color: #ffffff;
}
.part1 .appstore {
	grid-area: appstore;
}
.part1 .google {
	grid-area: google;
}
.part1 .apk {
	grid-area: apk;
}
.part1 .chrome {
	grid-area: chrome;
}
.part1 .empty {
	grid-area: empty;
}
.part1 .badge {
	cursor: pointer;
	text-decoration: none;
	padding: 13.0016px 15.0016px;
	border-radius: 8px;
	margin: 9px 0;
	display: flex;
	flex-direction: row;
	color: rgba(136, 136, 136, 0.519);
	font-size: 1.1rem;
	box-shadow: 0 0 2px rgba(136, 136, 136, 0.219);
	transition: all 0.4s ease-in-out;
}
.part1 .badge:hover {
	background-color: #aa1fff;
	background: linear-gradient(96.45deg, #346dff 0%, #aa1fff 100%);
	backdrop-filter: blur(2px);
	color: white !important;
	transform: translateY(-3px) !important;
}
.part1 .badge:hover p {
	color: white !important;
}
.part1 .badge:active {
	transform: translateY(3px) !important;
}
.part1 .badge:hover img {
	filter: contrast(8) invert(1);
}
.part1 .badge img {
	width: 24px;
	align-self: center;
	margin-right: 26px;
}
.part1 .badge p {
	flex: 3;
	line-height: 150%;
	align-self: center;
	font-size: 14px;
	color: #999;
}
.part1 strong {
	font-weight: bold;
}

@media (max-width: 1200px) {
	#wrapper {
		width: 100vw;
		padding: 0 0;
		overflow-x: hidden;
	}

	.part1 .sub,
	.part1 .header {
		width: 90vw;
	}
	.part1 .col {
		padding: 0 1rem;
	}
}
@media (min-width: 1555px) {
	.part1 .image {
		display: none;
	}
}
@media (max-width: 900px) {
	.logo {
		/* margin-top: 6px; */
	}
	.top {
		display: none;
	}
	.top ul {
		align-items: center;
		flex-direction: column;
	}
	.top ul li {
		align-self: stretch;
		line-height: 2.4rem;
		margin-left: 3rem;
		margin-right: 3rem;
	}
	.top ul li a {
		display: block;
	}
	.top ul li:last-child,
	.top ul li:first-child {
		flex: 1;
		text-align: initial;
	}
	.top ul li:last-child {
		border-bottom: 1px solid #2481e2;
	}
	.part1 .badge {
		width: 203px;
		height: 63px;
	}
	.part1 {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.part1 .image {
		justify-self: center;
	}
}

@media (max-width: 550px) {
	.part1 {
		padding-top: 5.25rem;
	}
	.part1 .badge {
		width: 63px;
		height: 63px;
		padding: 13px 17px;
	}

	.part1 .col {
		justify-content: flex-start;
		flex-direction: column;
		max-width: 90vw;
	}
	.part1 .row {
		flex-direction: row;
		gap: 26px;
	}
	.part1 .badges {
		margin: 0;
		flex-direction: row;
		display: flex;
		gap: 0 26px;
		position: absolute;
		top: 500px;
		left: 18px;
		justify-self: center;
		align-self: center;
	}
	.part1 .header {
		font-size: 32px;
	}
	.part1 .col .sub {
		/* font-size: 1.05rem !important;
		max-width: 40vw; */
		line-height: 140%;
	}
	.part1 .badge p {
		display: none;
	}

	.part1 .badges {
		margin: 10px 0 42px 0;
	}
	.part1 .badge {
	}
	.part1 {
		padding-top: 3.875rem;
		min-height: 570px;
	}
}
</style>
