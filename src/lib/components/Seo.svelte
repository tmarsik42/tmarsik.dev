<script lang="ts">
	import { site } from '#lib/site.ts';

	let {
		title,
		description,
		path,
		type = 'website'
	}: {
		title?: string;
		description: string;
		path: string;
		type?: 'website' | 'article';
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
</svelte:head>
