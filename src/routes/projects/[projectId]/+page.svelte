<script lang="ts">
    import type { PageData } from './$types';
    
    let { data }: { data: PageData } = $props();
    
    const project = $derived(data.project);
</script>

<div class="detail-container">
    <header class="detail-header block">
        <span class="corner-tl">ID_01</span>
        <div class="block-inner">
            <div class="header-meta">REF_ID: {project.id} // STATUS: {project.status}</div>
            <h1>{project.title}</h1>
        </div>
    </header>

    <div class="detail-layout">
        <aside class="detail-sidebar block">
            <span class="corner-tl">S1</span>
            <span class="corner-br">SPEC</span>
            <div class="block-inner">
                <h2>TECHNICAL_SPEC</h2>
                <table class="spec-table">
                    <tbody>
                        {#each Object.entries(project.specification) as [key, value]}
                            <tr>
                                <th>{key}</th>
                                <td>{value}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>

                <div class="stack-section">
                    <h2>STACK_USED</h2>
                    <div class="stack-tags">
                        {#each project.stack as tech}
                            <span class="tech-tag">[{tech}]</span>
                        {/each}
                    </div>
                </div>

                <div class="links-section">
                    <h2>RESOURCES</h2>
                    {#each project.links as link}
                        <a href={link.url} target="_blank" rel="noopener noreferrer" class="blueprint-link">
                            > {link.label}
                        </a>
                    {/each}
                </div>
            </div>
        </aside>

        <main class="detail-main block">
            <span class="corner-tl">C1</span>
            <span class="corner-br">DOCUMENTATION</span>
            <div class="block-inner">
                <h2>PROJECT_OVERVIEW</h2>
                <p class="description">{project.description}</p>
                
                <div class="placeholder-hero">
                    <div class="x-line"></div>
                    <div class="x-line"></div>
                    <span>ILLUSTRATION_REQUIRED</span>
                </div>

                <div class="return-nav">
                    <a href="/projects" class="blueprint-link">[ RETURN_TO_PROJECT_INDEX ]</a>
                </div>
            </div>
        </main>
    </div>
</div>

<style>
    .detail-container { display: flex; flex-direction: column; gap: 1.5rem; }
    
    .block {
        position: relative;
        border: 1px solid var(--blueprint-border);
        background: var(--blueprint-surface);
        padding: 1.25rem;
    }

    .detail-header h1 { margin: 0.5rem 0 0; font-size: 1.5rem; letter-spacing: 0.15em; }
    .header-meta { font-size: 0.65rem; color: var(--blueprint-text-muted); }

    .detail-layout {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 1.5rem;
    }

    @media (max-width: 850px) {
        .detail-layout { grid-template-columns: 1fr; }
    }

    h2 {
        font-size: 0.75rem;
        color: var(--blueprint-text-secondary);
        border-bottom: 1px solid var(--blueprint-border-light);
        padding-bottom: 0.4rem;
        margin: 0 0 0.75rem 0;
    }

    .spec-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; margin-bottom: 1.5rem; }
    .spec-table th { text-align: left; color: var(--blueprint-text-muted); padding: 0.3rem 0; }
    .spec-table td { text-align: right; color: var(--blueprint-text); padding: 0.3rem 0; }

    .stack-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
    .tech-tag { font-size: 0.65rem; color: var(--blueprint-accent); }

    .blueprint-link {
        display: block;
        font-size: 0.75rem;
        color: var(--blueprint-text);
        text-decoration: none;
        margin-bottom: 0.5rem;
    }
    .blueprint-link:hover { color: var(--blueprint-accent); }

    .description { font-size: 0.9rem; line-height: 1.6; white-space: pre-wrap; }

    .placeholder-hero {
        margin-top: 2rem;
        aspect-ratio: 16 / 7;
        border: 1px dashed var(--blueprint-border-light);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.6rem;
        color: var(--blueprint-text-muted);
    }

    .x-line {
        position: absolute;
        width: 100%;
        height: 1px;
        background: var(--blueprint-grid-line);
    }
    .x-line:nth-child(1) { transform: rotate(15deg); }
    .x-line:nth-child(2) { transform: rotate(-15deg); }

    .return-nav { margin-top: 3rem; border-top: 1px solid var(--blueprint-border-light); padding-top: 1rem; }

    /* L-Corners (zjednodušeně pro ukázku) */
    .block::before {
        content: ''; position: absolute; top: -1px; left: 10px; width: 6px; height: 6px;
        border: 1px solid var(--blueprint-border); border-right: none; border-bottom: none; background: var(--blueprint-surface-corner);
    }
    .corner-tl { position: absolute; top: 0.4rem; left: 0.6rem; font-size: 0.6rem; color: var(--blueprint-text-muted); }
    .corner-br { position: absolute; bottom: 0.4rem; right: 0.6rem; font-size: 0.6rem; color: var(--blueprint-text-muted); }
</style>