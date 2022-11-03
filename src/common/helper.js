const comingSoon = () => {
	let a = document.querySelector('.modal')
	if (!a) return
	a.style.display = ''
	setTimeout(() => {
		a.style.display = 'none'
	}, 1000)
}

export { comingSoon }
