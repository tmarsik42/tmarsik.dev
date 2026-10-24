<script lang="ts">
	import type { Snippet } from 'svelte';

	let { type = 'note', children }: { type?: 'note' | 'warning'; children: Snippet } = $props();
</script>

<aside class="callout" data-type={type} aria-label={type === 'warning' ? 'Warning' : 'Note'}>
	{@render children()}
</aside>
