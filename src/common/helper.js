const comingSoon = () => {
	document.querySelector('.modal').style.display = ''
	setTimeout(() => {
		document.querySelector('.modal').style.display = 'none'
	}, 1000)
}

export { comingSoon }
