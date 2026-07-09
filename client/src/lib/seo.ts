import { useEffect } from "react";

const BASE_URL = "https://www.ujjalsigdel.com.np";
const DEFAULT_TITLE = "Ujjal Sigdel | Portfolio";
const DEFAULT_DESCRIPTION =
  "Portfolio of Ujjal Sigdel, a second-year Electronics, Communication and Information Engineering (BEI) student at Sagarmatha Engineering College — projects, skills, and a learning-in-public log.";

function setMetaByName(name: string, content: string) {
  document.querySelector(`meta[name="${name}"]`)?.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  document.querySelector(`meta[property="${property}"]`)?.setAttribute("content", content);
}

interface PageMeta {
  title?: string;
  description?: string;
  /** Route path for the canonical/og:url, e.g. "/projects". */
  path: string;
  /** For pages that shouldn't be indexed (the SPA 404 still returns HTTP 200). */
  noindex?: boolean;
}

// Keeps the head tags shipped in index.html in sync with the current route.
// Crawlers that execute JS (Google) see per-route values; everyone else gets
// the sensible homepage defaults baked into the HTML.
export function usePageMeta({ title, description, path, noindex }: PageMeta) {
  useEffect(() => {
    const t = title ?? DEFAULT_TITLE;
    const d = description ?? DEFAULT_DESCRIPTION;
    const url = BASE_URL + (path === "/" ? "/" : path);

    document.title = t;
    setMetaByName("description", d);
    setMetaByName("robots", noindex ? "noindex" : "index, follow");
    setMetaByProperty("og:title", t);
    setMetaByProperty("og:description", d);
    setMetaByProperty("og:url", url);
    setMetaByProperty("twitter:title", t);
    setMetaByProperty("twitter:description", d);
    setMetaByProperty("twitter:url", url);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  }, [title, description, path, noindex]);
}
