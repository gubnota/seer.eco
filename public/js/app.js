window.setRadius = () => {
	window.radius =
		document.body.offsetWidth > 1200
			? document.body.offsetWidth / 3
			: document.body.offsetWidth > 580
			? document.body.offsetWidth / 2
			: document.body.offsetWidth
	return radius
}
// sticky navigation
const sticky_nav = () => {
	if (document.querySelector('.stats') === null) return
	const secNav = document.querySelector('section.nav')
	ScrollTrigger.create({
		trigger: 'section.nav',
		start: 'top bottom',
		// markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
		onToggle: (self) => {
			// const el = document.querySelector('section.nav')
			self.isActive
				? secNav.classList.remove('sticky')
				: secNav.classList.add('sticky')
		},
		// onStart: (el) => console.log('ScrollTrigger start'),
	})
	// when a page opened not from the top the func needs to be triggered
	if (window.pageYOffset && window.pageYOffset > 62) {
		secNav.classList.add('sticky')
	}
}
const create_top_nav = () => {
	if (document.querySelector('.stats') === null) return
	;[...document.querySelectorAll('section.nav .top li')].map((el, i) => {
		document.querySelector('nav.mobile ul').appendChild(el.cloneNode(true))
	}) //copy links from desktop nav menu to the mobile
	document
		.querySelector('nav.mobile a')
		.setAttribute(
			'href',
			document.querySelector('section.nav .top a').getAttribute('href')
		) //copy logo link at the website
	const ham = document.querySelector('.ham')
	const menu = document.querySelector('ul.main-menu')
	const links = menu.querySelectorAll('li')
	window.menu_loading = false
	var tl = gsap.timeline({ paused: true })
	tl.to(menu, {
		duration: 1,
		opacity: 1,
		height: '313px', // change this to 100vh for full-height menu
		ease: 'expo.inOut',
	})
	tl.from(
		links,
		{
			duration: 1,
			opacity: 0,
			y: 20,
			stagger: 0.1,
			ease: 'expo.inOut',
		},
		'-=0.5'
	)
	tl.reverse()

	ham.addEventListener('click', () => {
		if (window.menu_loading) return
		window.menu_loading = true
		tl.reversed(!tl.reversed())
		setTimeout(() => {
			window.menu_loading = false
		}, 1000)
	})
}

/* Popup Window */
window.popupIsOpened = false
window.closePopup = (e) => {
	TweenMax.to('.actual-message', 0.2, {
		marginTop: '10%',
		opacity: 0,
		ease: 'ease-in',
	})

	TweenMax.to('.modal', 0.2, {
		opacity: 0,
		onComplete: () => {
			document.querySelector('.modal').style.display = 'none'
			document.querySelector('.modal').style.opacity = '1'
			document.querySelector('.actual-message').style.opacity = '1'
			document.querySelector('.actual-message').style.marginTop = '0'
		},
	})
}

window.openPopUp = (e) => {
	if (popupIsOpened) return
	setTimeout(() => {
		closePopup()
	}, 1000)
	document.querySelector('.modal').style.display = ''
	// 2 mins don't show up this message
	// remove window after 2 sec
	TweenMax.from('.actual-message', 0.4, {
		marginTop: '10%',
		opacity: 0,
		ease: Back.easeOut,
		delay: 0.3,
	})
	TweenMax.from('.modal', 0.4, {
		opacity: 0,
		delay: 0,
	})
}

const handle_click_on_empty_links = () => {
	if (document.querySelector('.stats') === null) return
	document.querySelectorAll('a,button').forEach((el) => {
		el.onclick = (e) => {
			if (el.getAttribute('href') == '#' || el.tagName == 'BUTTON') {
				e.preventDefault()
				openPopUp()
			}
		}
	})
}
const gsap_init = () => {
	if (document.querySelector('.stats') === null) return
	gsap.registerPlugin(ScrollTrigger)

	gsap.fromTo(
		'.part1 .col h1.header',
		{
			transform: 'translateX(-100%) rotate(-20deg) scale(0.2) rotateX(-180deg)',
		},
		{
			duration: 1,
			delay: 0,
			transform: '',
			ease: 'ease-out',
		}
	)
	gsap.fromTo(
		'.badges .row .badge',
		{
			transform: 'translateX(-150%) scale(0.4) rotateY(-20deg) rotateZ(-50deg)',
		},
		{
			duration: 1,
			delay: 0,
			transform: '',
			ease: 'ease-out',
		}
	)
	gsap.fromTo(
		'.part1 .sub',
		{ transform: 'translateX(-150%) rotate(-20deg)' },
		{
			duration: 1,
			delay: 0,
			transform: '',
			ease: 'ease-out',
		}
	)

	gsap.fromTo(
		document.querySelector('.part2_n_half .props .prop1'),
		{
			transform: 'translateX(-120%)',
		},
		{
			duration: 0.8,
			transform: 'translateX(0%)',
			ease: 'ease-in-out',
			scrollTrigger: {
				//  id: `section-${index+1}`,
				trigger: document.querySelector('.part2_n_half .props .prop1'),
				start: 'top 100%',
				toggleActions: 'play none none reverse',
				// markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
			},
		}
	)

	gsap.fromTo(
		document.querySelector('.part2_n_half .props .prop2'),
		{
			transform: 'translateX(120%)',
		},
		{
			duration: 0.8,
			transform: 'translateX(0%)',
			ease: 'ease-in-out',
			scrollTrigger: {
				//  id: `section-${index+1}`,
				trigger: document.querySelector('.part2_n_half .props .prop2'),
				start: 'top 100%',
				toggleActions: 'play none none reverse',
				// markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
			},
		}
	)
	gsap.fromTo(
		document.querySelectorAll('.plans .frail'),
		{
			transform: 'scale(1.05)',
		},
		{
			duration: 0.8,
			transform: '',
			ease: 'ease-in-out',
			scrollTrigger: {
				//  id: `section-${index+1}`,
				trigger: document.querySelector('.plans .pic'),
				start: 'top 90%',
				end: 'top 0%',
				toggleActions: 'play none none reverse',
				// markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
			},
		}
	)

	gsap.fromTo(
		document.querySelectorAll('.plans .frail:first-child'),
		{
			transform: 'translateX(-100px)',
		},
		{
			duration: 0.8,
			transform: '',
			ease: 'ease-in-out',
			scrollTrigger: {
				//  id: `section-${index+1}`,
				trigger: document.querySelector('.plans .pic'),
				start: 'top 90%',
				end: 'top 0%',
				toggleActions: 'play none none reverse',
				// markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
			},
		}
	)
	gsap.fromTo(
		document.querySelector('.plans .frail:last-child'),
		{
			transform: 'translateX(100px)',
		},
		{
			duration: 0.8,
			transform: '',
			ease: 'ease-in-out',
			scrollTrigger: {
				//  id: `section-${index+1}`,
				trigger: document.querySelector('.plans .pic'),
				start: 'top 90%',
				end: 'top 0%',
				toggleActions: 'play none none reverse',
				// markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
			},
		}
	)

	tl1 = new TimelineMax({ repeat: 0, paused: true })
	tl1.from('.characteristics .progress span', 1, {
		width: '0%',
	})
	tl1.play()

	ScrollTrigger.create({
		trigger: '.plans .pic',
		endTrigger: '.space',
		start: 'bottom 100%-=100px',
		onToggle: (self) => {
			if (self.isActive) {
				tl1.play()
			} else {
				tl1.reverse()
			}
		},
		onUpdate: (self) => {},
	})

	gsap.to('.carousel .card:nth-child(1),.carousel .card:nth-child(3)', {
		duration: 1,
		y: -20,
		repeat: -1,
		yoyo: true,
		ease: 'sine.inOut',
	})
	gsap.to('.carousel .card:nth-child(6),.carousel .card:nth-child(4)', {
		duration: 1,
		delay: 0.8,
		y: -20,
		repeat: -1,
		yoyo: true,
		ease: 'sine.inOut',
	})
	gsap.to('.carousel .card:nth-child(5),.carousel .card:nth-child(2)', {
		duration: 1,
		delay: 1.2,
		y: -20,
		repeat: -1,
		yoyo: true,
		ease: 'sine.inOut',
	})

	document.querySelectorAll('.progress').forEach((el, i) => {
		const play = (el) => {
			if (el.getAttribute('playing') != null) return
			el.setAttribute('playing', true)
			if (el.getAttribute('data-width') == null)
				el.setAttribute('data-width', el.querySelector('span').style.width)
			el.querySelector('span').style.width = '0%'
			// console.log(el.getAttribute('data-width'))
			gsap
				.fromTo(
					el.querySelector('span'),
					{
						width: '0%',
					},
					{
						width: el.getAttribute('data-width'),
						duration: 0.8,
						ease: 'ease-in-out',
					}
				)
				.then(
					setTimeout(() => {
						el.removeAttribute('playing')
					}, 1000)
				)
		}
		play(el)
		el.onmouseenter = (evt) => {
			play(el)
		}
	})
}
const switch_bg_videos = () => {
	if (document.querySelector('.stats') === null) return
	const a = document.querySelector('video#bgvid')
	const b = document.querySelector('.stats').offsetTop
	const c = document.querySelector('video#bgvid')
	const d = document.createElement('source')
	window.innerWidth > 1000
		? d.setAttribute('src', './asset/bg.mp4')
		: d.setAttribute('src', './asset/mobile.mp4')
	c.style.height = `${b}px`
	a.appendChild(d)
}

// Display seer.eco on bigger screens
window.onResize = (evt) => {
	setRadius()
	// switch_bg_videos()
	return // don't append anymore: shows video
}
window.onload = () => {
	handle_click_on_empty_links()
	create_top_nav()
	addEventListener('resize', onResize)
	onResize()
	sticky_nav()
	gsap_init()
}
