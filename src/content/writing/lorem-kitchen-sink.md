---
title: Lorem ipsum, a kitchen-sink article
date: 2026-10-07
description: Every Markdown element the site supports, in one place, so the styles can be checked.
tags: [demo]
---

<script>
	import Callout from '#lib/components/Callout.svelte';
	import Figure from '#lib/components/Figure.svelte';
	import screenshot from '#lib/assets/images/placeholder-screenshot.png?enhanced';
</script>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This paragraph has **bold**, _italic_, `inline code`, a [link](https://example.com) and a footnote.[^1]

## Second-level heading

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Third-level heading

> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
> Excepteur sint occaecat cupidatat non proident.

1. First ordered item
2. Second ordered item
   - Nested unordered item
   - Another one
3. Third ordered item

## Code

A diff with notation comments:

```ts
const controller = new AbortController();
const response = await fetch(url, { signal: controller.signal }); // [!code --]
const response = await fetch(url, { signal: controller.signal, keepalive: true }); // [!code ++]
const reader = response.body.getReader(); // [!code highlight]
```

A Svelte component:

```svelte
<script lang="ts">
	let { count = 0 } = $props();
	const double = $derived(count * 2);
</script>

<button onclick={() => count++}>{count} × 2 = {double}</button>
```

A shell session and a GraphQL query:

```bash
pnpm install --frozen-lockfile
pnpm build && ls build
```

```graphql
subscription OnLorem($id: ID!) {
	lorem(id: $id) {
		ipsum
		dolor
	}
}
```

## Table

| Browser    | fetch stream | XHR | EventSource |
| ---------- | ------------ | --- | ----------- |
| Lorem 26.5 | hangs        | ok  | ok          |
| Ipsum 140  | ok           | ok  | ok          |

## Image

![Lorem, ipsum and dolor connected by arrows](/images/placeholder-diagram.svg)

A screenshot through `Figure` and enhanced-img: resized, converted to AVIF and WebP, with `width` and `height` set so nothing jumps while it loads.

<Figure src={screenshot} alt="Screenshot of a case study page" caption="Lorem ipsum caption, dolor sit amet." />

## Callouts

<Callout>

**Note:** lorem ipsum dolor sit amet, consectetur adipiscing elit.

</Callout>

<Callout type="warning">

**Warning:** sed do eiusmod tempor incididunt ut labore.

</Callout>

---

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

[^1]: Lorem ipsum footnote text, dolor sit amet.
