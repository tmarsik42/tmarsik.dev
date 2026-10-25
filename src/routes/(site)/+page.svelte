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
	<p class="lede">I'm Tadeáš, a software engineer who likes owning the whole thing.</p>
	<p>
		I design systems, write the code on both ends and keep them running in production. I care about
		understanding the layers underneath, because that's where most problems turn out to be.
	</p>
</section>

{#if data.groups.length}
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
{/if}

{#if data.posts.length}
	<section id="writing" aria-labelledby="writing-title">
		<h2 id="writing-title">Writing</h2>
		<PostList posts={data.posts} />
		<p><a href={resolve('/(site)/writing')}>All writing</a></p>
	</section>
{/if}

<section id="contact" aria-labelledby="contact-title">
	<h2 id="contact-title">Contact</h2>
	<p>
		The easiest way to reach me is email. I'm also on GitHub, npm and LinkedIn. Write me an email, I
		read everything and reply to most of it.
	</p>
	<ul class="inline-list">
		<li><a href="mailto:{site.email}">{site.email}</a></li>
		{#each site.links as link (link.url)}
			<li><a href={link.url} rel="me external">{link.label}</a></li>
		{/each}
	</ul>
</section>
