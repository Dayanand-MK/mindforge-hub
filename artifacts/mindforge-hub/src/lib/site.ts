export const site = {
  name: import.meta.env.VITE_BRAND_NAME || "MindForge Hub",
  url: (import.meta.env.VITE_SITE_URL || "https://mindforge-hub-mindforge-hub.vercel.app").replace(/\/$/, ""),
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "918056727034",
  email: import.meta.env.VITE_CONTACT_EMAIL || "mindforgehub26@gmail.com",
  instagram: "https://www.instagram.com/themindforgehub/",
};
export function whatsappUrl(message = "Hi, I would like to discuss guidance for my software project.") {
  if (!/^[1-9]\d{7,14}$/.test(site.whatsapp)) return "/contact";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const pages: Record<string, { title: string; description: string }> = {
  "/": { title: "Academic Project Guidance & Software Support", description: "Get guidance for academic software projects, development support, debugging, documentation and viva preparation. Share your requirements with MindForge Hub." },
  "/services": { title: "Project Guidance, Documentation & Viva Support", description: "Explore topic selection, software development guidance, debugging, report formatting and viva coaching. Agree scope, timelines and pricing before work starts." },
  "/domains": { title: "Python, Java & Software Project Domains", description: "Discuss software project guidance in Python, Java, web development, AI and data science. Share your technology stack to confirm suitable support." },
  "/portfolio": { title: "Project Portfolio", description: "Learn what to look for in a software project case study and discuss your requirements. Published examples require verified work and permission." },
  "/how-it-works": { title: "How Project Guidance Works", description: "Share your requirements, discuss scope and pricing, confirm deliverables, and receive the agreed educational guidance and software support." },
  "/contact": { title: "Discuss Your Software Project", description: "Send your domain, current project stage, deadline and requirements to request a scoped quote for project guidance, documentation or viva preparation." },
  "/faq": { title: "Project Support Questions", description: "Find answers about project guidance, requirements, pricing, timelines, revisions, privacy and academic integrity before making an enquiry." },
  "/privacy": { title: "Privacy & Enquiry Information", description: "Understand how project enquiries, contact details, WhatsApp links and optional analytics are handled, and how to contact MindForge Hub about your information." },
  "/blog": { title: "Software Project Learning Resources", description: "Practical guides for choosing a final-year software project, planning tests, documenting your own work and preparing for a project viva." },
  "/blog/choose-final-year-software-project": { title: "How to Choose a Final-Year Software Project", description: "Define a realistic problem, check data access and feasibility, plan a small working prototype and choose measurable tests for your final-year software project." },
  "/blog/software-project-viva": { title: "How to Prepare for a Software Project Viva", description: "Prepare an honest project explanation, rehearse a reliable demo, justify your design decisions and practise questions about testing and limitations." },
};
pages["/terms"]={title:"Service Terms",description:"Understand how project scope, pricing, revisions, account access and academic integrity expectations are agreed with MindForge Hub."};
export const publicPaths = Object.keys(pages);
export function pageMetadata(path: string) {
  const page = pages[path];
  return { title: page ? (path === "/" ? `${site.name} | ${page.title}` : `${page.title} | ${site.name}`) : `Private page or page not found | ${site.name}`,
    description: page?.description || "This page is not available for search indexing.",
    canonical: page ? site.url + (path === "/" ? "/" : path) : null,
    indexable: !!page && import.meta.env.VITE_NOINDEX !== "true" };
}
export function structuredData(path: string) {
  if (!pages[path]) return null;
  const organization = { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url, logo: `${site.url}/logo.png`, email: site.email, sameAs: [site.instagram] };
  const graph: object[] = [organization, { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, publisher: { "@id": organization["@id"] } }];
  if (path !== "/") graph.push({ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` }, { "@type": "ListItem", position: 2, name: pages[path].title, item: site.url + path }] });
  if (path === "/services") for (const name of ["Project Guidance", "Documentation Support", "Viva Preparation"]) graph.push({ "@type": "Service", name, provider: { "@id": organization["@id"] }, url: site.url + path });
  if (path.startsWith("/blog/")) graph.push({ "@type": "BlogPosting", headline: pages[path].title, description: pages[path].description, mainEntityOfPage: site.url + path, author: { "@id": organization["@id"] }, publisher: { "@id": organization["@id"] } });
  return { "@context": "https://schema.org", "@graph": graph };
}
