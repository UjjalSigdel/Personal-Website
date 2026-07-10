# Ujjal Sigdel - Personal Portfolio Website

## Overview

This repository contains the source code for my personal portfolio website.

Website:
https://www.ujjalsigdel.com.np

The goal of this project is to showcase my technical skills, projects, achievements, experience, and professional growth.

This repository is intended to evolve continuously throughout my academic and professional career. It is treated as a long-term software project rather than a one-time portfolio.

**How this repository is organized:** engineering and visual design are
deliberately separated. The branch you are probably looking at, `main`, is
the engineering foundation — it is **not** the production portfolio and
renders only a placeholder page. The current visual implementation lives on
the `redesign` branch; `main` exists so that future redesigns inherit the
engineering (backend, accessibility, SEO, performance, tooling) without
inheriting a visual identity. See the Branch Model section below and
`FOUNDATION.md`.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

### Backend

- Node.js
- Vercel Serverless Functions
- Nodemailer

### Deployment

- Vercel

### Version Control

- Git
- GitHub

---

## Current Features

- Responsive design
- Contact form
- Email delivery
- Downloadable CV
- Featured projects showcase
- Full project archive with category filtering (`/projects`)
- Skills section
- Smooth animations

---

## Local Development

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build production version

```bash
npm run build
```

---

## Branch Model

- `main` — the engineering foundation, not the website: backend, shared
  logic and configuration, design-system primitives, the theme contract,
  and content (see FOUNDATION.md). Changes flow one way,
  `main` → design branches.
- `redesign` — the current production design. It predates the foundation
  contract and is intentionally preserved as-is (see ARCHITECTURE.md).
- `v1.0-original` — frozen archive of the first version of the site.

Future redesigns branch from `main`, never from `redesign`.

Note: `npm run dev` on `main` serves the foundation's placeholder page.
To see the current production site locally, check out `redesign`.

---

## Documentation

Project documentation is stored in:

- FOUNDATION.md
- VISION.md
- ARCHITECTURE.md
- WORKFLOW.md
- ROADMAP.md
- CHANGELOG.md

These files should be read before making significant architectural or design changes.