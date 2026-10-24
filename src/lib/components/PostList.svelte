<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate, type PostEntry } from '#lib/content.ts';

	let { posts }: { posts: PostEntry[] } = $props();
</script>

<ul class="post-list">
	{#each posts as post (post.href)}
		<li>
			<time datetime={post.date.toISOString()}>{formatDate(post.date)}</time>
			<span>
				<a
					href={resolve(post.kind === 'notes' ? '/(site)/notes/[slug]' : '/(site)/writing/[slug]', {
						slug: post.slug
					})}>{post.title}</a
				>
				{#if post.kind === 'notes'}<span class="tag">note</span>{/if}
				{#if post.draft}<span class="tag">draft</span>{/if}
			</span>
		</li>
	{/each}
</ul>
