import Page1 from './pages/page.vue'
import Page2 from './pages/page2.vue'
import Page3 from './pages/page3.vue'
import Main from './pages/main.vue'
import Dao from './pages/dao.vue'
import Test from './pages/test.vue'
import QA from './pages/qa.vue'
import Reviewer1 from './pages/Reviewer1.vue'
import Reviewer2 from './pages/Reviewer2TestIntro.vue'
import Reviewer3 from './pages/Reviewer3Test.vue'
import Reviewer from './pages/Reviewer.vue'
import Reviewer4 from './pages/Reviewer4Result.vue'

import PageNotFound from './pages/404.vue'
import Nft from './components/main/Nft.vue'
import { comingSoon } from './common/helper'
const routes = [
	{ path: '/', component: Main },
	{ path: '/nft', component: Nft },
	{ path: '/test', component: Test },
	{ path: '/q_and_a', component: QA },
	{
		path: '/coming-soon',
		component: Main,
		beforeEnter() {
			comingSoon()
			return false
		},
	},
	{
		path: '/sdid',
		beforeEnter: () => {
			window.open('https://sdid.seer.eco', '_blank')
			location.href = '/'
		},
	},
	{
		path: '/asset/litepaper.png',
		beforeEnter: () => {
			window.open('/asset/litepaper.png', '_blank')
			location.href = '/'
			return
		},
	},
	{
		path: '/seer_user.html',
		beforeEnter: () => {
			window.open('/seer_user.html', '_blank')
			location.href = '/'
			return
		},
	},
	{
		path: '/seer_q_and_a.html',
		beforeEnter: () => {
			window.open('/seer_q_and_a.html', '_blank')
			location.href = '/'
			return
		},
	},
	{
		path: '/seer_privacy.html',
		beforeEnter: () => {
			window.open('/seer_privacy.html', '_blank')
			location.href = '/'
			return
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
	{ path: '/dao', component: Dao },
	{ path: '/reviewer', component: Reviewer },
	{ path: '/reviewer/conditions', component: Reviewer1 },
	{ path: '/reviewer/intro', component: Reviewer2 },
	{ path: '/reviewer/test', component: Reviewer3 },
	{ path: '/reviewer/success', component: Reviewer4, props: { passed: true } },
	{ path: '/reviewer/failure', component: Reviewer4, props: { passed: false } },
	{ path: '/:pathMatch(.*)*', component: PageNotFound },
]

export default routes
