import Page1 from './pages/page.vue'
import Page2 from './pages/page2.vue'
import Page3 from './pages/page3.vue'
import Main from './pages/main.vue'
import Nft from './components/main/Nft.vue'

const routes = [
	{ path: '/', component: Main },
	{ path: '/nft', component: Nft },
	{
		path: '/sdid',
		beforeEnter: () => {
			location.href = '/'
			window.open('https://sdid.seer.eco', '_blank')
		},
	},
	{
		path: '/asset/litepaper.png',
		beforeEnter: () => {
			location.href = '/'
			window.open('/asset/litepaper.png', '_blank')
		},
	},
	{
		path: '/brandkit',
		beforeEnter: () => {
			// location.href =
			//
			location.href = '/'
			window.open(
				'https://www.figma.com/file/bAfVSpnLjzSRSWidF3YOrS/Project-Seer-Brand-Kit?node-id=3%3A347',
				'_blank'
			)
		},
	},

	{ path: '/page1', component: Page1 },
	{ path: '/page2', component: Page2 },
	{ path: '/page2/page3.html', component: Page3 },
]

export default routes
