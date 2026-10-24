<script lang="ts">
	import PostList from '#lib/components/PostList.svelte';
	import { posts } from '#lib/content.ts';
	import { site } from '#lib/site.ts';

	const years = Map.groupBy(posts, (post) => post.date.getUTCFullYear());
</script>

<svelte:head>
	<title>Writing · {site.title}</title>
	<meta name="description" content="Articles and short notes." />
</svelte:head>

<h1>Writing</h1>
<p class="lede">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

{#each years as [year, list] (year)}
	<h2>{year}</h2>
	<PostList posts={list} />
{/each}
