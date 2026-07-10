export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date, e.g. "2026-08-01"
  tags: string[];
}

// Empty for now — the /blog page shows an "under construction" state
// whenever this is empty, and switches to a real post grid the moment
// entries are added here.
export const posts: BlogPost[] = [];
