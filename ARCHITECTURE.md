# Project Architecture

## Frontend

Built using:

- React
- TypeScript
- Vite

UI uses reusable React components.

Animations are implemented using Framer Motion.

Styling uses Tailwind CSS.

---

## Backend

The backend is intentionally lightweight.

Responsibilities include:

- Contact form
- Email sending
- Validation
- Serverless API routes

Email is sent using Nodemailer.

Deployment uses Vercel Serverless Functions.

---

## Current Structure

Frontend

- Components
- Pages
- Assets
- Utilities

Backend

- API routes
- Mail handling

Configuration

- Vite
- Tailwind
- TypeScript

---

## Future Direction

Continue improving the architecture by:

- Removing unused dependencies
- Removing dead code
- Simplifying components
- Improving folder organization
- Improving type safety

Avoid unnecessary abstraction.

The project should remain easy to understand.

---

## Design Principles

- Simplicity
- Maintainability
- Readability
- Performance
- Scalability

---

## Routing

Current website is primarily a single-page application.

Future versions may expand into multiple pages while maintaining consistent navigation.

Examples:

/

/projects

/blog

/certificates

/experience

Only create new pages when they improve user experience.

## Keeping This Document Updated

Whenever significant architectural changes are made, this document should be updated to reflect the current structure.

It should always represent the actual project rather than planned changes.