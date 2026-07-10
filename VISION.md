# Vision

## Purpose

This website is more than a portfolio.

It should grow alongside my career and become my professional home on the web.

Rather than only showcasing finished projects, it should also reflect my learning journey, engineering mindset, technical interests, and personal growth.

Visitors should leave with a clear understanding of who I am as a developer and how I approach solving problems.

---

## Target Audience

The website is intended for:

- Recruiters
- Internship opportunities
- Potential clients
- Hackathon judges
- Open source collaborators
- Fellow developers
- Anyone interested in my work

---

## Long-Term Direction

The website should eventually evolve into a complete developer hub.

Potential future sections include:

- Projects
- Blog
- Certificates
- Technical Notes
- Experience
- Events
- Resume

Not every feature needs to exist immediately.

Features should only be added when they provide real value.

---

## Content Strategy

Each section should have a single, well-defined purpose.

Avoid repeating the same information across multiple sections.

Information should complement other sections rather than duplicate them.

Examples:

- Skills should describe technical abilities and competencies.
- Projects should demonstrate those skills through real work rather than listing them again.
- Experience should focus on responsibilities, achievements, and impact.
- About should introduce who I am, my interests, and my goals without repeating my resume.

Whenever possible, reference information instead of restating it.

## Design Philosophy

The design should feel:

- Personal
- Professional
- Clean
- Modern
- Timeless

Avoid designs that look like generic AI-generated portfolio templates.

Avoid relying on trendy visual effects simply because they are popular.

Every section should have a clear purpose.

Prefer quality over quantity.

Prefer authenticity over decoration.

Animations should improve the experience rather than distract from it.

---

## Visual Identity

The visual identity should feel distinctive and memorable rather than following common portfolio templates.

Avoid reproducing popular AI-generated portfolio patterns such as:

- Large centered hero sections with little personality
- Generic gradient backgrounds used only for visual impact
- Glassmorphism without a functional purpose
- Repetitive feature-card grids
- Placeholder illustrations
- Decorative animations that do not improve usability

The design should communicate craftsmanship through thoughtful typography, spacing, layout, color, and meaningful visual hierarchy.

Each section should have a clear purpose and reflect the content it presents rather than following trends.

## Projects

The homepage should showcase only featured projects.

A dedicated `/projects` page should eventually become the complete archive containing:

- Personal projects
- Academic projects
- Hackathon projects
- Research projects

Each project should eventually include:

- Overview
- Technologies
- Screenshots
- Development process
- Challenges
- Lessons learned
- GitHub repository
- Live demo (when available)

---

## Navigation

The site should feel like a single-page experience first, with `/projects` as a deliberate, secondary destination rather than a primary nav target.

- The header and footer nav items (Home, About, Skills, Projects, Contact) are same-page scroll links to the homepage's sections. Clicking "Projects" in the nav scrolls to the homepage's Featured Projects section — it does not navigate to `/projects`.
- When on a page other than the homepage (e.g. `/projects`), those same nav items navigate back to the homepage and scroll to the corresponding section, so the behavior is consistent no matter where the visitor started.
- `/projects` is reached only through an explicit, clearly-labeled link (e.g. "View all projects") placed inside the homepage's Featured Projects section — never from the primary nav.
- This applies to any future secondary pages (Blog, Certificates, etc.): they get their own explicit entry point from the relevant homepage section, not a permanent primary-nav slot, unless a page becomes central enough to the site's purpose to warrant one.

---

## Backend

The current backend using Vercel Serverless Functions and Nodemailer should remain lightweight.

Only expand backend functionality when there is a clear need.

---

## Architecture

Major architectural or design changes should always be proposed first.

Implementation should only happen after approval.