# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
pnpm dlx sv@1.1.1 create --template minimal --types ts --add prettier eslint sveltekit-adapter="adapter:static" --install pnpm .
```

## Adding features

Add features to your project with `sv add`:

```sh
npx sv add
```

For example, to add Tailwind CSS:

```sh
npx sv add tailwindcss
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

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
