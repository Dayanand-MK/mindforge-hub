import { renderToString } from "react-dom/server";
import App from "./App";
export { pages, publicPaths, pageMetadata, structuredData, site } from "./lib/site";
export function render(path: string) { return renderToString(<App ssrPath={path} />); }
