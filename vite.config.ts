import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join, parse, resolve, dirname } from 'path'
import { exit } from 'process'
import svgLoader from 'vite-svg-loader'
// import child_process from 'child_process'
const root = resolve(__dirname, '')
const outDir = resolve(__dirname, 'dist')
const a = new Date()
const b = `${a.getFullYear()}.${a.getMonth()}.${a.getDate()}-${a.getHours()}_${a.getMinutes()}`
console.log(`seer.eco_${b}`)
// child_process.exec(`open "${outDir}"`)

console.log(root)
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svgLoader(),
		vue({
			template: {
				transformAssetUrls: {
					includeAbsolute: false,
				},
				compilerOptions: {
					isCustomElement: (tag) => {
						return [
							'blockss',
							'block',
							'part',
							'ill',
							'val',
							'key',
							'stroke',
							'heading',
							'box',
							'action',
						].includes(tag) //tag.startsWith('ion-') // (return true)
					},
				},
			},
		}),
	],
	// root: './src',
	base: '/',
	// root,
	build: {
		outDir,
		emptyOutDir: true,
		rollupOptions: {
			// input: {
			// main: resolve(root, 'index.html'),
			// q_a: resolve(root, 'footer', 'q_a.html'),
			// 		'index.html': resolve(__dirname, 'index.html'),
			// 		'/page2/index.html': resolve(__dirname, 'src/page2/index.html'),
			// 		'page2/page3.html': resolve(__dirname, 'page2/page3.html'),
			// },
			// output: [
			// {
			// 	name: 'q_a',
			// 	paths: { main: 'index2.html' },
			// },
			// 		'index.html': 'index.html',
			// 		'page2/index.html': 'page2/index.html',
			// 		'page2/page3.html': 'page2/page3.html',
			// ],
		},
	},
	publicDir: './public',
	server: {
		watch: {
			usePolling: true,
		},
	},
})

function entryPoints(...paths) {
	const entries = paths.map(parse).map((entry) => {
		const { dir, base, name, ext } = entry
		const key = join(dir, name)
		const path = resolve(root, dir, base)
		console.log('entryPoints', entry, key, path)
		return [key, path]
	})

	const config = Object.fromEntries(entries)
	return config
}
