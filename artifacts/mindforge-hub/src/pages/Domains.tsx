const domains = [
  { icon: "🤖", title: "AI / ML", desc: "Machine learning models, neural networks, NLP, computer vision projects.", color: "from-purple-600/20 to-violet-600/20", border: "border-purple-500/30" },
  { icon: "📊", title: "Data Science", desc: "Data analysis, visualization, predictive modeling, and EDA projects.", color: "from-blue-600/20 to-cyan-600/20", border: "border-blue-500/30" },
  { icon: "🌐", title: "Web Development", desc: "Full-stack web apps, React, Node.js, Flask, Django projects.", color: "from-cyan-600/20 to-teal-600/20", border: "border-cyan-500/30" },
  { icon: "🐍", title: "Python Projects", desc: "Automation, scripting, desktop apps, and Python-based solutions.", color: "from-green-600/20 to-emerald-600/20", border: "border-green-500/30" },
  { icon: "☕", title: "Java Projects", desc: "Java applications, Spring Boot, Android development, and enterprise apps.", color: "from-orange-600/20 to-amber-600/20", border: "border-orange-500/30" },
  { icon: "📡", title: "IoT", desc: "Internet of Things projects with sensors, microcontrollers, and cloud.", color: "from-red-600/20 to-rose-600/20", border: "border-red-500/30" },
  { icon: "☁️", title: "Cloud Computing", desc: "AWS, GCP, Azure deployments, serverless, and cloud-native projects.", color: "from-sky-600/20 to-blue-600/20", border: "border-sky-500/30" },
  { icon: "🔐", title: "Cybersecurity", desc: "Network security, ethical hacking, encryption, and security analysis.", color: "from-slate-600/20 to-gray-600/20", border: "border-slate-500/30" },
  { icon: "🎨", title: "UI/UX Design", desc: "User interface design, Figma prototyping, and UX research projects.", color: "from-pink-600/20 to-rose-600/20", border: "border-pink-500/30" },
];

export default function Domains() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="section-title text-white mb-4">Project <span className="gradient-text">Domains</span></h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            We support projects across a wide range of technical domains
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map(({ icon, title, desc, color, border }) => (
            <div
              key={title}
              className={`glass rounded-2xl p-6 border ${border} bg-gradient-to-br ${color} glow-hover group cursor-default`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
              <h3 className="text-white font-bold text-xl mb-2 font-['Space_Grotesk']">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">Don't see your domain? We cover many more areas!</p>
          <a
            href="/contact"
            className="btn-primary glow-hover px-8 py-4"
          >
            Discuss Your Project
          </a>
        </div>
      </div>
    </div>
  );
}
