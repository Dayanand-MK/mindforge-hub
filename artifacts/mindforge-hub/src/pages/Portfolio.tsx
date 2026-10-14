import { usePublicContent } from "@/components/PublicContent";
import { CallToAction } from "@/components/PublicSections";
export default function Portfolio() {
  const { data: entries, state } = usePublicContent(true);
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">PROJECT PORTFOLIO</p>
        <h1>
          See the thinking
          <br />
          behind the work.
        </h1>
        <p className="muted">
          Published examples include the problem, technologies and scope.
          Demonstrations are labelled, and client work is shared only with
          permission.
        </p>
      </section>
      <section className="container">
        {entries.length ? (
          <div className="record-grid">
            {entries.map((e: any) => (
              <article className="panel" key={e.id}>
                <div className="flex justify-between gap-3">
                  <span className="eyebrow">{e.domain}</span>
                  <span className="status-tag">{e.kind}</span>
                </div>
                <h2 className="section-heading mt-5">{e.title}</h2>
                <p className="muted whitespace-pre-wrap">{e.description}</p>
                <p className="text-sm muted mt-5">{e.technologies}</p>
                {/^https:\/\//i.test(e.demoUrl) && (
                  <a
                    href={e.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link mt-5"
                  >
                    Open project demo ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>
              {state === "error"
                ? "Project examples are temporarily unavailable"
                : "A portfolio built on verified work."}
            </h2>
            <p className="muted mt-3">
              {state === "loading"
                ? "Checking for published examples…"
                : "No approved examples are published here yet. Contact us to discuss relevant work and what can be shared."}
            </p>
          </div>
        )}
      </section>
      <CallToAction />
    </>
  );
}
