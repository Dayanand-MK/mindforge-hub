import { Code2, Braces, BrainCircuit, PanelsTopLeft } from "lucide-react";
import { Link } from "wouter";
import { CallToAction } from "@/components/PublicSections";
const domains = [
  [
    "Python",
    Code2,
    "Work through application logic, automation, data handling and debugging. Share your libraries and current code so we can assess the problem.",
  ],
  [
    "Java",
    Braces,
    "Discuss object-oriented design, application structure, database integration and testing within the scope of your project.",
  ],
  [
    "AI / ML",
    BrainCircuit,
    "Start with a well-defined problem, suitable data and measurable evaluation. Understand model choices, limitations and responsible reporting.",
  ],
  [
    "Web development",
    PanelsTopLeft,
    "Plan interfaces, application flows, APIs and data storage. Get support with implementation, accessibility and testing.",
  ],
] as const;
export default function Domains() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">TECHNICAL DOMAINS</p>
        <h1>
          Start with the problem.
          <br />
          Choose the right tools.
        </h1>
        <p className="muted">
          Share your technology stack and expected outcome. We’ll confirm
          suitable support before making a commitment.
        </p>
      </section>
      <section className="container record-grid">
        {domains.map(([name, Icon, body]) => (
          <article className="panel" key={name}>
            <Icon className="service-icon" size={26} />
            <h2 className="section-heading mt-5">{name}</h2>
            <p className="muted">{body}</p>
            <Link href="/contact" className="text-link mt-5">
              Discuss {name} support ↗
            </Link>
          </article>
        ))}
      </section>
      <CallToAction />
    </>
  );
}
