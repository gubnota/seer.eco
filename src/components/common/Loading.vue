<template>
	<!-- <div class="darken"><div class="sp sp-3balls"></div></div> -->
	<div class="darken">
		<div class="loading">
			<div class="load-box">
				<img :src="this.seerLoading" /><span>Loading...</span>
			</div>
		</div>
	</div>
</template>
<script>
import seerLoading from '/src/assets/ui/seer-loading.gif'
export default {
	data() {
		return { seerLoading }
	},
}
</script>
<style scoped>
img {
	width: 90px;
	height: 90px;
}
.loading {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
}

.loading .load-box {
	background-color: rgba(0, 0, 0, 0.5);
	width: 150px;
	height: 150px;
	border-radius: 5px;
	box-shadow: 0 1px 15px rgb(0 0 0 / 50%);
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	letter-spacing: 0.8px;
	font-size: 13px;
	transform-style: preserve-3d;
}

.darken {
	background-color: rgba(0, 0, 0, 0); /*rgba(0, 0, 0, 0.3);*/
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
.sp {
	width: 32px;
	height: 32px;
	clear: both;
	position: absolute;
	left: calc(50vw - 42px);
	top: calc(50vh - 10px);
}

/* Spinner 3Balls Scale */
.sp-3balls,
.sp-3balls:before,
.sp-3balls:after {
	border-radius: 50%;
	background-color: #000;
	width: 18px;
	height: 18px;
	transform-origin: center center;
	display: inline-block;
}

.sp-3balls {
	position: relative;
	background-color: black;
	opacity: 1;
	-webkit-animation: spScaleAlpha 1s infinite linear;
	animation: spScaleAlpha 1s infinite linear;
}

.sp-3balls:before,
.sp-3balls:after {
	content: '';
	position: relative;
	opacity: 0.25;
}

.sp-3balls:before {
	left: 30px;
	top: 0px;
	-webkit-animation: spScaleAlphaBefore 1s infinite linear;
	animation: spScaleAlphaBefore 1s infinite linear;
}

.sp-3balls:after {
	left: -30px;
	top: -23px;
	-webkit-animation: spScaleAlphaAfter 1s infinite linear;
	animation: spScaleAlphaAfter 1s infinite linear;
}

@keyframes spScaleAlpha {
	0% {
		opacity: 1;
	}
	33% {
		opacity: 0.25;
	}
	66% {
		opacity: 0.25;
	}
	100% {
		opacity: 1;
	}
}

@keyframes spScaleAlphaBefore {
	0% {
		opacity: 0.25;
	}
	33% {
		opacity: 1;
	}
	66% {
		opacity: 0.25;
	}
}
@keyframes spScaleAlphaAfter {
	33% {
		opacity: 0.25;
	}
	66% {
		opacity: 1;
	}
	100% {
		opacity: 0.25;
	}
}
</style>
