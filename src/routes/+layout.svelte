<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();

	let now = $state(new Date());
	$effect(() => {
		const id = setInterval(() => {
			now = new Date();
		}, 1000);
		return () => clearInterval(id);
	});

	let scanlinesEnabled = $state(true);
	onMount(() => {
		scanlinesEnabled = localStorage.getItem('tmarsik-scanline') !== 'false';
	});
	function toggleScanlines() {
		scanlinesEnabled = !scanlinesEnabled;
		localStorage.setItem('tmarsik-scanline', String(scanlinesEnabled));
	}

	function formatDateTime(d: Date): string {
		const date = d.toISOString().slice(0, 10);
		const time = d.toTimeString().slice(0, 8);
		return `${date} ${time}`;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="blueprint-sheet">
	<div class="blueprint-grid-bg" aria-hidden="true"></div>
	<div
		class="blueprint-scanlines"
		class:blueprint-scanlines-off={!scanlinesEnabled}
		aria-hidden="true"
	></div>

	<header class="blueprint-title-block">
		<div class="blueprint-title-block-inner">
			<span class="blueprint-corner blueprint-corner-tl">0,0</span>
			<span class="blueprint-corner blueprint-corner-tr">SHEET_1</span>
			<h1>TMARSIK.DEV</h1>
			<p class="blueprint-drawing-meta">
				<span>PROJECT: PERSONAL SITE</span>
				<span>REV: REWRITE_V2.0</span>
			</p>
		</div>
	</header>

	<main class="blueprint-main">
		{@render children()}
	</main>

	<footer class="blueprint-sheet-footer">
		<span>SCALE: 1:1</span>
		<span>
			<button
				type="button"
				class="blueprint-scanline-toggle"
				onclick={toggleScanlines}
				aria-pressed={scanlinesEnabled}
				aria-label="Toggle scanline effect"
			>
				SCANLINE: {scanlinesEnabled ? 'ON' : 'OFF'}
			</button>
		</span>
		<span>DATE: {formatDateTime(now)}</span>
	</footer>
</div>
