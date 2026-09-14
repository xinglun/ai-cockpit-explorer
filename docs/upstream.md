# Upstream Source of Truth

Canonical repository:

```text
https://github.com/xinglun/ai-cockpit
```

## Explorer role

Presentation and comprehension layer only. This repository (`ai-cockpit-explorer`)
does not redefine AI Cockpit semantics and must not invent capabilities the
upstream runtime does not support.

## Canonical facts owned by AI Cockpit

- Lifecycle semantics (`inspect → attach → start → preflight → checkpoint → verify → finish → archive → close`)
- Repository Protocol (the repository-owned `.ai/` governance state)
- Verification semantics (evidence-based evaluation of a Contract)
- Evidence semantics (observable, structured facts)
- Decision states (`GREEN` / `YELLOW` / `RED` / `UNKNOWN`, and the separate human `PENDING` / `APPROVED` / `REJECTED` decision)
- Human authority boundary (verification is not approval)
- Capability claims (what AI Cockpit actually does today)

## Upstream AI Cockpit revision

```text
9403265d61f0b9d22ad0beb564561921d2b3b967
```

This is the revision of `xinglun/ai-cockpit` used to derive the architecture
and lifecycle facts rendered in `src/data/`. When architecture semantics are
updated, record the new upstream revision here alongside the change.
