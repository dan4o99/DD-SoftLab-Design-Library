# DD Softlab Design Library

This repository is structured with a clear separation between:

- **Library source**: `projects/dd-softlab-design-lib/`
- **Build/package/publish tooling**: repository root (`angular.json`, `package.json`, `scripts/`, root `tsconfig.json`)

## Build

From the repository root:

```bash
npm run build:lib
```

This runs `generate-theme-scss` first, then builds the library through `angular.json` (`ng build`) into `dist/dd-softlab-design-lib`.

## Pack

```bash
npm run pack:lib
```

## Publish

Publishing is handled by GitHub Actions + semantic-release on push to `master`.

Recommended local preflight before opening/merging a PR:

```bash
npm run build:lib
npm run pack:lib
npm pack --dry-run ./dist/dd-softlab-design-lib
```

The release workflow publishes from `dist/dd-softlab-design-lib` (built output), not from raw source files.

## Consume

Install in an Angular project:

```bash
npm install @dd-softlab/dd-softlab-design-lib
```

Set initial theme in `appConfig`:

```ts
import { provideDDSoftlabDesign } from "@dd-softlab/dd-softlab-design-lib";

export const appConfig = {
  providers: [
    provideDDSoftlabDesign({
      theme: "DD-SoftLab",
    }),
  ],
};
```

Import SCSS token helpers:

```scss
@use "@dd-softlab/dd-softlab-design-lib/src/lib/theming/theme-tokens.generated"
  as ddTokens;
```

Import utility classes (padding, margin, border widths):

```scss
@use "@dd-softlab/dd-softlab-design-lib/src/lib/theming/utility-classes";
```

Then use classes in templates, for example:

```html
<dd-card class="dd-p-md dd-mb-lg dd-bw-1">...</dd-card>
<dd-button class="dd-px-lg dd-py-sm">Save</dd-button>
```
