# Agent Instructions

This repository is intended to be worked on by multiple Codex sessions and possibly parallel agents.

## Required Continuity Files

- `spec.md`: Keep the concrete product and technical specification current.
- `architecture.md`: Keep high-level architecture and Mermaid diagrams current.
- `implementation.md`: Record what exists now, how to run it, and known follow-ups.
- `memory.md`: Store durable agent memory, user preferences, and decisions.
- `AGENT.md`: Explain this repo's collaboration conventions and important instructions.

Update these files as meaningful decisions or implementation changes are made.

## Engineering Conventions

- Prefer popular open source TypeScript tooling.
- Keep frontend, backend, domain, and storage boundaries explicit.
- Application code should depend on storage interfaces, not concrete databases.
- New database backends belong in `packages/storage` as adapters behind the existing contracts.
- Keep GitHub Pages deployable as a static frontend. Browser persistence should continue to use the shared storage abstraction.
- Avoid unrelated refactors when making targeted changes.

## Verification

Before handing off meaningful code changes, run:

```sh
npm run build
```

Run narrower checks first when debugging, but keep `implementation.md` updated if verification is blocked.
