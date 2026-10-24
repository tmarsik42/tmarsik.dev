<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';

	// enhanced:img can't go straight into .md, so Markdown imports the image with ?enhanced and passes it here
	let { src, alt, caption }: { src: Picture; alt: string; caption?: string } = $props();
</script>

<figure>
	<enhanced:img {src} {alt} sizes="(min-width: 68ch) 68ch, 100vw" />
	{#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>
