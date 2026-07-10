# Development Workflow

This document describes the preferred workflow for developing this project.

These guidelines apply whether the contributor is myself, another developer, or an AI assistant.

---

## Before Making Changes

Always:

1. Understand the existing implementation.
2. Analyze the affected files.
3. Explain the proposed solution.
4. Wait for approval before major architectural or design changes.

---

## Large Changes Require Approval

Examples include:

- Folder restructuring
- Routing changes
- Major UI redesign
- Introducing new libraries
- Backend changes
- Removing existing functionality

Before implementation, explain:

- Why the change is beneficial
- Which files will change
- Possible drawbacks
- Alternative approaches

---

## Development Style

Prefer:

- Small milestones
- Reusable components
- Simple solutions
- Readable code
- Consistent naming

Avoid:

- Unnecessary abstractions
- Duplicate code
- Large unrelated commits

---

## Git Workflow

`main` is the engineering foundation (see `FOUNDATION.md`). All new work
starts from it:

feature/your-change

↓

main

↓

(merged down into) future design branches

Rules:

- Foundation and content work happens on short-lived `feature/*` branches
  off `main`, reviewed, then merged into `main`.
- Design work happens on feature branches off the design branch being
  worked on.
- Design branches receive foundation updates by merging `main` down.
  Nothing ever merges from a design branch into `main`.
- `redesign` (current production) predates the foundation and is not an
  engineering source — never base new work on it (see `ARCHITECTURE.md`).
- Never develop directly on `main` or on a long-lived design branch.
- CI (`.github/workflows/ci.yml`) must pass: type check, foundation
  guardrails, production build.

---

## Code Review Checklist

Before considering a task complete, review:

- Functionality
- Performance
- Accessibility
- Responsiveness
- Type safety
- Duplicate code
- Unused code
- Unused dependencies

---

## Project Principles

The objective is not to write the most complex code.

The objective is to build a maintainable, professional, long-term project.

Every improvement should move the project closer to that goal.

## Documentation

Whenever a significant architectural or workflow change is made:

- Update the relevant documentation.
- Keep documentation synchronized with the codebase.
- Remove outdated information rather than leaving conflicting notes.

## Definition of Done

A task is considered complete when:

- The requested functionality works.
- Existing functionality is not broken.
- Code is readable and maintainable.
- Unused code is removed.
- Documentation is updated if necessary.
- The project builds successfully.
- The implementation has been reviewed.