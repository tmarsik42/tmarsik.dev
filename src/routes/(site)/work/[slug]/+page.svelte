<script lang="ts">
	import Post from '#lib/components/Post.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const entry = $derived(data.entry);
</script>

<Post {entry}>
	{#snippet meta()}
		<dl class="facts">
			<div>
				<dt>Role</dt>
				<dd>{entry.role}</dd>
			</div>
			<div>
				<dt>Period</dt>
				<dd>{entry.period}</dd>
			</div>
			<div>
				<dt>Stack</dt>
				<dd>{entry.stack.join(', ')}</dd>
			</div>
			{#if entry.links.length}
				<div>
					<dt>Links</dt>
					<dd>
						{#each entry.links as link, i (link.url)}
							{#if i > 0},
							{/if}<a href={link.url} rel="external">{link.label}</a>
						{/each}
					</dd>
				</div>
			{/if}
		</dl>
	{/snippet}

	<entry.component />
</Post>
