<script lang="ts">
	import { resolve } from '$app/paths';
	import { posts, work } from '#lib/content.ts';
	import { site } from '#lib/site.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<div class="page">
	<a class="skip-link" href="#content">Skip to content</a>

	<header class="site-header">
		<a class="site-name" href={resolve('/(site)')}>{site.title}</a>
		<nav aria-label="Main">
			<ul>
				{#if work.length}
					<li><a href="{resolve('/(site)')}#work">Work</a></li>
				{/if}
				{#if posts.length}
					<li><a href={resolve('/(site)/writing')}>Writing</a></li>
				{/if}
				<li><a href="{resolve('/(site)')}#contact">Contact</a></li>
			</ul>
		</nav>
	</header>

	<main id="content">
		{@render children()}
	</main>

	<footer class="site-footer">
		<p>© {new Date().getFullYear()} {site.title}</p>
		<ul>
			<li><a href={resolve('/(site)/(pages)/colophon')}>Colophon</a></li>
		</ul>
	</footer>
</div>
