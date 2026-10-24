<script lang="ts">
	import Post from '#lib/components/Post.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const entry = $derived(data.entry);
</script>

<Post {entry}>
	<entry.component />
</Post>
