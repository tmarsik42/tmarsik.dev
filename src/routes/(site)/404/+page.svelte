<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.ts';
</script>

<svelte:head>
	<title>Page not found | {site.title}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<h1>Page not found</h1>
<p>There's nothing at this address. It may have moved, or the link has a typo.</p>
<p><a href={resolve('/(site)')}>Back to the homepage</a></p>
