<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import type { Project } from "../customTypes";
    import type { Component } from "svelte";

    const projects: Project[] = [
        {
            id: "1",
            name: "tmarsik.dev",
            description:
                "Personal website showcasing my skills, portfolio, blog, and contact information.",
            thumbnailUrl: "https://picsum.photos/600/400?random=1"
        },
        {
            id: "2",
            name: "VPS",
            description: "Management of a VPS this website runs on.",
            thumbnailUrl: "https://picsum.photos/600/400?random=2"
        }
    ];

    const skills: Record<string, { default: Component }> = import.meta.glob(
        "$lib/svg-icons/skills/*.svelte",
        { eager: true }
    );
</script>

<section>
    <h1>Hi, I’m Tadeáš Maršík, a Frontend Developer.</h1>
    <p>I build fast, responsive, and user-friendly web applications.</p>
    <a href="/about-me">Learn more about me</a>
</section>

<section>
    <h2>Featured Projects</h2>
    <div>
        {#each projects as project (project.id)}
            <ProjectCard
                id={project.id}
                name={project.name}
                description={project.description}
                thumbnailUrl={project.thumbnailUrl}
            />
        {:else}
            <em>no projects yet...</em>
        {/each}
    </div>
</section>

<section>
    <h2>Skills</h2>
    <ul>
        <!-- How to make this more accessible with better dx? -->
        {#each Object.values(skills) as { default: SkillIcon }}
            <SkillIcon />
        {/each}
    </ul>
</section>
