# Contributing to DD Softlab Design Library

Thank you for your interest in contributing to the DD Softlab Design Library! This document outlines our development workflow and release process.

## Table of Contents

- [Development Setup](#development-setup)
- [Pull Request Workflow](#pull-request-workflow)
- [Release Process](#release-process)

## Development Setup

### Prerequisites

- Node.js 22.x or higher
- npm 10.x or higher
- Git

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

3. Verify the setup:
   ```bash
   npm run build:lib
   ```

## Pull Request Workflow

### Creating a PR

1. **Create a feature branch** from master:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** and commit your work:

   ```bash
   git commit -m "describe your change"
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

1. **quality**: Runs comprehensive quality gates:
   - **Build**: Compiles the library
   - **Lint**: Runs linting if configured (non-blocking)
   - **npm pack**: Validates package contents
   - **npm publish (dry-run)**: Validates that npm publishing would succeed
   - **Security audit**: Checks for vulnerable dependencies (warnings-only)

All checks must pass before the PR can be merged.

### Review & Merge

- ✅ At least 1 approval is required
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
   - Code build and lint
   - Package validation and npm publish dry-run
   - Security audit
   - Status: PR remains draft until all checks pass

2. **Manual Merge** (by reviewer):
   - Reviewer approves PR
   - Merge to `master` branch

3. **Automatic Release** (after merge to master):
   - GitHub Actions `release` job runs
   - Updates `CHANGELOG.md`
   - Creates Git tag with version
   - Publishes to npm registry
   - Creates GitHub Release notes

### Release Timing

- Releases typically complete within 2-5 minutes after merge
- Monitor the Actions tab to verify release completed successfully
- If release fails, check the job logs to diagnose issues

## Troubleshooting

### PR checks failing

1. **build**: Check for TypeScript compilation errors
2. **npm publish**: Try locally: `npm pack --dry-run ./dist/dd-softlab-design-lib`

Run all checks locally before pushing:

```bash
npm run build:lib
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

- [Semantic Versioning](https://semver.org/)
- [semantic-release Documentation](https://semantic-release.gitbook.io/)

## Questions or Issues?

If you encounter any issues or have questions about the contribution process, please open an issue on GitHub.

Thank you for contributing! 🎉
