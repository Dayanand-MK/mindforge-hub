import { steps, CallToAction } from "@/components/PublicSections";
export default function HowItWorks() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">HOW IT WORKS</p>
        <h1>
          A shared understanding.
          <br />
          Then a practical plan.
        </h1>
        <p className="muted">
          Good project support starts with clear expectations. Here’s what the
          process looks like.
        </p>
      </section>
      <ol className="container process-list">
        {steps.map(([title, body], i) => (
          <li key={title}>
            <span className="step-number">0{i + 1}</span>
            <div>
              <h2>{title}</h2>
              <p className="muted">{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <section className="container mt-12">
        <div className="panel">
          <h2 className="section-heading">Bring a useful brief</h2>
          <p className="muted">
            Your domain, current progress, institution’s guidelines, preferred
            deadline and the questions you want to work through. Remove
            passwords, API keys and personal student records before sharing
            files.
          </p>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
