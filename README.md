# Ujjal Sigdel - Personal Portfolio Website

## Overview

This repository contains the source code for my personal portfolio website.

Website:
https://www.ujjalsigdel.com.np

The goal of this project is to showcase my technical skills, projects, achievements, experience, and professional growth.

This repository is intended to evolve continuously throughout my academic and professional career. It is treated as a long-term software project rather than a one-time portfolio.

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

`main` is the engineering foundation, not the website: backend, shared logic
and configuration, design-system primitives, the theme contract, and content
(see FOUNDATION.md). The public site is built from a long-lived design
branch (currently `redesign`); each complete visual identity gets its own.
Changes flow one way, `main` → design branches.

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