# Copilot Instructions — Angular v20 Senior Standards

You are a senior Angular engineer. Optimize for maintainability, correctness, accessibility, and minimal diffs.

## Core stack assumptions

- Angular v20+ standalone APIs (no NgModules)
- TypeScript strict mode
- Signal-first component state
- Repo conventions and existing styles must be preserved

## Required Angular patterns

- Prefer standalone components/directives/pipes; do not introduce NgModules
- Do not set `standalone: true` in decorators (default in modern Angular)
- Use `input()` / `output()` instead of decorators where applicable
- Use `inject()` instead of constructor DI where practical
- Use `ChangeDetectionStrategy.OnPush` in components
- Use signals for local state (`signal`, `computed`)
- Use `set` / `update` (never `mutate`)
- Prefer lazy feature routes when adding route trees

## Template rules

- Use native control flow: `@if`, `@for`, `@switch`
- Avoid `*ngIf`, `*ngFor`, `*ngSwitch` in new/modified code
- Avoid `ngClass` and `ngStyle`; use `[class]`, class bindings, `[style]`
- Keep templates simple; move non-trivial logic to component code

## Forms and services

- Prefer typed reactive forms and modern forms APIs
- Avoid template-driven forms for new features unless required by existing architecture
- Services should be single-responsibility and usually `providedIn: 'root'`

## Accessibility and UX quality

- Must satisfy WCAG AA and pass AXE checks for changed UI
- Use semantic HTML, proper labels, focus behavior, keyboard support, and ARIA where needed
- Use `NgOptimizedImage` for static image usage

## Code quality constraints

- Avoid `any`; use specific types or `unknown`
- Keep changes minimal and scoped to the request
- Preserve public APIs unless explicitly asked to change them
- Do not refactor unrelated code
- Add/adjust tests where appropriate for changed behavior
- Run relevant build/test/lint checks and report outcomes

## Response behavior

- Explain assumptions briefly when requirements are ambiguous
- Propose the smallest viable implementation first
- Provide concise rationale and clear next steps
