import { build, loadEnv } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const env = { ...loadEnv('production', root, ''), ...process.env };
if (env.BASE_PATH && env.BASE_PATH !== '/') throw new Error('Static SEO build requires root hosting (BASE_PATH=/).');
if (env.VERCEL_ENV && env.VERCEL_ENV !== 'production') process.env.VITE_NOINDEX = 'true';
const configFile = path.join(root, 'vite.config.ts');
await build({ configFile, mode: 'production' });
await build({ configFile, mode: 'production', build: { ssr: path.join(root, 'src/entry-server.tsx'), outDir: path.join(root, 'dist/server'), emptyOutDir: true, rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } } } });
const { render, publicPaths, pageMetadata, structuredData, site } = await import(pathToFileURL(path.join(root, 'dist/server/entry-server.mjs')));
const origin = new URL(site.url);
if (origin.protocol !== 'https:' || origin.pathname !== '/' || origin.search || origin.hash) throw new Error('VITE_SITE_URL must be an HTTPS origin without a path, query or fragment.');
const out = path.join(root, 'dist/public');
const template = await readFile(path.join(out, 'index.html'), 'utf8');
const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const noindex = env.VITE_NOINDEX === 'true' || (env.VERCEL_ENV && env.VERCEL_ENV !== 'production');
function head(route) {
 const m = pageMetadata(route);
 const schema = structuredData(route);
 return `<title>${escape(m.title)}</title>
<meta name="description" content="${escape(m.description)}">
<meta name="robots" content="${!noindex && m.indexable ? 'index,follow' : 'noindex,nofollow'}">
${m.canonical ? `<link rel="canonical" href="${escape(m.canonical)}">` : ''}
<meta property="og:title" content="${escape(m.title)}"><meta property="og:description" content="${escape(m.description)}">
<meta property="og:type" content="${route.startsWith('/blog/') ? 'article' : 'website'}"><meta property="og:url" content="${escape(m.canonical || site.url)}">
<meta property="og:site_name" content="${escape(site.name)}"><meta property="og:image" content="${site.url}/opengraph.jpg">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(m.title)}"><meta name="twitter:description" content="${escape(m.description)}"><meta name="twitter:image" content="${site.url}/opengraph.jpg">
${env.VITE_GOOGLE_SITE_VERIFICATION ? `<meta name="google-site-verification" content="${escape(env.VITE_GOOGLE_SITE_VERIFICATION)}">` : ''}
${schema ? `<script id="site-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>` : ''}`;
}
for (const route of publicPaths) {
 const dir = path.join(out, route === '/' ? '' : route.slice(1)); await mkdir(dir, { recursive:true });
 await writeFile(path.join(dir, 'index.html'), template.replace('<!--seo-head-->', head(route)).replace('<!--app-html-->', render(route)));
}
await writeFile(path.join(out, 'app.html'), template.replace('<!--seo-head-->', head('/admin')).replace('<!--app-html-->', ''));
await writeFile(path.join(out, '404.html'), template.replace('<!--seo-head-->', head('/404')).replace('<!--app-html-->', render('/404')));
await writeFile(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${noindex ? '' : publicPaths.map(p=>`<url><loc>${escape(site.url + (p === '/' ? '/' : p))}</loc></url>`).join('')}</urlset>`);
await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`Generated ${publicPaths.length} public pages, private shell, 404, sitemap and robots.`);
