import zh from './questions_zh.json'
import en from './questions_en.json'
type options = {
	k: String
	v: String
	correct?: boolean
}
type question = {
	text: String
	options: options[]
}
let questions_zh: question[] = zh
let questions_en: question[] = en

export { questions_zh, questions_en }
