import fs from 'fs'
import Handlebars from 'handlebars'
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import {markdownToHTML} from './markdown.js'

export default function bundle(textBundleFile, outdir, template=null) {
	
	var markdown = fs.readFileSync(path.join(textBundleFile,'text.markdown'), 'utf8')
	const markup = markdownToHTML(markdown)

	// create output directory
	try {
		fs.mkdirSync(outdir)
	} catch (e) {}

	// get template
	if (!template) {
		template = path.join(__dirname, 'post.template.html')
	}

	// build index.html
	const templateSource = fs.readFileSync(template, 'utf8')
	const formatter = Handlebars.compile(templateSource)
	const html = formatter({markup})
	fs.writeFileSync(path.join(outdir, 'index.html'), html)

	// move assets (if they exist)
	const outAssetDir = path.join(outdir, 'assets')
	const inputAssetDir = path.join(textBundleFile, 'assets')
	try {
		fs.accessSync(inputAssetDir)
		fs.mkdirSync(outAssetDir)
		const assetFiles = fs.readdirSync(inputAssetDir)
			.filter(f=>f.slice(0,1)!=='.') // ignore hidden files, like .DS_Store
		assetFiles.forEach(assetFile=>{
			const src = path.join(inputAssetDir,assetFile)
			const dest = path.join(outAssetDir,assetFile)
			fs.copyFileSync(src,dest)
		})
	} catch {}
}