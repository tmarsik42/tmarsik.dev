<script lang="ts">
	import type { Snippet } from 'svelte';
	import { formatDate, labelOf, type Entry } from '#lib/content.ts';
	import { site } from '#lib/site.ts';
	import JsonLd from '#lib/components/JsonLd.svelte';
	import Seo from '#lib/components/Seo.svelte';

	let {
		entry,
		meta,
		children
	}: {
		entry: Entry;
		meta?: Snippet;
		children: Snippet;
	} = $props();
</script>

<Seo
	title={entry.title}
	description={entry.description}
	path={entry.href}
	type="article"
	image="/og/{entry.kind}/{entry.slug}.png"
/>
{#if entry.kind !== 'work'}
	<JsonLd
		schema={{
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: entry.title,
			description: entry.description,
			datePublished: entry.date.toISOString(),
			url: site.url + entry.href,
			author: { '@type': 'Person', name: site.title, url: site.url }
		}}
	/>
{/if}

<article>
	<header class="post-header">
		<p class="eyebrow">
			{labelOf(entry)}, <time datetime={entry.date.toISOString()}>{formatDate(entry.date)}</time>
		</p>
		<h1>{entry.title}</h1>
		<p class="lede">{entry.description}</p>
		{@render meta?.()}
	</header>

	<div class="prose">
		{@render children()}
	</div>
</article>
