const menu = [
	{ name: 'Launch App', hash: '/coming-soon', children: false },
	{
		name: 'Ecology',
		hash: false,
		children: [
			{ name: 'SDID', hash: 'https://sdid.seer.eco/' },
			{ name: 'NFT', hash: '/coming-soon' },
			{ name: 'DAO', hash: '/coming-soon' },
			{ name: 'AD Services', hash: '/coming-soon' },
		],
	},
	{
		name: 'Community',
		hash: false,
		children: [
			{ name: 'Twitter', hash: 'https://twitter.com/SeerFoundation' },
			{ name: 'Discord', hash: 'https://discord.gg/zpy6tXP5Qt' },
			{ name: 'Telegram', hash: 'https://t.me/seer_official' },
			{ name: 'Medium', hash: 'https://medium.com/@SeerFoundation' },
		],
	},
	{
		name: 'Support',
		hash: false,
		children: [
			{ name: 'Document', hash: '/coming-soon' },
			{ name: 'Dev Support', hash: '/coming-soon' },
			{ name: 'Dev Community', hash: '/coming-soon' },
		],
	},
]
const footer = {
	aside: {
		h2: 'A Powerful Social Assistant',
		nav: { flag: '/09footer/en.png', lang: 'English' },
	},
	navigation: [
		{
			header: 'Product',
			items: [
				{ name: 'Litepaper', hash: '/asset/litepaper.png' },
				{ name: 'Download', hash: '/coming-soon' },
				{ name: 'NFT', hash: '/coming-soon' },
				{ name: 'SDID', hash: 'https://sdid.seer.eco/' },
				{ name: 'ADS', hash: '/coming-soon' },
			],
		},
		{
			header: 'Developers',
			items: [
				{ name: 'Documents', hash: '/coming-soon' },
				{ name: 'Github', hash: '/coming-soon' },
				{ name: 'Safety', hash: '/coming-soon' },
				{ name: 'StreamKit', hash: '/coming-soon' },
				{ name: 'Q&A', hash: '/coming-soon' },
			],
		},
		{
			header: 'Governance',
			items: [
				{ name: 'Apply for IDO', hash: '/coming-soon' },
				{ name: 'SEER DAO', hash: '/coming-soon' },
				{ name: 'Overview', hash: '/coming-soon' },
				{ name: 'Forum', hash: '/coming-soon' },
				{
					name: 'Brand Kit',
					hash: 'https://www.figma.com/file/bAfVSpnLjzSRSWidF3YOrS/Project-Seer-Brand-Kit?node-id=3%3A347',
				},
			],
		},
		{
			header: 'Help',
			items: [
				{ name: 'Support', hash: '/coming-soon' },
				{ name: 'Terms & Conditions', hash: '/user.html' },
				{ name: 'Cookie Settings', hash: '/coming-soon' },
				{ name: 'Privacy', hash: '/privacy.html' },
				{ name: 'Guidelines', hash: '/coming-soon' },
				{ name: 'Licenses', hash: '/coming-soon' },
			],
		},
	],
}
export { menu, footer }
