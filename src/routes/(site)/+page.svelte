<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.ts';
	import JsonLd from '#lib/components/JsonLd.svelte';
	import PostList from '#lib/components/PostList.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo description={site.description} path="/" />
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.title,
		url: site.url,
		email: site.email,
		sameAs: site.links.map((link) => link.url)
	}}
/>

<section class="intro" aria-labelledby="intro-title">
	<h1 id="intro-title">{site.title}</h1>
	<p class="lede">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua.
	</p>
	<p>
		Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit.
	</p>
</section>

<section id="work" aria-labelledby="work-title">
	<h2 id="work-title">Work</h2>
	{#each data.groups as group (group.category)}
		<h3>{group.label}</h3>
		<ul class="entries">
			{#each group.entries as entry (entry.slug)}
				<li>
					<a href={resolve('/(site)/work/[slug]', { slug: entry.slug })}>{entry.title}</a>
					<span class="meta">{entry.period}</span>
					<p>{entry.description}</p>
					<p class="meta">{entry.role}, {entry.stack.join(', ')}</p>
				</li>
			{/each}
		</ul>
	{/each}
</section>

<section id="writing" aria-labelledby="writing-title">
	<h2 id="writing-title">Writing</h2>
	<PostList posts={data.posts} />
	<p><a href={resolve('/(site)/writing')}>All writing</a></p>
</section>

<section id="contact" aria-labelledby="contact-title">
	<h2 id="contact-title">Contact</h2>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	<ul class="inline-list">
		<li><a href="mailto:{site.email}">{site.email}</a></li>
		{#each site.links as link (link.url)}
			<li><a href={link.url} rel="me external">{link.label}</a></li>
		{/each}
	</ul>
</section>
