export const Login = [
	{ name: 'contents', type: 'string' },
	{ name: 'node', type: 'string' },
	{ name: 'action', type: 'string' },
	{ name: 'nonce', type: 'uint256' },
	{ name: 'stamp', type: 'uint256' },
]
export const Vote = [
	{ name: 'contents', type: 'string' },
	{ name: 'action', type: 'string' },
	{ name: 'nonce', type: 'uint256' },
	{ name: 'stamp', type: 'uint256' },
	{ name: 'id', type: 'uint256' },
	{ name: 'result', type: 'bool' },
]
export const NodeWithdraw = [
	{ name: 'contents', type: 'string' },
	{ name: 'node', type: 'string' },
	{ name: 'action', type: 'string' },
	{ name: 'nonce', type: 'uint256' },
	{ name: 'stamp', type: 'uint256' },
	{ name: 'token', type: 'string' },
]
export const EIP712Domain = [
	{ name: 'name', type: 'string' },
	{ name: 'version', type: 'string' },
	{ name: 'chainId', type: 'uint256' },
	{ name: 'verifyingContract', type: 'address' },
]

export const verifyingContractDev = '0x6c106583B7079794Aa80F947FC09FEbc5276c9C5'
export const verifyingContract = '0x6c106583B7079794Aa80F947FC09FEbc5276c9C5'
export const contents =
	'This request will not trigger a blockchain transaction or cost any gas fees.'

export const servers = {
	business: {
		local: 'http://192.168.0.201:9993/',
		dev: 'https://devhost.seer.eco/',
		release: '',
	},
	user: {
		local: 'http://192.168.0.201:9973/',
		dev: 'https://dev.seer.eco/',
		release: 'https://stat.seer.eco/',
	},
}

export type daoInfoT = {
	isDao: boolean
	remainTimes: number
	configs: {
		dsnContract: string
		retryTimes: number
		passScore: number
		voteHours: number
		dsnHoldDay: number
	}
	steps?: {
		holdDSN: boolean
		twitter: boolean
	}
}

export type eventT = {
	showId: number
	eventId: string
	classify: string
	topic: string
	voteResult: number
	setupTime: string
	voteRate: number
	spaceLogo: string
	spaceName: string
	showType: string
}
export type eventListT = {
	daoVoteHours?: number
	total: number
	list: [eventT]
}

export type eventDetailT = {
	interestedCount: number
	userName: string // 2nd user (user)
	userLogo: string
	spaceLogo: string
	spaceName: string // 1st user (creator)
	spaceUrl: string
	status: string //'waiting' => Happening now
	hasAoe: boolean
	hasAds: boolean
	classify: string //DAO
	startTime: string //'2022-11-08 09:00:00'
	endTime: string //'2022-11-09 10:00:00'
	cover: string // background
	video: string
	location: string //'场所'
	topic: string //'标题'
	detail: string //'详细内容'
}

export enum eventTab {
	Waiting = 0,
	Pass = 1,
	Reject = 2,
}
export type eventListParams = {
	tab: eventTab
	from: number
	limit: number
}

export type networkType = {
	chainId: string
	chainName: string
	rpcUrls: [string]
	nativeCurrency: {
		name: string
		symbol: string
		decimals: number
	}
	blockExplorerUrls: [string]
}

export const PolygonDev = {
	chainId: '0x13881',
	chainName: 'Polygon Mumbai Testnet',
	rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
	nativeCurrency: {
		name: 'Mumbai Matic',
		symbol: 'MATIC',
		decimals: 18,
	},
	blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
}
export const Polygon = {
	chainId: '0x1', //'0x89',
	chainName: 'Ethereum Mainnet', //'Polygon Mainnet',
	rpcUrls: [
		'https://rpc.ankr.com/eth',
		'https://api.securerpc.com/v1',
		// 'https://polygon-rpc.com/',
		// 'https://polygon-mainnet-public.unifra.io',
		// 'https://rpc.ankr.com/polygon',
	],
	nativeCurrency: {
		name: 'Ethereum', //'Mumbai Matic',
		symbol: 'ETH', //'MATIC',
		decimals: 18,
	},
	blockExplorerUrls: ['https://polygonscan.com/'],
}

export const web3js2NetDev = 'https://rpc.ankr.com/eth' // 'https://matic-mumbai.chainstacklabs.com'
export const web3js2Net = 'https://rpc.ankr.com/eth' //'https://cloudflare-eth.com', 'https://eth-mainnet-public.unifra.io',
export const locationLinkDev = 'app.seer.eco' //dev
export const locationLink = 'app.seer.eco'
export const payDev = 'https://rpc.ankr.com/eth_goerli' // for /pay page and dsn related paycontroller
export const pay = 'https://rpc.ankr.com/eth_goerli' //
export const eth = 'https://rpc.ankr.com/eth' // main network for non-Metamask browsers
export const ethDev = 'https://rpc.ankr.com/eth' // main network for non-Metamask browsers
