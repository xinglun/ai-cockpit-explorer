# Visualization Design System

This is a lightweight, presentation-only design system for the AI Cockpit
Explorer. It governs semantic colors, typography, motion, and geometry used
by the 3D scene and DOM UI so that spatial meaning stays consistent while the
interaction model is being validated.

It does **not** govern AI Cockpit domain behavior. Status semantics
(`GREEN` / `YELLOW` / `RED` / `UNKNOWN` / `PENDING`) are visual tokens only —
the authoritative meaning of those states comes from the upstream
[AI Cockpit](https://github.com/xinglun/ai-cockpit) runtime (see
`docs/upstream.md`).

Scope is intentionally minimal for v0.1: no Storybook, no token-generation
pipeline, no theming/white-label support. Add only what a real screen in this
app consumes.
