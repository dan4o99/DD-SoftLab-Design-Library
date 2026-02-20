# Contributing to DD Softlab Design Library

Thank you for your interest in contributing to the DD Softlab Design Library! This document outlines our development workflow, release process, and commit message standards.

## Table of Contents

- [Development Setup](#development-setup)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Workflow](#pull-request-workflow)
- [Release Process](#release-process)
- [Branch Protection Rules](#branch-protection-rules)

## Development Setup

### Prerequisites

- Node.js 22.x or higher
- npm 10.x or higher
- Git with hooks enabled

### Initial Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dan4o99/DD-SoftLab-Design-Library.git
   cd DD-SoftLab-Design-Library
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Configure Git hooks (for local commit message validation):

   ```bash
   git config core.hooksPath .githooks
   ```

   This enables the `commit-msg` hook that validates commit messages locally before pushing.

4. Verify the setup:
   ```bash
   npm run build:lib
   npm run test --if-present
   ```

## Commit Message Guidelines

This project enforces **Conventional Commits** format to enable automated semantic versioning. All commits must follow this structure:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

- **feat**: A new feature (triggers MINOR version bump)
- **fix**: A bug fix (triggers PATCH version bump)
- **docs**: Documentation changes
- **style**: Code style changes (spaces, semicolons, etc.)
- **refactor**: Code refactoring without feature/fix changes
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Build system or dependencies
- **ci**: CI/CD configuration changes
- **chore**: Maintenance tasks, dependency updates
- **revert**: Reverting a previous commit

### Examples

**Feat with scope:**

```
feat(button): add loading state support

Add new `isLoading` input property to button component with spinner animation.
This allows buttons to show loading indicators during async operations.

Closes #123
```

**Fix with breaking change:**

```
fix(theme): correct color token export paths

BREAKING CHANGE: Color token import paths have changed from
@dd-softlab/design-lib/colors to @dd-softlab/design-lib/theme-tokens

Fixes #456
```

**Simple fix:**

```
fix(input): prevent null reference in blur handler
```

### Validation

- **Local validation**: Your `.githooks/commit-msg` hook validates messages before pushing
- **CI validation**: GitHub Actions validates all commits in commit messages during PR checks
- **Invalid commits**: PRs with invalid commit messages will fail the `lint-commits` check

If a commit message is invalid:

1. Amend the commit: `git commit --amend`
2. Fix the message to follow Conventional Commits format
3. Force-push to your branch: `git push --force-with-lease`

## Pull Request Workflow

### Creating a PR

1. **Create a feature branch** from master:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** and commit with proper messages:

   ```bash
   git commit -m "feat(component-name): add new feature"
   ```

3. **Push to GitHub**:

   ```bash
   git push origin feat/your-feature-name
   ```

4. **Open a Pull Request** against the `master` branch
   - Fill out the PR template (if available)
   - Link related issues
   - Request reviewers if needed

### PR Validation Checks

When you create or update a PR, GitHub Actions automatically runs:

1. **lint-commits**: Validates all commit messages in the PR against Conventional Commits format
2. **quality**: Runs comprehensive quality gates:
   - **Build**: Compiles the library
   - **Lint**: Runs linting if configured (non-blocking)
   - **Test**: Runs test suite using Vitest
   - **npm pack**: Validates package contents
   - **npm publish (dry-run)**: Validates that npm publishing would succeed
   - **Security audit**: Checks for vulnerable dependencies (warnings-only)

All checks must pass before the PR can be merged.

### Review & Merge

- ✅ At least 1 approval is required (enforced by branch protection)
- ✅ All status checks must pass
- ✅ Branch must be up to date with master
- ✅ Use "Squash and merge" or "Create a merge commit" (based on your preference)

## Release Process

### Overview

Releases are **fully automated** and triggered by merging PRs to `master`:

```
Create PR → Validate commits & quality → Merge to master → Semantic-release publishes
```

### How It Works

1. **PR Validation** (on PR creation/update):
   - Commit message validation
   - Code build, lint, and test
   - Package validation and npm publish dry-run
   - Security audit
   - Status: PR remains draft until all checks pass

2. **Manual Merge** (by reviewer):
   - Reviewer approves PR
   - Merge to `master` branch
   - Branch protection rules ensure only PRs with passing checks are mergeable

3. **Automatic Release** (after merge to master):
   - GitHub Actions `release` job runs
   - Analyzes conventional commits since last release
   - Determines semantic version bump (MAJOR.MINOR.PATCH)
   - Updates `CHANGELOG.md`
   - Creates Git tag with version
   - Publishes to npm registry
   - Creates GitHub Release notes

### Release Timing

- Releases typically complete within 2-5 minutes after merge
- Monitor the Actions tab to verify release completed successfully
- If release fails, check the job logs to diagnose issues

### Version Bumping Rules

Based on conventional commits since last release:

- **MAJOR bump**: One or more commits with `BREAKING CHANGE:` footer
- **MINOR bump**: One or more `feat:` commits (no breaking changes)
- **PATCH bump**: Only `fix:` commits (no new features)
- **No release**: Only `docs:`, `chore:`, `style:`, `test:`, `refactor:`, `perf:`, `build:`, `ci:` commits

### Example Release Sequence

```
Last version: 1.2.3

Commits merged:
- feat(card): add shadow variants       → MINOR bump
- fix(button): improve hover state      → (included in same release)

New version: 1.3.0
```

## Branch Protection Rules

The `master` branch is protected to ensure quality and require proper PR review:

### Active Rules

- ✅ Require a minimum of 1 pull request review before merging
- ✅ Require status checks to pass:
  - `lint-commits`: Validates commit message format
  - `quality`: Runs build, test, lint, package validation, and security audit
- ✅ Require branches to be up to date with master before merging
- ✅ Dismiss stale pull request reviews when new commits are pushed
- ✅ Enforce all rules for administrators
- ❌ Force pushes are disabled
- ❌ Deletion of the master branch is disabled

### Implications

- **No direct commits**: All changes must go through PRs
- **No force pushes**: History is immutable
- **No work-in-progress merges**: Rigorous validation before merge

For details on configuring these rules in GitHub, see [`.github/branch-protection.json`](.github/branch-protection.json).

## Troubleshooting

### Local commit hook not running

Ensure you've configured the hooks path:

```bash
git config core.hooksPath .githooks
```

Verify the configuration:

```bash
git config --list | grep hooksPath
```

### Commit message validation fails

Check the error message. Most common issues:

- Missing type (e.g., use `feat:` not just `:`)
- Invalid type (must be one of the allowed types)
- Missing subject line

Example of invalid commits:

```
❌ add new feature              # Missing type
❌ feat: add new feature 🎉     # Non-ASCII characters not allowed
❌ feat:add new feature         # Missing space after colon
```

### PR checks failing

1. **lint-commits**: Fix commit message format (amend and force-push)
2. **build**: Check for TypeScript compilation errors
3. **test**: Ensure all tests pass locally with `npm run test --if-present`
4. **npm publish**: Try locally: `npm pack --dry-run ./dist/dd-softlab-design-lib`

Run all checks locally before pushing:

```bash
npm run build:lib
npm run test --if-present
npm run pack:lib
npm pack --dry-run ./dist/dd-softlab-design-lib
```

### Release failed after merge

Check the GitHub Actions logs under "Actions" tab:

1. Find the failed "Release & Publish" job
2. Expand the "Release" step to see error details
3. Common issues:
   - Invalid npm credentials (should auto-resolve with trusted publishers)
   - Existing git tag blocking release
   - Invalid package.json in dist output

Contact the maintainers if release issues persist.

## Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
- [semantic-release Documentation](https://semantic-release.gitbook.io/)

## Questions or Issues?

If you encounter any issues or have questions about the contribution process, please open an issue on GitHub.

Thank you for contributing! 🎉
