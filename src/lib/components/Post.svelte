<script lang="ts">
	import type { Snippet } from 'svelte';
	import { formatDate, labelOf, type Entry } from '#lib/content.ts';
	import { site } from '#lib/site.ts';

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

<svelte:head>
	<title>{entry.title} · {site.title}</title>
	<meta name="description" content={entry.description} />
</svelte:head>

<article>
	<header class="post-header">
		<p class="eyebrow">
			{labelOf(entry)} · <time datetime={entry.date.toISOString()}>{formatDate(entry.date)}</time>
		</p>
		<h1>{entry.title}</h1>
		<p class="lede">{entry.description}</p>
		{@render meta?.()}
	</header>

	<div class="prose">
		{@render children()}
	</div>
</article>
