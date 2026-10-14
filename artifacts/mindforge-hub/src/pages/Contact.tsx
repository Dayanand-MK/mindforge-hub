import { useState } from "react";
import { Link } from "wouter";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";
export default function Contact() {
  const [prepared, setPrepared] = useState("");
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">LET’S TALK ABOUT YOUR PROJECT</p>
        <h1>
          A good next step
          <br />
          starts with a clear brief.
        </h1>
        <p className="muted">
          Share where you are, where you want to get to and the support you need
          along the way.
        </p>
      </section>
      <section className="container contact-layout">
        <aside>
          <div className="panel">
            <h2 className="section-heading">Reach us directly</h2>
            <a
              className="contact-method"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
              <span>
                WhatsApp<small>+91 80567 27034</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a className="contact-method" href={"mailto:" + site.email}>
              <Mail size={20} />
              <span>
                Email<small>{site.email}</small>
              </span>
            </a>
            <a
              className="text-link mt-5"
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find us on Instagram ↗
            </a>
          </div>
          <div className="panel mt-5">
            <h2 className="section-heading">Keep your enquiry in one place</h2>
            <p className="muted text-sm">
              Sign in to save your requirements and follow enquiries, agreed
              scope and project progress.
            </p>
            <Link href="/dashboard/new" className="btn-outline mt-5">
              Open your workspace
            </Link>
          </div>
        </aside>
        <form
          className="panel form-stack"
          onChange={() => setPrepared("")}
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget));
            if (data.company) return;
            const text = [
              "Project enquiry for " + site.name,
              ...Object.entries(data)
                .filter(([k, v]) => k !== "company" && v)
                .map(([k, v]) => k + ": " + v),
            ].join("\n");
            setPrepared(whatsappUrl(text));
          }}
        >
          <h2 className="section-heading">Prepare a project enquiry</h2>
          <p className="muted text-sm">
            This form prepares a WhatsApp draft. Review it in WhatsApp and press
            Send yourself.
          </p>
          <div className="hidden" aria-hidden="true">
            <label>
              Leave empty
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="form-grid">
            <label>
              Your name
              <input name="Name" autoComplete="name" required maxLength={100} />
            </label>
            <label>
              Email (optional)
              <input
                name="Email"
                type="email"
                autoComplete="email"
                maxLength={254}
              />
            </label>
          </div>
          <div className="form-grid">
            <label>
              Domain
              <select name="Domain" required>
                <option value="">Choose a domain</option>
                {[
                  "Python",
                  "Java",
                  "AI / ML",
                  "Web development",
                  "Documentation",
                  "Presentation / viva",
                  "Other",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Current stage
              <select name="Stage" required>
                <option value="">Choose a stage</option>
                {[
                  "Choosing a topic",
                  "Planning",
                  "Developing",
                  "Testing / debugging",
                  "Documentation",
                  "Viva preparation",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Requirements and questions
            <textarea
              name="Requirements"
              required
              minLength={20}
              maxLength={2000}
              rows={5}
              placeholder="What are you building, and where do you need support?"
            />
          </label>
          <div className="form-grid">
            <label>
              Preferred deadline
              <input name="Deadline" type="date" />
            </label>
            <label>
              Budget range (optional)
              <input name="Budget" maxLength={100} placeholder="To discuss" />
            </label>
          </div>
          <p className="muted text-sm">
            Share only what is needed. Don’t include passwords or private
            student records.{" "}
            <Link href="/privacy" className="text-link">
              Privacy information
            </Link>
            .
          </p>
          <button className="btn-primary">
            Prepare WhatsApp Message
            <ArrowUpRight size={16} />
          </button>
          {prepared && (
            <div className="feedback">
              <p role="status">
                Your message is ready. Nothing has been sent yet.
              </p>
              <a
                className="btn-outline mt-3"
                href={prepared}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open WhatsApp to review and send
              </a>
            </div>
          )}
          <Link href="/dashboard/new" className="text-link">
            Prefer to save your enquiry? Sign in to your workspace.
          </Link>
        </form>
      </section>
    </>
  );
}
