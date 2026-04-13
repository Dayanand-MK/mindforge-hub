import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useToast } from "../components/Toast";

const projectTypes = ["Mini Project", "Final Year Project", "Research Paper", "PPT / Presentation", "Other"];
const domains = ["AI / ML", "Data Science", "Web Development", "Python", "Java", "IoT", "Cloud Computing", "Cybersecurity", "UI/UX", "Other"];
const budgets = ["Below ₹500", "₹500 – ₹1,000", "₹1,000 – ₹3,000", "₹3,000 – ₹5,000", "₹5,000+", "Discuss on call"];

export default function Contact() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    projectType: "", domain: "", requirements: "",
    deadline: "", budget: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "leads"), {
        ...form,
        status: "new",
        createdAt: serverTimestamp(),
      });
      showToast("Your request has been submitted! We'll contact you soon.", "success");
      setForm({ name: "", phone: "", email: "", projectType: "", domain: "", requirements: "", deadline: "", budget: "" });
    } catch (err) {
      console.error(err);
      showToast("Failed to submit. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title text-white mb-4">Get in <span className="gradient-text">Touch</span></h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Fill out the form below and we'll get back to you within 24 hours with a custom quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4 font-['Space_Grotesk']">Reach Us</h3>

              <div className="space-y-3">
                <a href="https://wa.me/917000000000" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-green-600/10 border border-green-500/30 rounded-xl text-green-400 hover:bg-green-600/20 hover:border-green-400/50 hover:shadow-[0_0_16px_rgba(34,197,94,0.2)] transition-all duration-300">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.109 1.524 5.832L.057 23.09l5.398-1.417A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.359-.214-3.725.977.995-3.635-.234-.373A9.818 9.818 0 1112 21.818z"/>
                  </svg>
                  <div>
                    <p className="font-medium text-sm">WhatsApp</p>
                    <p className="text-xs text-green-300/70">Chat with us directly</p>
                  </div>
                </a>

                <a href="mailto:mindforgehub26@gmail.com"
                  className="flex items-center gap-3 p-3 bg-purple-600/10 border border-purple-500/30 rounded-xl text-purple-400 hover:bg-purple-600/20 hover:border-purple-400/50 hover:shadow-[0_0_16px_rgba(168,85,247,0.2)] transition-all duration-300">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <p className="text-xs text-purple-300/70 break-all">mindforgehub26@gmail.com</p>
                  </div>
                </a>

                <a href="https://www.instagram.com/themindforgehub/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-pink-600/10 border border-pink-500/30 rounded-xl text-pink-400 hover:bg-pink-600/20 hover:border-pink-400/50 hover:shadow-[0_0_16px_rgba(236,72,153,0.2)] transition-all duration-300">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <div>
                    <p className="font-medium text-sm">Instagram</p>
                    <p className="text-xs text-pink-300/70">@themindforgehub</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-3">Response Time</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>WhatsApp</span>
                  <span className="text-green-400">Within 1 hour</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Email / Form</span>
                  <span className="text-blue-400">Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <h3 className="text-white font-bold text-xl font-['Space_Grotesk'] mb-2">Project Inquiry Form</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Full Name <span className="text-red-400">*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} required
                    className="input-field" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                  <input name="phone" value={form.phone} onChange={handleChange} required
                    className="input-field" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Email Address <span className="text-red-400">*</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="input-field" placeholder="your@email.com" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Project Type</label>
                  <select name="projectType" value={form.projectType} onChange={handleChange} className="input-field">
                    <option value="">Select type...</option>
                    {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Domain</label>
                  <select name="domain" value={form.domain} onChange={handleChange} className="input-field">
                    <option value="">Select domain...</option>
                    {domains.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Project Requirements</label>
                <textarea name="requirements" value={form.requirements} onChange={handleChange}
                  className="input-field resize-none h-28" placeholder="Describe your project requirements, objectives, and any specific features you need..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Deadline</label>
                  <input name="deadline" type="date" value={form.deadline} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Budget Range</label>
                  <select name="budget" value={form.budget} onChange={handleChange} className="input-field">
                    <option value="">Select budget...</option>
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base glow-hover">
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Request
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
