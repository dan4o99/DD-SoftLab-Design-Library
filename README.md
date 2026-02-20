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

## Publishing & Release Workflow

Publishing is **fully automated** through GitHub Actions and semantic-release. Release happens only after successful merge to the `master` branch.

### Release Process Overview

```
Create PR → Validate commits & quality → Merge to master → Automated release
```

1. **Pull Request Creation**: When you push to a feature branch and open a PR against master:
   - Commit message validation (Conventional Commits format)
   - Full quality gate checks (build, lint, test, npm pack, npm publish dry-run, security audit)
   - Status checks must pass before merge is allowed

2. **Merge to Master**: After PR approval and passing all checks:
   - Only PRs can be merged (direct commits to master are blocked)
   - Merge runs final validation, then triggers automatic release

3. **Automatic Release** (after merge):
   - Semantic-release analyzes commits since last release
   - Determines version bump (MAJOR.MINOR.PATCH) based on Conventional Commits
   - Updates CHANGELOG.md with release notes
   - Creates git tag with new version
   - Publishes to npm registry

### Quality Gates

Every PR runs the following checks before merge is allowed:

- ✅ **Commit Message Validation**: All commits must follow Conventional Commits format
- ✅ **Build**: Compiles the library (TypeScript strict mode)
- ✅ **Lint**: Code linting (if configured)
- ✅ **Test**: Runs full test suite (Vitest)
- ✅ **Package Validation**: Validates npm package contents and integrity
- ✅ **npm Publish Dry-Run**: Validates npm publish would succeed without errors
- ✅ **Security Audit**: Checks for vulnerable dependencies (warnings-only)

All checks must pass before the PR can be merged.

### Local Preflight

Before opening a PR, verify locally:

```bash
npm run build:lib
npm run test --if-present
npm run pack:lib
npm pack --dry-run ./dist/dd-softlab-design-lib
```

### Commit Message Format

This project enforces [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

BREAKING CHANGE: <breaking change description>
```

**Commit types that trigger releases:**

- `feat:` → MINOR version bump (new feature)
- `fix:` → PATCH version bump (bug fix)
- `BREAKING CHANGE:` footer → MAJOR version bump

**Other types** (docs, style, refactor, perf, test, build, ci, chore): No release

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed commit message guidelines.

### Branch Protection

The `master` branch requires:

- ✅ Minimum 1 PR approval before merge
- ✅ All status checks passing
- ✅ Branch up to date with master
- ❌ No direct commits (PRs only)
- ❌ No force pushes

For details, see [.github/branch-protection.json](.github/branch-protection.json).

### Contributing

For detailed setup, development workflow, commit guidelines, and troubleshooting, see [CONTRIBUTING.md](CONTRIBUTING.md).

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
