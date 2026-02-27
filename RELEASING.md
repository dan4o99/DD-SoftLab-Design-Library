# Releasing `@dd-softlab/dd-softlab-design-lib`

This document describes the automated release process for the DD SoftLab Design Library.

## Overview

Releases are **fully automated** using [semantic-release](https://github.com/semantic-release/semantic-release):

1. You push commits to `master`
2. GitHub Actions automatically analyzes commits
3. The workflow validates commits, builds the library, runs optional lint, validates package contents, and runs an audit check
4. If checks pass, semantic-release auto-determines the version
5. Publishes to npm from `dist/dd-softlab-design-lib`, creates a GitHub Release, updates CHANGELOG.md
6. All done — no manual tagging or version management needed

## Prerequisites

- All changes are pushed to `master` (directly or via PR)

## How It Works

## Release Process (Developer)

### One-Time Setup

Install dependencies:

```bash
npm ci
```

### Making Changes

```bash
# Create a feature branch (optional)
git checkout -b feature/my-feature

# Make changes to components/styles

# Commit your changes
git commit -m "describe your change"

# Push to master (directly or via PR)
git push origin master
```

### That's It

Once your commit reaches `master`, the workflow automatically:

1. ✅ Builds the library
2. ✅ Runs lint scripts (if present)
3. ✅ Validates publishable package contents (`npm pack --dry-run`)
4. ✅ Runs security audit (warning-only)
5. ✅ Updates CHANGELOG
6. ✅ Publishes to npm from `dist/dd-softlab-design-lib`
7. ✅ Creates GitHub Release with notes
8. ✅ Tags the commit

No manual versioning, no manual tagging — all automatic.

## What Gets Updated Automatically

- `CHANGELOG.md` (with commit details)
- GitHub Releases (with changelog notes)
- npm registry (new package published from `dist/dd-softlab-design-lib`)

## Quality Gates

The workflow **blocks releases** if:

- ❌ Build fails (`ng build` error)
- ❌ Optional lint scripts fail (when present)
- ❌ Package dry-run fails

To check locally:

```bash
npm run build:lib    # Check build
npm run lint         # If a lint script exists
npm pack --dry-run ./dist/dd-softlab-design-lib
npm audit            # Security visibility (CI keeps this warning-only)
```

## Troubleshooting

### "The workflow failed"

Check [Actions tab](https://github.com/dan4o99/DD-SoftLab-Design-Library/actions):

- **Build failed** → Run `npm run build:lib` locally
- **Lint failed** → Run `npm run lint` locally if script exists
- **Pack dry-run failed** → Run `npm pack --dry-run ./dist/dd-softlab-design-lib`
- **Audit warnings** → Run `npm audit` to inspect findings
- **Publish failed** → Check npm trusted publishers setup

## Resources

- [Semantic Release](https://semantic-release.gitbook.io/)
- [Semantic Versioning](https://semver.org/)
