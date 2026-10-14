import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const sync = () =>
      setDark(document.documentElement.classList.contains("dark"));
    const media = matchMedia("(prefers-color-scheme: dark)");
    const system = () => {
      try {
        if (!localStorage.getItem("mindforge-theme"))
          document.documentElement.classList.toggle("dark", media.matches);
      } catch {}
      sync();
    };
    sync();
    media.addEventListener("change", system);
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      observer.disconnect();
      media.removeEventListener("change", system);
    };
  }, []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem("mindforge-theme", next ? "dark" : "light");
    } catch {}
  };
  return (
    <button
      className="icon-button"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggle}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
