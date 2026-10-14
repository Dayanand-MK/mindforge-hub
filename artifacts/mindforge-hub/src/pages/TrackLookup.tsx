import { useState } from "react";
import { useLocation } from "wouter";
export default function TrackLookup() {
  const [id, setId] = useState(""); const [, navigate] = useLocation();
  return <section className="max-w-lg mx-auto pt-28 pb-16 px-4"><h1 className="section-title mb-6">Track your project</h1><form className="glass p-6 rounded-xl space-y-4" onSubmit={e => {e.preventDefault(); navigate(`/track/${encodeURIComponent(id.trim())}`);}}><label htmlFor="tracking-id" className="block">Your project ID</label><input id="tracking-id" className="input-field" value={id} onChange={e => setId(e.target.value)} required pattern="[A-Za-z0-9-]{3,80}" maxLength={80} autoComplete="off"/><p className="text-sm text-gray-300">Use the ID shared with you and sign in with the Google account linked to your project.</p><button className="btn-primary">Continue</button></form></section>;
}
