# Codex Workflow

Codex implements only the assigned task. Product and creative decisions belong to the human CEO. Architecture, task briefs, review criteria, and acceptance rules come from the Project Manager.

## Before Editing

Codex must inspect relevant files before editing and summarize the intended change. Tasks should remain atomic and should not mix unrelated systems in one commit.

## Implementation Rules

- Keep runtime Unity scripts under `Assets/_Project/Scripts/`.
- Prefer deterministic, testable systems over editor-only manual work.
- Prefer prefab-based, data-driven systems for maps, loot, enemies, items, and gem definitions.
- Do not edit Unity YAML scene or prefab files blindly unless necessary.
- Do not store secrets, API keys, keystores, passwords, tokens, or Unity credentials in the repository.
- Do not commit generated cache or build folders.

## Reports

Every implementation task must end with a report in `reports/codex-runs/`.

Each report should include:

- Summary of changed files.
- How to test.
- What was actually tested.
- Known limitations.
- Screenshots or video for visual or gameplay changes when possible.
- Unity console errors or warnings, if any.
- Android build result when the task touches build or runtime-critical systems.

## Commits

Use small commits with this message format:

```text
type(scope): summary
```

Examples:

```text
feat(map): add modular room generator
test(items): add gem fusion tests
```

Never knowingly commit broken compilation. Never rewrite history unless explicitly instructed.

## Definition of Done

A task is complete only when the requested behavior is implemented, relevant validation has been run, no unrelated files were changed, and the final report has been written in `reports/codex-runs/`.
