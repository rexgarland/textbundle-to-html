import {unified} from 'unified'
import {remark} from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

export function markdownToHTML(markdown) {
	const full = remark()
		.use(remarkRehype)
		.use(rehypeHighlight) // decorate code blocks
		.use(rehypeStringify)
		.processSync(markdown)
	return String(full)
}