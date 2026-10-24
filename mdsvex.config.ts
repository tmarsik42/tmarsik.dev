import { escapeSvelte, type MdsvexOptions } from 'mdsvex';
import { createHighlighter } from 'shiki';
import {
	transformerMetaHighlight,
	transformerNotationDiff,
	transformerNotationHighlight
} from '@shikijs/transformers';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkFootnotes from 'remark-footnotes';

// Add a language here when a post needs it
const highlighter = await createHighlighter({
	themes: ['github-dark', 'github-light'],
	langs: ['ts', 'js', 'svelte', 'html', 'css', 'json', 'bash', 'yaml', 'diff', 'graphql', 'text']
});

export const mdsvexOptions: MdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [remarkFootnotes],
	// mdsvex types still expect unified 9, these plugins work fine at runtime
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'append',
				properties: { class: 'anchor', 'aria-label': 'Link to this section' },
				content: { type: 'text', value: '#' }
			}
		]
	] as unknown as MdsvexOptions['rehypePlugins'],
	highlight: {
		highlighter(code, lang, meta) {
			const html = highlighter.codeToHtml(code, {
				lang: lang ?? 'text',
				meta: { __raw: meta ?? '' },
				themes: { dark: 'github-dark', light: 'github-light' },
				defaultColor: false,
				transformers: [
					transformerNotationDiff(),
					transformerNotationHighlight(),
					transformerMetaHighlight()
				]
			});
			return `{@html \`${escapeSvelte(html)}\`}`;
		}
	}
};
