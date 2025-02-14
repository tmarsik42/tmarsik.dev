<script lang="ts">
    import "../app.css";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";

    const { children } = $props();
</script>

<Header />

<main>
    {@render children()}
</main>

<Footer />
