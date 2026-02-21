<script lang="ts">
    import type { PageData } from './$types';
    
    let { data }: { data: PageData } = $props();
    let hoveredId = $state<string | null>(null);

    function cornerCode(isHovered: boolean, index: number): string {
        if (!isHovered) return `P-${String(index + 1).padStart(2, '0')}`;
        return `${(index + 1) * 40},${(index + 1) * 24}`;
    }
</script>

<div class="projects-grid">
    {#each data.projects as project, i}
        <a href="/projects/{project.id}" class="project-link">
            <article
                class="project-card"
                class:is-hovered={hoveredId === project.id}
                onmouseenter={() => (hoveredId = project.id)}
                onmouseleave={() => (hoveredId = null)}
            >
                <span class="corner-tl">{cornerCode(hoveredId === project.id, i)}</span>
                <span class="corner-br">{project.status}</span>

                <div class="card-placeholder">
                    <span class="placeholder-x">X</span>
                </div>

                <div class="card-body">
                    <h2 class="card-title">{project.title}</h2>
                    <p class="card-desc">{project.description}</p>
                    <p class="card-stack">{project.stack.join(' · ')}</p>

                    <table class="spec-table" aria-label="Specification">
                        <caption>SPECIFICATION</caption>
                        <tbody>
                            {#each Object.entries(project.specification) as [key, value]}
                                <tr>
                                    <th>{key}</th>
                                    <td>{value}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </article>
        </a>
    {/each}
</div>

<style>
    .project-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    .project-card {
        position: relative;
        border: 1px solid var(--blueprint-border);
        background: var(--blueprint-surface);
        transition: border-color 0.2s ease;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    /* L-shaped corners */
    .project-card::before,
    .project-card::after {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        border: 1px solid var(--blueprint-border);
        background: var(--blueprint-surface-corner);
        transition: border-color 0.2s ease;
        z-index: 1;
    }

    .project-card::before { top: -1px; left: 10px; border-right: none; border-bottom: none; }
    .project-card::after { top: -1px; right: 10px; border-left: none; border-bottom: none; }

    .project-card.is-hovered { border-color: var(--blueprint-accent); }

    .corner-tl, .corner-br {
        position: absolute;
        font-size: 0.65rem;
        letter-spacing: 0.08em;
        color: var(--blueprint-text-muted);
    }

    .corner-tl { top: 0.4rem; left: 0.6rem; }
    .corner-br { bottom: 0.4rem; right: 0.6rem; }

    .card-placeholder {
        aspect-ratio: 16 / 9;
        border-bottom: 1px solid var(--blueprint-border-light);
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--blueprint-surface-corner);
    }

    .placeholder-x { font-size: 2rem; color: var(--blueprint-border-light); font-weight: 600; }

    .card-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }

    .card-title {
        font-size: 0.85rem;
        text-transform: uppercase;
        border-bottom: 1px solid var(--blueprint-border-light);
        padding-bottom: 0.35rem;
        margin: 0;
    }

    .card-desc { font-size: 0.75rem; line-height: 1.4; margin: 0; }
    .card-stack { font-size: 0.65rem; color: var(--blueprint-text-muted); margin: 0; }

    .spec-table { width: 100%; font-size: 0.65rem; margin-top: 0.5rem; border-collapse: collapse; }
    .spec-table caption { text-align: left; font-weight: 600; font-size: 0.6rem; color: var(--blueprint-text-secondary); margin-bottom: 0.2rem; }
    .spec-table th { text-align: left; color: var(--blueprint-text-muted); font-weight: 400; padding: 0.1rem 0; }
    .spec-table td { text-align: right; color: var(--blueprint-text); padding: 0.1rem 0; }
</style>