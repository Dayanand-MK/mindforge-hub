import { ServiceGrid, CallToAction } from "@/components/PublicSections";
import { PricingNote } from "@/components/PublicContent";
const pricing = [
  ["Project report", "₹500 – ₹1,500"],
  ["PowerPoint (PPT)", "₹300 – ₹1,000"],
  ["Research paper support", "₹1,000 – ₹3,000"],
  ["Similarity & citation support", "₹300 – ₹800"],
  ["Formatting & editing", "₹300 – ₹700"],
];
export default function Services() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">SERVICES</p>
        <h1>
          Practical support.
          <br />
          At the stage you need it.
        </h1>
        <p className="muted">
          From an early idea to a working demo and a well-explained project.
          Tell us where you are and we’ll discuss the right scope.
        </p>
      </section>
      <section className="container">
        <ServiceGrid />
      </section>
      <section className="container section-space split-section">
        <div>
          <p className="eyebrow">SCOPE FIRST, THEN PRICE</p>
          <h2>Discuss your requirements.</h2>
          <PricingNote />
          <p className="muted mt-5">
            The documentation ranges shown are retained from the existing
            website. Confirm current pricing, scope and payment terms before
            ordering.
          </p>
        </div>
        <div className="table-wrap">
          <table>
            <caption className="sr-only">
              Previously listed documentation price ranges
            </caption>
            <thead>
              <tr>
                <th>Documentation support</th>
                <th>Indicative range</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map(([s, p]) => (
                <tr key={s}>
                  <td>{s}</td>
                  <td>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
