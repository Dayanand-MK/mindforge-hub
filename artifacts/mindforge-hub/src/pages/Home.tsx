import { Link } from "wouter";

const services = [
  {
    icon: "🎯",
    title: "Project Guidance",
    desc: "End-to-end support for your academic project from ideation to delivery.",
  },
  {
    icon: "📄",
    title: "Documentation",
    desc: "Professional reports, research papers, PPTs, and formatting assistance.",
  },
  {
    icon: "🎤",
    title: "Viva Training",
    desc: "Prepare confidently for your project viva with mock sessions and guidance.",
  },
];

const whyUs = [
  { icon: "⚡", title: "Fast Turnaround", desc: "Quick delivery without compromising quality" },
  { icon: "🔒", title: "100% Original", desc: "Plagiarism-free, unique work for every student" },
  { icon: "👨‍💻", title: "Expert Team", desc: "Experienced professionals in every domain" },
  { icon: "📱", title: "24/7 Support", desc: "Always available on WhatsApp for your queries" },
];

const testimonials = [
  { name: "Rahul S.", course: "B.Tech CSE", text: "MindForge Hub helped me build my final year AI project from scratch. The guidance was excellent!" },
  { name: "Priya M.", course: "MCA Final Year", text: "Got my documentation done perfectly. The team is very professional and responsive." },
  { name: "Arjun K.", course: "B.Tech IT", text: "Cleared my viva with confidence thanks to the mock sessions. Highly recommended!" },
];

const trustBadges = [
  { label: "500+ Projects", icon: "🏆" },
  { label: "100% Plagiarism Free", icon: "✅" },
  { label: "Expert Guidance", icon: "👨‍🎓" },
  { label: "On-time Delivery", icon: "⏱️" },
];

const pricingData = [
  { service: "Project Report", range: "₹500 – ₹1,500" },
  { service: "PowerPoint (PPT)", range: "₹300 – ₹1,000" },
  { service: "Research Paper", range: "₹1,000 – ₹3,000" },
  { service: "Plagiarism Reduction", range: "₹300 – ₹800" },
  { service: "Formatting & Editing", range: "₹300 – ₹700" },
];

const upcomingServices = [
  { title: "IoT Projects", desc: "Hardware + software integration for IoT-based academic projects", icon: "📡" },
  { title: "Hardware Projects", desc: "Circuit design and embedded system project guidance", icon: "🔧" },
];

export default function Home() {
  const scrollToContact = () => {
    window.location.href = "/contact";
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-purple-300 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Now accepting new project requests
          </div>

          <h1 className="text-5xl md:text-7xl font-black font-['Space_Grotesk'] text-white mb-6 leading-tight">
            Struggling with your{" "}
            <span className="gradient-text">Final Year</span>{" "}
            Project?
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light max-w-2xl mx-auto">
            We guide you to build it from scratch with complete support
          </p>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            MindForge Hub — a guided project development platform helping students succeed with expert assistance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary glow-hover text-base px-8 py-4">
              Get Project Guidance
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/services" className="btn-outline text-base px-8 py-4">
              Explore Services
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-14">
            {trustBadges.map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title text-white mb-4">Our <span className="gradient-text">Services</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">Comprehensive academic support tailored for students at every stage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(({ icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-6 glow-hover group">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-white font-bold text-xl mb-2 font-['Space_Grotesk']">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                <Link href="/services" className="mt-4 inline-flex items-center text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors">
                  Learn more <span className="ml-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title text-white mb-4">Why Choose <span className="gradient-text">Us?</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">What sets MindForge Hub apart from the rest</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title text-white mb-4">Documentation <span className="gradient-text">Pricing</span></h2>
            <p className="text-gray-400">Transparent pricing for documentation services</p>
          </div>

          <div className="glass rounded-2xl overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-gray-300 font-semibold">Service</th>
                  <th className="text-right px-6 py-4 text-gray-300 font-semibold">Price Range</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map(({ service, range }, i) => (
                  <tr key={service} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                    <td className="px-6 py-4 text-white">{service}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-block bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30">
                        {range}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="glass rounded-xl p-4 text-center text-yellow-300 text-sm border border-yellow-500/30 bg-yellow-500/10">
            <span className="font-semibold">Note:</span> Project pricing depends on complexity and requirements. Contact us for a custom quote.
          </div>
        </div>
      </section>

      {/* Upcoming Services */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title text-white mb-4">Upcoming <span className="gradient-text">Services</span></h2>
            <p className="text-gray-400">Exciting new offerings coming soon</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {upcomingServices.map(({ title, desc, icon }) => (
              <div key={title} className="glass rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-semibold">Coming Soon</span>
                </div>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title text-white mb-4">What Students <span className="gradient-text">Say</span></h2>
            <p className="text-gray-400">Real experiences from students we've helped</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, course, text }) => (
              <div key={name} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3 text-yellow-400">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{text}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{name}</p>
                  <p className="text-gray-500 text-xs">{course}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass rounded-3xl p-10">
            <h2 className="section-title text-white mb-4">Ready to <span className="gradient-text">Get Started?</span></h2>
            <p className="text-gray-400 mb-8">Fill out our form and we'll get back to you within 24 hours with a custom quote.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary glow-hover px-8 py-4">
                Get Project Guidance
              </Link>
              <a href="https://wa.me/917000000000" target="_blank" rel="noopener noreferrer" className="btn-outline px-8 py-4">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
