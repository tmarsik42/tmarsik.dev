<script lang="ts">
	import type { Thing, WithContext } from 'schema-dts';

	let { schema }: { schema: WithContext<Thing> } = $props();

	// Escape < so the data can't close the script tag early
	const json = $derived(JSON.stringify(schema).replaceAll('<', '\\u003c'));
	const html = $derived(`<script type="application/ld+json">${json}</` + 'script>');
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- own data, escaped above -->
	{@html html}
</svelte:head>
