<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import { site } from '#lib/site.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title={site.title} href="/feed.xml" />
</svelte:head>

{@render children()}
