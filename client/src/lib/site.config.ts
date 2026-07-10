// Single source of truth for owner- and deployment-specific constants
// (FOUNDATION.md §6). Foundation code and design branches both read from
// here — never copy these values into components, markup, or API code.
//
// Not included by design: navigation structure (owned by each design branch)
// and section copy/voice (design-branch content). The static crawler-facing
// head in client/index.html and public/sitemap.xml duplicate some of these
// values because static files can't import TypeScript — when changing a
// value here, update those files in the same commit.

export const SITE = {
  /** Canonical origin, no trailing slash. */
  url: "https://www.ujjalsigdel.com.np",
  /** Default document title (homepage / fallback). */
  title: "Ujjal Sigdel | Portfolio",
  /** Default meta description (homepage / fallback). */
  description:
    "Portfolio of Ujjal Sigdel, a second-year Electronics, Communication and Information Engineering (BEI) student at Sagarmatha Engineering College — projects, skills, and a learning-in-public log.",

  owner: {
    name: "Ujjal Sigdel",
  },

  contact: {
    /** Where the contact form delivers, and the public contact address. */
    email: "contact@ujjalsigdel.com.np",
    phone: "+977 9761622468",
    phoneHref: "tel:+9779761622468",
    location: "Kathmandu, Nepal",
    locationMapUrl: "https://www.google.com/maps/place/Kathmandu,+Nepal",
  },

  social: {
    github: "https://github.com/UjjalSigdel",
    linkedin: "https://www.linkedin.com/in/ujjal-sigdel-07a292330/",
    facebook: "https://www.facebook.com/ujjalsigdel",
    instagram: "https://www.instagram.com/ujjalsigdel",
  },

  cv: {
    /** Public path of the CV file. */
    path: "/MyCV.pdf",
    /** Filename suggested by the browser's download prompt. */
    downloadName: "Ujjal_Sigdel_CV.pdf",
  },
} as const;
