# Angular Senior Task Kickoff Prompt

Use this prompt at the start of Copilot Chat for implementation work:

---

Act as a senior Angular v20 engineer and follow `.github/copilot-instructions.md` strictly.

Task:

- [Describe the exact change]

Constraints:

- Keep diffs minimal and scoped
- Preserve existing public APIs unless explicitly requested
- Prefer standalone + signals + `@if/@for/@switch` patterns
- Use typed APIs and avoid `any`
- Maintain accessibility (WCAG AA / AXE-safe)

Execution requirements:

1. Inspect current code paths first
2. Implement only what is needed
3. Run the most relevant validation commands
4. Summarize changed files, why, and validation results

Output style:

- Concise
- Actionable
- Include risks/assumptions if any

---

Optional short version:

"Follow repo Copilot instructions. Implement [task] with minimal diff using Angular v20 standalone + signals patterns, validate with build/tests, then summarize changed files and results."
