import Page1 from './pages/page.vue'
import Page2 from './pages/page2.vue'
import Page3 from './pages/page3.vue'
import Main from './pages/main.vue'
import Dao from './pages/dao.vue'
import Test from './pages/test.vue'
import QA from './pages/qa.vue'
import Reviewer1 from './pages/Reviewer1Conditions.vue'
import Reviewer2 from './pages/Reviewer2TestIntro.vue'
import Reviewer3 from './pages/Reviewer3Test.vue'
import Reviewer from './pages/Reviewer.vue'
import Reviewer4 from './pages/Reviewer4Result.vue'
import IncentiveCenter from './pages/IncentiveCenter.vue'
import PageNotFound from './pages/404.vue'
import Dsn from './pages/dsn.vue'
import MyDsn from './pages/my_dsn.vue'
import Nft from './components/main/Nft.vue'
import { comingSoon } from './common/helper'
import Pay from './pages/pay.vue'
import { router } from './main'
export const openLink = (link: string, noNeedBack: boolean = true) => {
	let prev = window.location.hash
	window.open(link, '_blank')
	// window.router = router
	if (!noNeedBack) {
		setTimeout(() => {
			router.back()
		}, 10)
	}
	// router.forward()
	// location.href = prev
	// router.go(-1)
	return
}
const extLink = (link: string) => {
	return openLink(link, false)
}
const routes = [
	{
		path: '/',
		component: Main,
	},
	// { path: '/nft', component: Nft },
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
			return extLink('https://sdid.seer.eco')
		},
	},
	{
		path: '/asset/litepaper.png',
		beforeEnter: () => {
			return extLink('/asset/litepaper.png')
		},
	},
	{
		path: '/seer_user.html',
		beforeEnter: () => {
			return extLink('/seer_user.html')
		},
	},
	{
		path: '/seer_q_and_a.html',
		beforeEnter: () => {
			return extLink('/seer_q_and_a.html')
		},
	},
	{
		path: '/seer_privacy.html',
		beforeEnter: () => {
			return extLink('/seer_privacy.html')
		},
	},
	{
		path: '/seer_dao.html',
		beforeEnter: () => {
			return extLink('/seer_dao.html')
		},
	},
	{
		path: '/seer_space.html',
		beforeEnter: () => {
			return extLink('/seer_space.html')
		},
	},

	{
		path: '/brandkit',
		beforeEnter: () => {
			return extLink(
				'https://www.figma.com/file/bAfVSpnLjzSRSWidF3YOrS/Project-Seer-Brand-Kit?node-id=3%3A347'
			)
		},
	},

	{ path: '/page1', component: Page1 },
	// { path: '/page2', component: Page2 },
	// { path: '/page2/page3.html', component: Page3 },
	{ path: '/dao', component: Dao },
	{ path: '/reviewer', component: Reviewer },
	{ path: '/reviewer/conditions', component: Reviewer1 },
	{ path: '/reviewer/intro', component: Reviewer2 },
	{ path: '/reviewer/test', component: Reviewer3 },
	{ path: '/reviewer/success', component: Reviewer4, props: { passed: true } },
	{ path: '/reviewer/failure', component: Reviewer4, props: { passed: false } },
	{ path: '/:pathMatch(.*)*', component: PageNotFound },
	{ path: '/incentive-center', component: IncentiveCenter },
	{ path: '/dsn', component: Dsn },
	{ path: '/my_dsn', component: MyDsn },
	{ path: '/pay', name: 'pay', component: Pay, props: true },
]

export default routes
