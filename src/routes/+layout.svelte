<script lang="ts">
	import { on } from 'svelte/events';
	import favicon from '$lib/assets/favicon.svg';
	import { siteInfo } from '$lib/config/info';
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
	let mouseX = $state(0);
	let mouseY = $state(0);

	$effect(() => {
		if (typeof window === 'undefined') return;
		scanlinesEnabled = localStorage.getItem('tmarsik-scanline') !== 'false';
		const off = on(window, 'mousemove', (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		});
		return off;
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

	let formattedDateTime = $derived(formatDateTime(now));
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

	<div class="blueprint-cursor-readout" aria-hidden="true">
		<span>X: {mouseX}</span>
		<span>Y: {mouseY}</span>
	</div>

	<header class="blueprint-title-block">
		<div class="blueprint-title-block-inner">
			<span class="blueprint-corner blueprint-corner-tl">0,0</span>
			<span class="blueprint-corner blueprint-corner-tr">SHEET_1</span>
			<h1>{siteInfo.name}</h1>
			<p class="blueprint-drawing-meta">
				<span>PROJECT: {siteInfo.project}</span>
				<span>REV: {siteInfo.rev}</span>
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
		<span>DATE: {formattedDateTime}</span>
	</footer>
</div>
