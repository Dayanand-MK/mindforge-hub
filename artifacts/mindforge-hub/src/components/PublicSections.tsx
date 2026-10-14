import { Link } from "wouter";
import {
  Compass,
  Code2,
  FileText,
  Presentation,
  MessagesSquare,
  ArrowUpRight,
} from "lucide-react";
export const services = [
  {
    icon: Compass,
    title: "Academic project guidance",
    description:
      "Turn a broad idea into a realistic plan. Work through feasibility, architecture and the decisions behind your implementation.",
    detail: "Topic selection · Project planning · System design",
  },
  {
    icon: Code2,
    title: "Software development support",
    description:
      "Get help understanding a difficult feature, debugging an issue or testing the software you are building.",
    detail: "Python · Java · AI / ML · Web development",
  },
  {
    icon: FileText,
    title: "Project documentation",
    description:
      "Give your own work a clear structure, from synopsis and diagrams to reports, references and final formatting.",
    detail: "Reports · Editing · Source attribution",
  },
  {
    icon: Presentation,
    title: "Presentation preparation",
    description:
      "Build a focused walkthrough of your problem, approach, implementation and results. Practise a demo you can explain.",
    detail: "Slide structure · Demo planning · Technical storytelling",
  },
  {
    icon: MessagesSquare,
    title: "Viva preparation",
    description:
      "Practise explaining design choices, answering technical questions and discussing the limitations of your work.",
    detail: "Mock questions · Project explanation · Feedback",
  },
];
export const steps = [
  [
    "Share your idea",
    "Tell us your domain, current progress and the support you need.",
  ],
  [
    "Define the scope",
    "Discuss the requirements, timeline and practical next steps.",
  ],
  [
    "Agree the details",
    "Confirm deliverables, pricing and revision terms before work begins.",
  ],
  [
    "Build with guidance",
    "Receive the agreed support and follow project updates in your workspace.",
  ],
  [
    "Review the work",
    "Review progress, clarify questions and complete the agreed scope.",
  ],
];
export function ServiceGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="service-grid">
      {services
        .slice(0, compact ? 3 : 5)
        .map(({ icon: Icon, title, description, detail }) => (
          <article key={title} className="service-item">
            <Icon className="service-icon" size={24} />
            <h3>{title}</h3>
            <p className="muted">{description}</p>
            <p className="service-detail">{detail}</p>
            <Link href="/contact" className="text-link">
              Discuss this service <ArrowUpRight size={15} />
            </Link>
          </article>
        ))}
    </div>
  );
}
export function CallToAction() {
  return (
    <section className="container">
      <div className="cta-band">
        <div>
          <p className="eyebrow">START WITH A CONVERSATION</p>
          <h2>A clearer path for your project.</h2>
          <p className="muted">
            Bring your brief, your questions, or the problem you’re stuck on.
          </p>
        </div>
        <Link href="/contact" className="btn-primary">
          Discuss your project
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
