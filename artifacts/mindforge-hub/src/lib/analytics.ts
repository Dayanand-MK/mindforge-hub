import { publicPaths, site } from "./site";
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } }
// Enable only after automatic/enhanced measurement is disabled in the GA stream.
// Otherwise Google could automatically collect enquiry text from outbound URLs.
const id = import.meta.env.VITE_GA_SAFE_EVENTS_CONFIRMED === "true" ? import.meta.env.VITE_GA_MEASUREMENT_ID || "" : "";
export function consentGranted() { try { return localStorage.getItem("analytics-consent") === "granted"; } catch { return false; } }
export function startAnalytics() {
  if (!/^G-[A-Z0-9]+$/.test(id) || !consentGranted() || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", id, { send_page_view: false, page_location: site.url + window.location.pathname, page_referrer: "", allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = document.createElement("script"); script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`; document.head.append(script);
}
// Never pass form values, customer IDs, queries, full URLs or free-text event labels.
export function trackEvent(event: "whatsapp_click" | "enquiry_submitted" | "contact_click" | "page_view", path = window.location.pathname) {
  if (!consentGranted() || !publicPaths.includes(path)) return;
  startAnalytics();
  window.gtag?.("event", event, { page_location: site.url + path, page_referrer: "", page_title: "MindForge public page" });
}
export const analyticsConfigured = /^G-[A-Z0-9]+$/.test(id);
