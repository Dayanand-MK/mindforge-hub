import { site } from "@/lib/site";
export default function Terms() {
  return (
    <article className="container legal-page">
      <p className="eyebrow">SERVICE INFORMATION</p>
      <h1>Service terms</h1>
      <h2>Agree the scope before work starts</h2>
      <p>
        An enquiry is a request for discussion, not an order confirmation.
        Confirm the deliverables, price, payment schedule, timeline, revisions
        and cancellation terms in writing before paying or starting work.
        Previously listed price ranges are indicative until confirmed.
      </p>
      <h2>Guidance and academic integrity</h2>
      <p>
        MindForge Hub provides educational guidance and software support. You
        remain responsible for understanding your implementation, citing sources
        and following your institution’s rules. We do not promise grades,
        university approval or publication, and do not provide fabricated
        results or plagiarism evasion.
      </p>
      <h2>Changes, revisions and communication</h2>
      <p>
        Revision allowances and response arrangements depend on the written
        scope. New features or changed requirements may need a revised estimate
        and timeline. Dashboard status and progress updates record the agreed
        work; contact us promptly if an entry appears incorrect.
      </p>
      <h2>Accounts and materials</h2>
      <p>
        Keep access to your Google account secure. Share only material you are
        entitled to use. Do not submit passwords, secret keys or private student
        records. Confidential customer work will not be published as a portfolio
        example without permission.
      </p>
      <h2>Questions, cancellations and refunds</h2>
      <p>
        Request the terms applicable to your specific scope before payment. For
        questions or a cancellation request, contact{" "}
        <a className="text-link" href={"mailto:" + site.email}>
          {site.email}
        </a>{" "}
        and identify the enquiry or project involved.
      </p>
    </article>
  );
}
