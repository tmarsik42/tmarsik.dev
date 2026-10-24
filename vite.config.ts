import { enhancedImages } from '@sveltejs/enhanced-img';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mdsvex } from 'mdsvex';
import { mdsvexOptions } from './mdsvex.config.ts';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				// mdsvex emits the deprecated <script context="module">
				warningFilter: (warning) =>
					!(warning.code === 'script_context_deprecated' && warning.filename?.endsWith('.md'))
			},
			preprocess: [mdsvex(mdsvexOptions)],
			extensions: ['.svelte', '.md'],
			adapter: adapter()
		})
	]
});
