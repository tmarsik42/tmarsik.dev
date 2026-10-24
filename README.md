# tmarsik.dev

My personal site: writing, notes and work. SvelteKit, every page prerendered to static HTML, no JavaScript in the browser.

## Commands

```sh
pnpm dev       # dev server
pnpm build     # static site into build/
pnpm preview   # serve the build
pnpm lint      # prettier + eslint
pnpm check     # svelte-check
```

## Content

Markdown files in `src/content/`, the file name is the slug:

- `writing/` articles, `/writing/<slug>`
- `notes/` short notes, also listed under Writing
- `work/` case studies, `/work/<slug>`

Frontmatter is checked with Zod in `src/lib/content.ts`, a mistake fails the build.

```yaml
title: Required
date: 2026-10-24
description: One sentence, used in lists, meta tags and the feed
tags: [optional]
draft: true # only shown in dev
```

Work entries also need `category` (`featured`, `open-source`, `tool`, `archive`), `role`, `period`, `stack` and optionally `links`.

Components for Markdown, imported in a `<script>` block at the top of the post:

```svelte
<script>
	import Callout from '#lib/components/Callout.svelte';
	import Figure from '#lib/components/Figure.svelte';
	import shot from '#lib/assets/images/shot.png?enhanced';
</script>

<Callout type="warning">**Warning:** text</Callout>

<Figure src={shot} alt="What's in the image" caption="Optional" />
```

Images for `Figure` go to `src/lib/assets/images/` and get converted to AVIF and WebP at build time. SVGs go to `static/images/` and are used as plain Markdown images.

## Generated files

`/feed.xml`, `/sitemap.xml` and an OG image for every page (`/og.png`, `/og/<kind>/<slug>.png`) are built from the content, nothing to update by hand. New static pages need adding to the list in `src/routes/sitemap.xml/+server.ts`.

`build/_app/` contains JS chunks that no page loads: SvelteKit builds the client bundle regardless of `csr = false` ([sveltejs/kit#9703](https://github.com/sveltejs/kit/issues/9703)). They can be left out when deploying.

## Deploy

TBD, static files on my VPS behind nginx. 404s should use `error_page 404 /404.html;`.

## Font

`static/fonts/recursive.woff2` is [Recursive](https://github.com/arrowtype/recursive) 1.085, cut down from the full variable font (719 kB) to 46 kB:

- `CASL`, `slnt` and `CRSV` pinned to 0, `wght` limited to 400–700, `MONO` kept whole so code uses the same family
- no italic: the browser slants the upright, real italic would make the file 80 kB
- Latin, Latin-1 and Czech only, so Slovak ľ ĺ ŕ fall back to the system font

To rebuild it, take `Recursive_VF_1.085.ttf` from `Recursive_Desktop/` in the release zip and run:

```sh
uvx --from 'fonttools[woff]' fonttools varLib.instancer Recursive_VF_1.085.ttf \
  CASL=0 slnt=0 CRSV=0 wght=400:700 -o inst.ttf

uvx --from 'fonttools[woff]' fonttools subset inst.ttf \
  --flavor=woff2 --output-file=static/fonts/recursive.woff2 \
  --layout-features='kern,liga,calt,case,tnum,lnum,frac' \
  --unicodes='U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2212,U+010C-010F,U+011A-011B,U+0147-0148,U+0158-0159,U+0160-0161,U+0164-0165,U+016E-016F,U+017D-017E'
```
