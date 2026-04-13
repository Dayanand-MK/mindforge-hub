import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import logoImg from "@assets/IMG-20260408-WA0050.jpg_1776114309567.jpeg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/domains", label: "Domains" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-dark shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="MindForge Hub"
              className="h-10 w-10 rounded-xl object-cover logo-glow"
            />
            <span className="text-white font-bold text-lg font-['Space_Grotesk'] group-hover:gradient-text transition-all">
              MindForge Hub
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location === href
                    ? "bg-purple-600/30 text-purple-300"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/track/MFH001" className="btn-outline text-sm py-2 px-4">
              Track Project
            </Link>
            <Link href="/contact" className="btn-primary text-sm py-2 px-4">
              Get Guidance
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden glass-dark rounded-xl mb-4 p-4 flex flex-col gap-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location === href ? "bg-purple-600/30 text-purple-300" : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-2 mt-1 flex flex-col gap-2">
              <Link href="/contact" className="btn-primary text-sm text-center" onClick={() => setMenuOpen(false)}>
                Get Guidance
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
