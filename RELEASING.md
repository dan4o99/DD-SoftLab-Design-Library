# Releasing `@dd-softlab/dd-softlab-design-lib`

This document describes the release process for the DD SoftLab Design Library.

## Prerequisites

- You have push access to this repository
- You have an npm account with publish access to the `@dd-softlab` scope
- Node.js 24+ and npm are installed locally
- All changes are committed and pushed to `master`

## Release Process

### 1. Choose a Version Level

Releases follow [Semantic Versioning](https://semver.org/):

- **Patch** (0.0.X): Bug fixes and minor improvements
- **Minor** (0.X.0): New features (backwards compatible)
- **Major** (X.0.0): Breaking changes

### 2. Bump the Version

Run one of these commands locally to update the library's `package.json` version:

```bash
# Patch release (0.0.7 → 0.0.8)
npm run release:patch

# Minor release (0.0.7 → 0.1.0)
npm run release:minor

# Major release (0.0.7 → 1.0.0)
npm run release:major
```

### 3. Commit and Tag

After bumping the version, create a commit and tag:

```bash
git add projects/dd-softlab-design-lib/package.json
git commit -m "chore: release v0.0.8"
git tag v0.0.8
```

**Important:** Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) format.

#### Conventional Commits Format

```
type(scope): description

[optional body]
[optional footer]
```

**Types:**

- `feat` – New feature
- `fix` – Bug fix
- `docs` – Documentation changes
- `style` – Code formatting (no logic change)
- `refactor` – Code restructuring (no logic change)
- `perf` – Performance improvements
- `test` – Test-related changes
- `build` – Build system changes
- `ci` – CI/CD changes
- `chore` – Maintenance, dependencies, etc.
- `revert` – Revert a previous commit

**Examples:**

```
feat(button): add icon support
fix(tabs): resolve memory leak on destroy
docs: update component API reference
chore: bump Angular to 21.1.0
```

### 4. Push and Release

Push the commit and tag to trigger the automated release workflow:

```bash
git push origin master
git push origin --tags
```

Or combine them:

```bash
git push --follow-tags
```

### 5. Automated Workflow

The GitHub Actions workflow will automatically:

1. ✅ Build the library with `npm run build:lib`
2. ✅ Generate `CHANGELOG.md` from commit messages using [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog)
3. ✅ Commit the updated changelog back to `master` (with `[skip ci]` to prevent loops)
4. ✅ Publish to npm via trusted publishers (OIDC, no tokens needed)
5. ✅ Create a GitHub Release with automated notes from the changelog

**Monitor the workflow** at: [Actions](https://github.com/dan4o99/DD-SoftLab-Design-Library/actions)

### 6. Verify the Release

After the workflow completes:

```bash
# Check npm registry
npm view @dd-softlab/dd-softlab-design-lib version

# Check GitHub Release
https://github.com/dan4o99/DD-SoftLab-Design-Library/releases
```

## Local Testing (Optional)

To test the release process locally without pushing:

```bash
# Build the library
npm run build:lib

# Pack it
npm run pack:lib

# Inspect the tarball
tar -tzf projects/dd-softlab-design-lib/dd-softlab-design-lib-0.0.8.tgz | head -20
```

## Git Hooks

A pre-commit hook validates that commit messages follow Conventional Commits format. If your message is invalid, the commit will be rejected:

```
❌ Commit message does not follow Conventional Commits format.

Valid formats:
  feat(scope): add new feature
  fix: resolve bug
  ...
```

To bypass the hook (not recommended):

```bash
git commit --no-verify
```

## Troubleshooting

### "I made a mistake in my commit message"

If the mistake is in the latest commit (not pushed yet), amend it:

```bash
git commit --amend -m "feat(button): correct description"
```

### "I pushed the wrong tag"

Delete it locally and remotely:

```bash
git tag -d v0.0.8
git push origin :refs/tags/v0.0.8
```

### "The workflow failed"

Check the [Actions tab](https://github.com/dan4o99/DD-SoftLab-Design-Library/actions) for logs. Common issues:

- **npm publish failed** → Check npm credentials and scope access
- **Changelog generation failed** → Ensure commits follow Conventional Commits format
- **Git push failed** → Check branch protection rules and permissions

### "I need to re-run the workflow"

Delete the tag locally and remotely, then re-push:

```bash
git tag -d v0.0.8
git push origin :refs/tags/v0.0.8

# Fix issues, then:
git tag v0.0.8
git push origin --tags
```

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Angular's Commit Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
