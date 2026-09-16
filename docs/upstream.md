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

## Release supply-chain facts (separate provenance)

The `runtime` architecture element's copy also states that AI Cockpit's own
release artifacts ship with a dependency SBOM, checksums, and build
provenance. This is confirmed against the `xinglun/ai-cockpit` release
`v0.2.92`, not the commit revision above: `cockpit-release` (Rust) binds
version, target platform, distribution archive, and executable SHA-256, and
Anchore generates an SPDX-format dependency manifest per platform (`.spdx.json`,
attached to the release for 5 platforms). This describes AI Cockpit's own
software supply chain only — it is not a generic SBOM feature offered to
projects that adopt AI Cockpit, and must not be described as one.
