<script lang="ts">
    import { page } from '$app/stores';
    import { on } from 'svelte/events';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import favicon from '$lib/assets/favicon.svg';
    import { siteInfo } from '$lib/config/info';
    import '../app.css';

    let { children } = $props();

    const navItems = [
        { href: '/', label: 'INDEX' },
        { href: '/projects', label: 'PROJECTS' },
        { href: '/about', label: 'ABOUT' },
    ] as const;

    // --- SOUŘADNICE A LOGIKA POHYBU ---
    const COORDS: Record<string, { x: number; y: number }> = {
        '/': { x: 0, y: 0 },
        '/projects': { x: 1, y: 0 },
        '/about': { x: 0, y: 1 }
    };

    function getBaseRoute(path: string) {
        if (path.startsWith('/projects')) return '/projects';
        if (path.startsWith('/about')) return '/about';
        return '/';
    }

    let currentBase = $derived(getBaseRoute($page.url.pathname));
    let targetCoords = $derived(COORDS[currentBase] || { x: 0, y: 0 });

    let prevCoords = { x: 0, y: 0 };
    let transitionState = $state({ inX: 0, inY: 0, outX: 0, outY: 0 });

    $effect(() => {
        const curr = targetCoords;
        const dx = curr.x - prevCoords.x;
        const dy = curr.y - prevCoords.y;

        // Okno pro výpočet směru odletu
        const w = typeof window !== 'undefined' ? window.innerWidth : 1000;
        const h = typeof window !== 'undefined' ? window.innerHeight : 1000;

        transitionState = {
            inX: dx > 0 ? w : (dx < 0 ? -w : 0),
            inY: dy > 0 ? h : (dy < 0 ? -h : 0),
            outX: dx > 0 ? -w : (dx < 0 ? w : 0),
            outY: dy > 0 ? -h : (dy < 0 ? h : 0)
        };
        prevCoords = curr;
    });

    // Custom tranzice zachovává 100% opacity, aby to vypadalo jako reálný papír
    function blueprintPan(node: HTMLElement, { x = 0, y = 0, duration = 800 }) {
        return fly(node, { x, y, duration, easing: cubicOut, opacity: 1 });
    }

    // --- ZBYTEK TVÉ LOGIKY ---
    let now = $state(new Date());
    $effect(() => {
        const id = setInterval(() => { now = new Date(); }, 1000);
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
    let timeHHMMSS = $derived(now.toTimeString().slice(0, 8));
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="blueprint-sheet">
    <div class="blueprint-grid-bg" aria-hidden="true"></div>
    <div class="blueprint-scanlines" class:blueprint-scanlines-off={!scanlinesEnabled} aria-hidden="true"></div>

    <div class="blueprint-cursor-readout" aria-hidden="true">
        <span>X: {mouseX}</span>
        <span>Y: {mouseY}</span>
    </div>

    <nav class="blueprint-nav" aria-label="Main navigation">
        <div class="blueprint-nav-inner">
            {#each navItems as item}
                <a
                    href={item.href}
                    class="blueprint-nav-link"
                    class:is-active={item.href === '/' ? $page.url.pathname === '/' : $page.url.pathname.startsWith(item.href)}
                >
                    [{item.label}]
                </a>
            {/each}
        </div>
    </nav>

    <div class="blueprint-viewport">
        {#key currentBase}
            <div 
                class="blueprint-page-layer"
                in:blueprintPan={{ x: transitionState.inX, y: transitionState.inY }}
                out:blueprintPan={{ x: transitionState.outX, y: transitionState.outY }}
            >
                <header class="blueprint-title-block">
                    <div class="blueprint-title-block-inner">
                        <span class="blueprint-corner blueprint-corner-tl">{targetCoords.x},{targetCoords.y}</span>
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
            </div>
        {/key}
    </div>

    <footer class="blueprint-sheet-footer">
        <span>SCALE: 1:1</span>
        <span>TIME: {timeHHMMSS}</span>
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
        <span>STATUS: SYSTEM_READY</span>
    </footer>
</div>

<style>
    .blueprint-viewport {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        overflow-x: hidden; /* Skryje odjíždějící stránky za okrajem okna */
        flex: 1; /* Vyplní prostor, pokud máš v app.css nastavený flex na sheet */
    }

    .blueprint-page-layer {
        /* Toto zajistí, že obě stránky (stará i nová) sedí přesně na sobě v mřížce */
        grid-area: 1 / 1;
        width: 100%;
        will-change: transform;
    }
</style>