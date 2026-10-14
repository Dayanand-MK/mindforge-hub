import { useEffect, useState } from "react";
let client: Promise<any> | undefined;
// Separate unauthenticated app: public CMS queries never use a customer's session.
function publicClient() {
  return (client ||= Promise.all([
    import("firebase/app"),
    import("firebase/firestore"),
  ]).then(([app, fs]) => {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    if (!projectId) return null;
    const instance = app.initializeApp(
      { projectId, apiKey: import.meta.env.VITE_FIREBASE_API_KEY },
      "public-content",
    );
    const db = fs.getFirestore(instance);
    if (import.meta.env.VITE_USE_EMULATORS === "true") {
      if (
        !projectId.startsWith("demo-") ||
        !["localhost", "127.0.0.1"].includes(location.hostname)
      )
        return null;
      fs.connectFirestoreEmulator(db, "127.0.0.1", 8080);
    }
    return { fs, db };
  }));
}
export function usePublicContent(portfolio = false) {
  const [data, setData] = useState<any>(portfolio ? [] : null);
  const [state, setState] = useState("loading");
  useEffect(() => {
    let active = true,
      unsubscribe = () => {};
    publicClient()
      .then((c) => {
        if (!active) return;
        if (!c) {
          setState("unconfigured");
          return;
        }
        const { fs, db } = c;
        const ref = portfolio
          ? fs.query(
              fs.collection(db, "portfolio"),
              fs.where("published", "==", true),
            )
          : fs.doc(db, "siteContent", "main");
        unsubscribe = fs.onSnapshot(
          ref,
          (snapshot: any) => {
            setData(
              portfolio
                ? snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }))
                : snapshot.data(),
            );
            setState("ready");
          },
          () => setState("error"),
        );
      })
      .catch(() => {
        if (active) setState("error");
      });
    return () => {
      active = false;
      unsubscribe();
    };
  }, [portfolio]);
  return { data, state };
}
export function Announcement() {
  const { data } = usePublicContent();
  return data?.announcement ? (
    <div className="announcement">{data.announcement}</div>
  ) : null;
}
export function PricingNote() {
  const { data } = usePublicContent();
  return (
    <p className="muted">
      {data?.pricingNote ||
        "Pricing depends on scope, technology and timeline. Request a written estimate before work begins."}
    </p>
  );
}
