import { Link } from "wouter";

const services = [
  {
    icon: "🎯",
    title: "Project Guidance",
    desc: "Complete end-to-end guidance for your academic project. We assist you from idea selection to final delivery.",
    features: [
      "Topic selection & feasibility study",
      "System design & architecture",
      "Step-by-step development support",
      "Testing & debugging help",
      "Final presentation preparation",
    ],
    color: "from-purple-600/20 to-indigo-600/20",
    border: "border-purple-500/30",
  },
  {
    icon: "📄",
    title: "Documentation Services",
    desc: "Professional academic documentation that meets university standards with proper formatting and plagiarism-free content.",
    features: [
      "Project reports & synopsis",
      "Research paper writing",
      "PowerPoint presentations",
      "Plagiarism reduction & checking",
      "Formatting as per university norms",
    ],
    color: "from-cyan-600/20 to-blue-600/20",
    border: "border-cyan-500/30",
    pricing: true,
  },
  {
    icon: "🎤",
    title: "Viva Training",
    desc: "Build your confidence and ace your viva examination with our comprehensive mock sessions and expert feedback.",
    features: [
      "Mock viva sessions",
      "Anticipated question preparation",
      "Project explanation coaching",
      "Confidence building exercises",
      "Technical Q&A practice",
    ],
    color: "from-green-600/20 to-emerald-600/20",
    border: "border-green-500/30",
  },
];

const pricingData = [
  { service: "Project Report", range: "₹500 – ₹1,500" },
  { service: "PowerPoint (PPT)", range: "₹300 – ₹1,000" },
  { service: "Research Paper", range: "₹1,000 – ₹3,000" },
  { service: "Plagiarism Reduction", range: "₹300 – ₹800" },
  { service: "Formatting & Editing", range: "₹300 – ₹700" },
];

export default function Services() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="section-title text-white mb-4">Our <span className="gradient-text">Services</span></h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Comprehensive academic support designed to help you succeed in your project journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map(({ icon, title, desc, features, color, border, pricing }) => (
            <div key={title} className={`glass rounded-2xl p-8 border ${border} bg-gradient-to-br ${color}`}>
              <div className="text-5xl mb-5">{icon}</div>
              <h3 className="text-white font-bold text-2xl mb-3 font-['Space_Grotesk']">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{desc}</p>

              <ul className="space-y-2 mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="btn-primary w-full justify-center">
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* Documentation Pricing */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-white font-bold text-2xl font-['Space_Grotesk'] mb-2">Documentation Pricing</h2>
          <p className="text-gray-400 text-sm mb-6">Transparent pricing for our documentation services</p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-gray-300 font-semibold">Service</th>
                  <th className="text-right py-3 text-gray-300 font-semibold">Price Range</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map(({ service, range }) => (
                  <tr key={service} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-white">{service}</td>
                    <td className="py-4 text-right">
                      <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                        {range}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-300 text-sm">
            Project pricing depends on complexity and requirements. Contact us for a custom quote.
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact" className="btn-primary glow px-10 py-4 text-lg">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
