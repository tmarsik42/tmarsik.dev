<script lang="ts">
	import PostList from '#lib/components/PostList.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { posts } from '#lib/content.ts';

	const years = Map.groupBy(posts, (post) => post.date.getUTCFullYear());
</script>

<Seo title="Writing" description="Articles and short notes." path="/writing" />

<h1>Writing</h1>
<p class="lede">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

{#each years as [year, list] (year)}
	<h2>{year}</h2>
	<PostList posts={list} />
{/each}
