<script lang="ts">
	import { siteInfo } from '$lib/config/info';

	let hoveredBlock = $state<'bio' | 'connect' | null>(null);
</script>

<div class="main-area">
	<section
		class="block bio-block {hoveredBlock === 'bio' ? 'is-hovered' : ''}"
		aria-label="Specification"
		onmouseenter={() => (hoveredBlock = 'bio')}
		onmouseleave={() => (hoveredBlock = null)}
	>
		<div class="corner-tl">A1</div>
		<div class="corner-br">BIO</div>
		<div class="block-inner">
			<h2>SPECIFICATION</h2>
			<p>{siteInfo.bio}</p>
		</div>
	</section>

	<section
		class="block connect-block {hoveredBlock === 'connect' ? 'is-hovered' : ''}"
		aria-label="Connect"
		onmouseenter={() => (hoveredBlock = 'connect')}
		onmouseleave={() => (hoveredBlock = null)}
	>
		<div class="corner-tl">B1</div>
		<div class="corner-br">LINKS</div>
		<div class="block-inner">
			<h2>CONNECT</h2>
			<ul>
				{#each siteInfo.links as link}
					<li>
						<a
							href={link.href}
							target={link.href.startsWith('http') ? '_blank' : undefined}
							rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</div>

<style>
	.main-area {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 1.5rem;
	}

	@media (max-width: 640px) {
		.main-area {
			grid-template-columns: 1fr;
		}
	}

	.block {
		position: relative;
		border: 1px solid var(--blueprint-border);
		padding: 1.25rem 1.25rem 1.5rem;
		background: var(--blueprint-surface);
		transition: border-color 0.2s ease;
	}

	.block.is-hovered {
		border-color: var(--blueprint-accent);
	}

	.block::before,
	.block::after {
		content: '';
		position: absolute;
		width: 6px;
		height: 6px;
		border: 1px solid var(--blueprint-border);
		background: var(--blueprint-surface-corner);
		transition: border-color 0.2s ease;
	}

	.block.is-hovered::before,
	.block.is-hovered::after {
		border-color: var(--blueprint-accent);
	}

	.block::before {
		top: -1px;
		left: 10px;
		border-right: none;
		border-bottom: none;
	}

	.block::after {
		top: -1px;
		right: 10px;
		border-left: none;
		border-bottom: none;
	}

	.block .corner-tl,
	.block .corner-br {
		position: absolute;
		font-size: 0.65rem;
		font-weight: 400;
		letter-spacing: 0.08em;
		color: var(--blueprint-text-muted);
	}

	.bio-block .corner-tl,
	.connect-block .corner-tl {
		top: 0.4rem;
		left: 0.6rem;
	}

	.bio-block .corner-br,
	.connect-block .corner-br {
		bottom: 0.4rem;
		right: 0.6rem;
	}

	.block-inner {
		position: relative;
	}

	.block h2 {
		font-family: 'JetBrains Mono', 'Courier New', monospace;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		margin: 0 0 0.75rem 0;
		color: var(--blueprint-text-secondary);
		border-bottom: 1px solid var(--blueprint-border-light);
		padding-bottom: 0.4rem;
	}

	.bio-block p {
		font-size: 0.9rem;
		line-height: 1.6;
		margin: 0;
		color: var(--blueprint-text);
		letter-spacing: 0.02em;
	}

	.connect-block ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.connect-block li {
		margin: 0 0 0.5rem 0;
	}

	.connect-block li:last-child {
		margin-bottom: 0;
	}

	.connect-block a {
		font-size: 0.85rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--blueprint-text);
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s, color 0.2s;
	}

	.connect-block a:hover,
	.connect-block a:focus {
		color: var(--blueprint-accent);
		border-bottom-color: var(--blueprint-accent-underline);
		outline: none;
	}
</style>
