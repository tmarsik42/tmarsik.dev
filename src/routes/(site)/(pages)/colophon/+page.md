<script>
	import { site } from '#lib/site.ts';
</script>

<svelte:head>
<title>Colophon · {site.title}</title>
<meta name="description" content="How this site came to be and what it runs on." />
</svelte:head>

# Colophon

This is where I write. Getting here took longer than I'd like to admit.

I've rebuilt my personal website more times than I can count, and every version ended up more complicated than the one before. I started with vanilla HTML, CSS and JavaScript, moved on to jQuery, then rewrote it in C# on ASP.NET, at one point even ran it on Spring Boot, and finally landed on SvelteKit because that's what I use at work. There was always another framework to try or another effect to add, and I never got to the point where I was actually happy with it and just left it alone.

The last attempt went furthest. Before writing a single page I started building a proper design system, with tokens and components and graphics made from scratch. Somewhere in the middle of that I stopped and looked at what everyone else was shipping. In the age of AI it's all so polished and over the top that nothing really stands out anymore, and I was busy making one more site just like it.

So I threw it away and went back to how websites used to be made, plain pages with text on them. I kept a few modern touches where they actually help, but most of the work went into leaving things out.

- **Framework:** SvelteKit, with every page prerendered to plain HTML at build time.
- **JavaScript:** none gets sent to your browser, because there's nothing on these pages that would need it.
- **Content:** Markdown files in a git repo, run through mdsvex. Zod checks the frontmatter and stops the build when I make a typo.
- **Code highlighting:** Shiki colours the code during the build, so it works without any script.
- **Images:** converted to AVIF and WebP in a few sizes, and your browser downloads the smallest one it can use.
- **Fonts:** …
- **Hosting:** my own VPS running Debian, with nginx serving static files.

Old books sometimes end with a short note about how they were made, which typeface they were set in and where they were printed. That note is called a colophon, and this page is mine.
