# Releasing `@dd-softlab/dd-softlab-design-lib`

This document describes the automated release process for the DD SoftLab Design Library.

## Overview

Releases are **fully automated** using [semantic-release](https://github.com/semantic-release/semantic-release):

1. You push commits to `master` with conventional commit messages
2. GitHub Actions automatically analyzes commits
3. The workflow validates commits, builds the library, runs optional lint/test, validates package contents, and runs an audit check
4. If checks pass, semantic-release auto-determines the version
5. Publishes to npm from `dist/dd-softlab-design-lib`, creates a GitHub Release, updates CHANGELOG.md
6. All done — no manual tagging or version management needed

## Prerequisites

- All commits follow [Conventional Commits](https://www.conventionalcommits.org/) format
- All changes are pushed to `master` (directly or via PR)

## How It Works

### Version Bumping (Automatic)

Semantic-release reads your commit messages and auto-increments the version:

| Commit Type                       | Version Impact                 |
| --------------------------------- | ------------------------------ |
| `feat(scope): ...`                | **Minor** bump (0.0.7 → 0.1.0) |
| `fix(scope): ...`                 | **Patch** bump (0.0.7 → 0.0.8) |
| `BREAKING CHANGE:` in body        | **Major** bump (0.0.7 → 1.0.0) |
| `chore:`, `docs:`, `style:`, etc. | No release, CHANGELOG updated  |

### Conventional Commits Format

```
type(scope): description

[optional body]
[optional footer]
```

**Types:**

- `feat` – New feature (triggers minor)
- `fix` – Bug fix (triggers patch)
- `BREAKING CHANGE:` – Breaking change (triggers major)
- `docs` – Documentation
- `style` – Code formatting
- `refactor` – Code restructuring
- `perf` – Performance
- `test` – Tests
- `build` – Build system
- `ci` – CI/CD
- `chore` – Maintenance
- `revert` – Revert commit

**Examples:**

```
feat(button): add icon support
→ Triggers: minor version bump and publish

fix(tabs): resolve memory leak
→ Triggers: patch version bump and publish

chore: update dependencies
→ No release (category doesn't trigger version bump)

feat(input): add validation
BREAKING CHANGE: removed deprecated props
→ Triggers: major version bump and publish
```

## Release Process (Developer)

### One-Time Setup

Install dependencies:

```bash
npm ci
```

Optional (recommended) local commit hook setup:

```bash
git config core.hooksPath .githooks
```

### Making Changes

```bash
# Create a feature branch (optional)
git checkout -b feature/my-feature

# Make changes to components/styles

# Commit with conventional format
git commit -m "feat(button): add rounded variant"
# or
git commit -m "fix: resolve hover state on mobile"

# Push to master (directly or via PR)
git push origin master
```

### That's It

Once your commit reaches `master`, the workflow automatically:

1. ✅ Validates commit format
2. ✅ Builds the library
3. ✅ Runs lint and test scripts (if present)
4. ✅ Validates publishable package contents (`npm pack --dry-run`)
5. ✅ Runs security audit (warning-only)
6. ✅ Determines version bump (feat→minor, fix→patch, BREAKING→major)
7. ✅ Updates CHANGELOG
8. ✅ Publishes to npm from `dist/dd-softlab-design-lib`
9. ✅ Creates GitHub Release with notes
10. ✅ Tags the commit

No manual versioning, no manual tagging — all automatic.

## What Gets Updated Automatically

- `CHANGELOG.md` (with commit details)
- GitHub Releases (with changelog notes)
- npm registry (new package published from `dist/dd-softlab-design-lib`)

## Quality Gates

The workflow **blocks releases** if:

- ❌ Build fails (`ng build` error)
- ❌ Optional lint/test scripts fail (when present)
- ❌ Package dry-run fails
- ❌ Any commit doesn't follow Conventional Commits format

To check locally:

```bash
npm run build:lib    # Check build
npm run lint         # If a lint script exists
npm run test         # If a test script exists
npm pack --dry-run ./dist/dd-softlab-design-lib
npm audit            # Security visibility (CI keeps this warning-only)
```

## Git Hook

A commit-msg hook validates messages before commit:

```
❌ Commit message does not follow Conventional Commits format.

Valid formats:
  feat(scope): add new feature
  fix: resolve bug
  ...
```

Bypass (not recommended):

```bash
git commit --no-verify
```

## Triggering a Major Release

If you only have `fix:` commits but need a major version bump:

```
fix(core): major internal refactor

BREAKING CHANGE: Removed deprecated calculateTotal() method
```

The `BREAKING CHANGE:` footer triggers a major bump.

## Troubleshooting

### "My commit didn't trigger a release"

`chore:`, `docs:`, `style:`, etc. don't trigger releases (no version bump). Use `feat:` or `fix:` to release.

### "I made a typo in a commit message"

If not pushed yet:

```bash
git commit --amend -m "feat(button): correct description"
```

If already on master, create a new commit:

```bash
git commit -m "fix: correct the typo from previous commit"
# This will trigger a patch release
```

### "The workflow failed"

Check [Actions tab](https://github.com/dan4o99/DD-SoftLab-Design-Library/actions):

- **Build failed** → Run `npm run build:lib` locally
- **Lint/Test failed** → Run `npm run lint` / `npm run test` locally if scripts exist
- **Pack dry-run failed** → Run `npm pack --dry-run ./dist/dd-softlab-design-lib`
- **Audit warnings** → Run `npm audit` to inspect findings
- **Invalid commits** → Check commit message format
- **Publish failed** → Check npm trusted publishers setup

## Resources

- [Semantic Release](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
