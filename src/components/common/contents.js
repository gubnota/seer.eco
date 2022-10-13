const menu = [
	{ name: 'launch App', hash: '#', children: false },
	{
		name: 'Ecology',
		hash: false,
		children: [
			{ name: 'SDID', hash: 'https://sdid.seer.eco/' },
			{ name: 'NFT', hash: '#' },
			{ name: 'DAO', hash: '#' },
			{ name: 'AD Services', hash: '#' },
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
			{ name: 'Document', hash: '#' },
			{ name: 'Dev Support', hash: '#' },
			{ name: 'Dev Community', hash: '#' },
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
				{ name: 'Download', hash: '#' },
				{ name: 'NFT', hash: '#' },
				{ name: 'SDID', hash: 'https://sdid.seer.eco/' },
				{ name: 'ADS', hash: '#' },
			],
		},
		{
			header: 'Developers',
			items: [
				{ name: 'Documents', hash: '#' },
				{ name: 'Github', hash: '#' },
				{ name: 'Safety', hash: '#' },
				{ name: 'StreamKit', hash: '#' },
				{ name: 'Q&A', hash: '#' },
			],
		},
		{
			header: 'Governance',
			items: [
				{ name: 'Apply for IDO', hash: '#' },
				{ name: 'SEER DAO', hash: '#' },
				{ name: 'Overview', hash: '#' },
				{ name: 'Forum', hash: '#' },
				{
					name: 'Brand Kit',
					hash: 'https://www.figma.com/file/bAfVSpnLjzSRSWidF3YOrS/Project-Seer-Brand-Kit?node-id=3%3A347',
				},
			],
		},
		{
			header: 'Help',
			items: [
				{ name: 'Support', hash: '#' },
				{ name: 'Terms & Conditions', hash: '/user.html' },
				{ name: 'Cookie Settings', hash: '#' },
				{ name: 'Privacy', hash: '/privacy.html' },
				{ name: 'Guidelines', hash: '#' },
				{ name: 'Licenses', hash: '#' },
			],
		},
	],
}
export { menu, footer }
