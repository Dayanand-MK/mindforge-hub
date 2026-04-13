const steps = [
  {
    step: 1,
    title: "Submit Requirement",
    desc: "Fill out our contact form with your project details — domain, deadline, and requirements. We'll understand your needs thoroughly.",
    icon: "📝",
    color: "text-purple-400",
    bg: "bg-purple-600/20 border-purple-500/40",
  },
  {
    step: 2,
    title: "Get Custom Quote",
    desc: "Within 24 hours, we'll analyze your requirements and provide a transparent, affordable quote tailored to your project.",
    icon: "💰",
    color: "text-blue-400",
    bg: "bg-blue-600/20 border-blue-500/40",
  },
  {
    step: 3,
    title: "Pay Advance",
    desc: "Confirm your project by paying a small advance amount. We provide secure payment options and full transparency.",
    icon: "✅",
    color: "text-green-400",
    bg: "bg-green-600/20 border-green-500/40",
  },
  {
    step: 4,
    title: "Development Starts",
    desc: "Our expert team begins guiding you through the development process, with regular updates and milestone tracking.",
    icon: "⚡",
    color: "text-yellow-400",
    bg: "bg-yellow-600/20 border-yellow-500/40",
  },
  {
    step: 5,
    title: "Final Payment",
    desc: "Upon project completion and your satisfaction, the remaining balance is settled before final delivery.",
    icon: "💳",
    color: "text-orange-400",
    bg: "bg-orange-600/20 border-orange-500/40",
  },
  {
    step: 6,
    title: "Delivery + Explanation",
    desc: "Receive your complete project with full source code, documentation, and a thorough explanation session for viva preparation.",
    icon: "🎓",
    color: "text-pink-400",
    bg: "bg-pink-600/20 border-pink-500/40",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="section-title text-white mb-4">How It <span className="gradient-text">Works</span></h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Our streamlined process makes getting your project done easy and transparent
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600/60 via-indigo-600/40 to-transparent hidden md:block" />

          <div className="space-y-8">
            {steps.map(({ step, title, desc, icon, color, bg }) => (
              <div key={step} className="flex gap-6 group">
                {/* Step number bubble */}
                <div className="relative shrink-0">
                  <div className={`w-16 h-16 rounded-full border-2 ${bg} flex items-center justify-center z-10 relative transition-all duration-300 group-hover:scale-110`}>
                    <span className="text-2xl">{icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="glass rounded-2xl p-6 flex-1 glow-hover">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold ${color} uppercase tracking-wider`}>Step {step}</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2 font-['Space_Grotesk']">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-white font-bold text-2xl mb-3 font-['Space_Grotesk']">Ready to Begin?</h3>
            <p className="text-gray-400 mb-6">Start your project journey today — fill out the form and we'll take it from there.</p>
            <a href="/contact" className="btn-primary glow px-10 py-4 text-lg">
              Submit Your Requirement
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
