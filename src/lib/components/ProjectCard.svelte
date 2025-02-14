<script lang="ts">
    import type { Project } from "../../customTypes";

    const { id, name, description, thumbnailUrl }: Project = $props();
</script>

<article>
    <img src={thumbnailUrl} alt="Project {name}" />
    <h3>{name}</h3>
    <p>
        {description}
        <a href="/projects/{id}">Learn More</a>
    </p>
</article>
