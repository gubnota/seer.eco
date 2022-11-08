import zh from './ui_zh.json'
import en from './ui_en.json'
type word = {
	k: String
	v: String
}
type dic = word[]

let ui_zh: dic = zh
let ui_en: dic = en

export class ui {
	public lang = 'en'
	_(k: String) {
		return this.lang == 'en' ? k : ui_zh[`${k}`] ? ui_zh[`${k}`] : k
	}
}
export { ui_zh, ui_en }
