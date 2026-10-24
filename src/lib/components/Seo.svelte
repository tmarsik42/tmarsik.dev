<script lang="ts">
	import { site } from '#lib/site.ts';

	let {
		title,
		description,
		path,
		type = 'website',
		image = '/og.png'
	}: {
		title?: string;
		description: string;
		path: string;
		type?: 'website' | 'article';
		image?: string;
	} = $props();

	const url = $derived(site.url + path);
</script>

<svelte:head>
	<title>{title ? `${title} · ${site.title}` : site.title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title ?? site.title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={site.url + image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title ?? site.title} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
