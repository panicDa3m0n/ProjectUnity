# AGENTS.md

## Project Identity
This repository contains The Archive, an Android-first free-to-play mobile extraction horror game built with Unity 6+.

The player is not treated as the character. The player is an external human connecting into an archive-like hostile system through an avatar. The tone is psychological, tense, systemic, and never arcade-shooter-like.

## Roles
The human CEO makes product and creative decisions.
The Project Manager provides architecture, task briefs, review criteria, and acceptance rules.
Codex implements only the assigned task. Do not expand scope without explicit approval.

## Core Technical Stack
- Engine: Unity 6+
- Target: Android first
- Rendering: URP mobile
- Camera: top-down 3D, preferably orthographic
- Code: C#
- IDE: Visual Studio Code with Codex
- Version control: Git + Git LFS
- Main project folder: `unity/TheArchive/`

## Work Rules
- Before editing, inspect the relevant files and summarize the intended change.
- Keep tasks atomic. Do not mix unrelated systems in one commit.
- Do not introduce paid assets, subscriptions, SDKs, or external services unless the task explicitly asks for them.
- Do not store secrets, API keys, keystores, passwords, tokens, or Unity credentials in the repo.
- Do not commit generated cache/build folders.
- Prefer deterministic, testable systems over editor-only manual work.
- Prefer prefab-based, data-driven systems for maps, loot, enemies, items, and gem definitions.
- Any AI-generated asset must be marked as candidate, not approved.

## Unity Rules
- Keep runtime scripts under `Assets/_Project/Scripts/`.
- Keep prefabs under `Assets/_Project/Prefabs/`.
- Keep ScriptableObjects/data under `Assets/_Project/Data/`.
- Keep prototype visuals under `Assets/_Project/Prototype/`.
- Use assembly definitions once the project has multiple systems.
- Do not edit Unity YAML scene/prefab files blindly unless necessary. Prefer editor scripts or generated prefabs where possible.
- After Unity package changes, report the exact package name and version.

## Architecture Principles
- Separate gameplay logic from presentation.
- Use ScriptableObjects for item, enemy, gem, room, loot, and season definitions.
- Keep extraction session logic independent from future multiplayer transport.
- Build bot-compatible systems from the start.
- Server-authoritative economy is planned; do not trust client-side inventory for final production.

## Asset Pipeline Rules
- Assets have states: `placeholder`, `candidate`, `approved`, `rejected`.
- Do not replace approved assets without explicit approval.
- For generated 3D assets, include source prompt, tool used, license/terms note, polycount, texture sizes, and screenshots.
- Mobile performance matters: low-poly, atlased textures, limited materials, readable silhouettes.

## Verification Required
Every implementation task must end with:
- Summary of changed files.
- How to test.
- What was actually tested.
- Known limitations.
- Screenshots or video for visual/gameplay changes when possible.
- Unity console errors/warnings, if any.
- Android build result when the task touches build/runtime-critical systems.

## Git Rules
- Use small commits.
- Commit message format: `type(scope): summary`
- Examples: `feat(map): add modular room generator`, `test(items): add gem fusion tests`
- Never commit broken compilation knowingly.
- Never rewrite history unless explicitly instructed.

## Definition of Done
A task is complete only when:
- Code compiles.
- The requested behavior is implemented.
- Relevant tests or validation steps were run.
- No unrelated files were changed.
- The final report is written in `reports/codex-runs/`.