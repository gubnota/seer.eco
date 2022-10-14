<template>
	<div class="modal" style="display: none">
		<div class="message-container">
			<div class="actual-message">
				<h2>Coming soon</h2>
				<!-- <div class="close-button close_modal">&times;</div> -->
				<!-- <button class="close_modal">OK</button> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Modal',
}
</script>

<style scoped>
/*--------------------- MODAL & POP-UP ----------------------*/

.message-container {
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: Arial, Helvetica, sans-serif;
}

.actual-message {
	font-size: 1.5em;
	line-height: 1.5em;
	max-width: calc(100% - 1rem);
	width: 500px;
	background: white;
	padding: 20px;
	text-align: center;
	opacity: 1;
	flex: 0;
	margin-top: 0;
	position: relative;
	border-radius: 10px;
}

.modal {
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.3);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999999;
	transition: all 0.4s ease;
}

.close-button {
	position: absolute;
	top: -20px;
	right: -20px;
	color: #545454;
	background: #aa1fff;
	color: white;
	padding: 15px;
	border: 10px solid white;
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	line-height: 0;
	cursor: pointer;
	font-size: 1.5em;
}

.message-container p {
	line-height: 2em;
	font-weight: 400;
}

.message-container h2 {
	text-transform: none;
	/* margin-top: 20px; */
	font-size: 2rem;
}

.message-container .free {
	color: #aa1fff;
	font-size: 2rem;
	font-weight: bold;
}

.message-container .link-button-dark {
	margin-bottom: 0;
}
/* .message-container button {
	cursor: pointer;
	border: none;
	margin-top: 3rem;
	background-color: #AA1FFF;
	color: white;
	font-size: 1rem;
	border-radius: 8px;
	padding: 0.8rem 1.4rem;
} */
@media (max-width: 1023px) {
	.actual-message {
		padding: 10px;
		max-width: calc(100% - 20rem);
	}
	.message-container .actual-message h2 {
		font-size: 1.5rem;
	}
}
</style>
