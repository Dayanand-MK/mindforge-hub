import { Link } from "wouter";
import logoImg from "@assets/IMG-20260408-WA0050.jpg_1776114309567.jpeg";

export default function Footer() {
  return (
    <footer className="glass-dark border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImg} alt="MindForge Hub" className="h-10 w-10 rounded-xl object-cover logo-glow" />
              <span className="text-white font-bold text-xl font-['Space_Grotesk']">MindForge Hub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              A guided project development and academic support platform helping students build their academic projects with expert assistance.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://wa.me/917000000000" target="_blank" rel="noopener noreferrer"
                className="p-2 glass rounded-lg text-green-400 hover:text-green-300 hover:bg-green-500/20 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.109 1.524 5.832L.057 23.09l5.398-1.417A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.359-.214-3.725.977.995-3.635-.234-.373A9.818 9.818 0 1112 21.818z"/>
                </svg>
              </a>
              <a href="mailto:mindforgehub26@gmail.com"
                className="p-2 glass rounded-lg text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/services", label: "Services" },
                { href: "/domains", label: "Domains" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.109 1.524 5.832L.057 23.09l5.398-1.417A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.359-.214-3.725.977.995-3.635-.234-.373A9.818 9.818 0 1112 21.818z"/>
                </svg>
                <a href="https://wa.me/917000000000" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">WhatsApp Us</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:mindforgehub26@gmail.com" className="hover:text-purple-400 transition-colors break-all">mindforgehub26@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2024 MindForge Hub. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Empowering students, one project at a time.</p>
        </div>
      </div>
    </footer>
  );
}
