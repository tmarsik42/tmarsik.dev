---
title: Why does SvelteKit still build client JS with csr = false?
date: 2026-10-28
description: The fix was already in SvelteKit. One function kept it from working.
---

> Client-side rendering (CSR) is the generation of the page contents in the web browser using JavaScript.
>
> In SvelteKit, client-side rendering will be used by default, but you can turn off JavaScript with the `csr = false` page option.

— [SvelteKit glossary](https://svelte.dev/docs/kit/glossary#CSR)

My site has `export const csr = false` in the root layout, so every page ships without JavaScript. I expected the build to have none. Instead it had 31 JS files in `build/_app/immutable`, about 207 kB.

No page loads them and the HTML has no `<script>` and no `modulepreload`, so the browser never downloads them. The usual explanation is that Vite builds the client and the server regardless of page options, and SvelteKit only uses what each page needs. I excluded the files in the deploy with `rsync --exclude='*.js'` and moved on.

## Or that's what I thought

The exclude still bugged me, so I went looking and found [issue #9703](https://github.com/sveltejs/kit/issues/9703) that was already fixed by [this commit](https://github.com/sveltejs/kit/commit/3968fb9cb3749a49cee82edaf0733f692197d43f): "skip client build if all routes have CSR disabled". The fix is in SvelteKit 3.0.1, which I'm on, and yet I still had 31 JS files.

## Why it didn't kick in

I opened the build code. SvelteKit only skips the client build if it can prove, without running any code, that every page has `csr = false`:

```js
// @sveltejs/kit/src/exports/vite/build/index.js
const skip_client_build = manifest_data.nodes.every((node) => node.page_options?.csr === false);
```

Page options are read by static analysis. If an export isn't a plain value, the result is `null`, meaning "I don't know". `entries` is a page option too, and mine was a function:

```ts
// src/routes/(site)/writing/[slug]/+page.ts
export const entries: EntryGenerator = () => writing.map(({ slug }) => ({ slug }));
```

I ran their analyser on my routes:

```
src/routes/+layout.ts                      {"prerender":true,"csr":false}
src/routes/(site)/writing/[slug]/+page.ts  null
```

One `null` was enough for SvelteKit to build the client. A function can do anything, so SvelteKit can't promise the page needs no client code. A nice little fail-safe default.

## The fix

Delete `entries`. The prerender crawler finds every page through links anyway. 31 → 0 JS files, and pages, OG images, the sitemap and the feed are still generated. You only need `entries` when no link leads to a page, and then the client build is back.

And a bonus? I no longer need `--exclude='*.js'` in the deploy.

So check your `entries`. Zero JS might be closer than you think.
