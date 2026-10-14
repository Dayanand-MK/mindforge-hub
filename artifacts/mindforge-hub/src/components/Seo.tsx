import { useEffect } from "react";
import { useLocation } from "wouter";
import { pageMetadata, site, structuredData } from "@/lib/site";
export default function Seo() {
  const [path] = useLocation();
  useEffect(() => {
    const data = pageMetadata(path);
    document.title = data.title;
    const meta = (key: string, value: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.append(el); }
      el.content = value;
    };
    meta("description", data.description);
    meta("robots", data.indexable ? "index,follow" : "noindex,nofollow");
    for (const [key, value] of Object.entries({ "og:title": data.title, "og:description": data.description, "og:url": data.canonical || site.url, "og:type": path.startsWith("/blog/") ? "article" : "website", "og:image": site.url + "/opengraph.jpg", "og:site_name": site.name })) meta(key, value, true);
    meta("twitter:card", "summary_large_image"); meta("twitter:title", data.title); meta("twitter:description", data.description); meta("twitter:image", site.url + "/opengraph.jpg");
    document.head.querySelector('link[rel="canonical"]')?.remove();
    if (data.canonical) { const el = document.createElement("link"); el.rel = "canonical"; el.href = data.canonical; document.head.append(el); }
    document.getElementById("site-schema")?.remove();
    const schema = structuredData(path);
    if (schema) { const el = document.createElement("script"); el.id = "site-schema"; el.type = "application/ld+json"; el.textContent = JSON.stringify(schema); document.head.append(el); }
    window.scrollTo(0, 0);
  }, [path]);
  return null;
}
