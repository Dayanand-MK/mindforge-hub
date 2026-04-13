const projects = [
  {
    title: "Plant Disease Detection",
    domain: "AI / ML",
    tech: ["Python", "TensorFlow", "CNN", "OpenCV"],
    desc: "A deep learning-based system that identifies plant diseases from leaf images using Convolutional Neural Networks, achieving 94% accuracy across 38 disease categories.",
    features: ["Image preprocessing pipeline", "CNN model training", "Real-time prediction API", "Web interface"],
    icon: "🌿",
    color: "from-green-600/20 to-emerald-600/20",
    border: "border-green-500/30",
  },
  {
    title: "Sentiment Analysis System",
    domain: "NLP / Data Science",
    tech: ["Python", "NLTK", "Scikit-learn", "Flask"],
    desc: "A natural language processing system that analyzes sentiment from Twitter data and reviews, classifying opinions as positive, negative, or neutral with 89% accuracy.",
    features: ["Text preprocessing & cleaning", "ML model with NLTK", "REST API with Flask", "Visual dashboard"],
    icon: "💬",
    color: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-500/30",
  },
  {
    title: "Disaster Management System",
    domain: "Web Development",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    desc: "A real-time disaster coordination platform enabling emergency responders to manage incidents, resources, and communication during natural calamities.",
    features: ["Real-time incident tracking", "Resource allocation module", "Alert notification system", "Interactive map interface"],
    icon: "🆘",
    color: "from-red-600/20 to-orange-600/20",
    border: "border-red-500/30",
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="section-title text-white mb-4">Sample <span className="gradient-text">Projects</span></h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Explore projects we've guided students through — real, functional, and impressive
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map(({ title, domain, tech, desc, features, icon, color, border }) => (
            <div key={title} className={`glass rounded-2xl overflow-hidden border ${border} bg-gradient-to-br ${color} flex flex-col`}>
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{icon}</span>
                  <span className="glass px-3 py-1 rounded-full text-xs text-purple-300 border border-purple-500/30">{domain}</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-2 font-['Space_Grotesk']">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tech.map((t) => (
                    <span key={t} className="bg-white/10 text-gray-300 px-2.5 py-1 rounded-lg text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="space-y-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-400 text-xs">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-4 mt-auto border-t border-white/10">
                <a href="/contact" className="btn-outline w-full justify-center text-sm py-2">
                  Build Similar Project
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-white font-bold text-2xl mb-3 font-['Space_Grotesk']">Have a Project Idea?</h3>
            <p className="text-gray-400 mb-6">We can guide you to build something just as impressive for your academic requirements.</p>
            <a href="/contact" className="btn-primary glow-hover px-8 py-4">
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
