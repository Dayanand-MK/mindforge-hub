import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  runTransaction,
  writeBatch,
} from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { useEffect, useState } from "react";
export type Row = { id: string; [key: string]: any };
export function useRows(path: string, ownerUid?: string) {
  const [rows, setRows] = useState<Row[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  useEffect(() => {
    setLoading(true);
    setRows([]);
    setError("");
    const ref = collection(db, path);
    const q = ownerUid
      ? query(ref, where("ownerUid", "==", ownerUid))
      : query(ref);
    return onSnapshot(
      q,
      (s) => {
        setRows(
          s.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .sort(
              (a: any, b: any) =>
                (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
            ),
        );
        setLoading(false);
      },
      () => {
        setError(
          "Could not load records. Check your connection or ask for access support.",
        );
        setLoading(false);
      },
    );
  }, [path, ownerUid]);
  return { rows, loading, error };
}
export function useRecord(path: string) {
  const [data, setData] = useState<Row | null>(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    setData(null);
    setError("");
    setLoading(true);
    return onSnapshot(
      doc(db, path),
      (s) => {
        setData(s.exists() ? { id: s.id, ...s.data() } : null);
        setLoading(false);
      },
      () => {
        setError("This record is unavailable or you do not have access.");
        setLoading(false);
      },
    );
  }, [path]);
  return { data, error, loading };
}
export const dateText = (v: any) =>
  v?.toDate ? v.toDate().toLocaleDateString("en-IN") : "—";
export function audit(
  batch: ReturnType<typeof writeBatch>,
  path: string,
  action: string,
) {
  const ref = doc(collection(db, "activity"));
  batch.set(ref, {
    actorUid: auth.currentUser!.uid,
    action,
    entityPath: path,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
export async function saveRecord(
  path: string,
  data: Record<string, unknown>,
  action: string,
  merge = false,
) {
  const batch = writeBatch(db);
  const auditId = audit(batch, path, action);
  batch.set(
    doc(db, path),
    { ...data, auditId, updatedAt: serverTimestamp() },
    { merge },
  );
  await batch.commit();
}
export async function submitEnquiry(id: string, data: Record<string, unknown>) {
  const uid = auth.currentUser!.uid,
    ref = doc(db, "enquiries", id),
    limit = doc(db, "submissionLimits", uid);
  await runTransaction(db, async (tx) => {
    const prior = await tx.get(ref);
    if (prior.exists()) return;
    const recent = await tx.get(limit);
    if (recent.exists() && Date.now() - recent.data().lastAt.toMillis() < 60000)
      throw new Error(
        "Please wait a minute before submitting another enquiry.",
      );
    tx.set(ref, {
      ...data,
      ownerUid: uid,
      status: "Enquiry Received",
      projectId: "",
      archived: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    tx.set(limit, { enquiryId: id, lastAt: serverTimestamp() });
  });
}
export async function projectFromEnquiry(id: string) {
  const source = doc(db, "enquiries", id),
    project = doc(collection(db, "projects"));
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(source);
    const e = snap.data();
    if (!e || e.status !== "Confirmed" || e.projectId)
      throw new Error(
        "Confirm the enquiry first, or open its existing project.",
      );
    const pLog = doc(collection(db, "activity")),
      eLog = doc(collection(db, "activity"));
    tx.set(project, {
      ownerUid: e.ownerUid,
      title: e.title,
      domain: e.domain,
      scope: e.requirements,
      status: "Confirmed",
      deadline: e.deadline,
      price: 0,
      sourceEnquiryId: id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      auditId: pLog.id,
    });
    tx.update(source, {
      projectId: project.id,
      updatedAt: serverTimestamp(),
      auditId: eLog.id,
    });
    for (const [ref, entityPath] of [
      [pLog, `projects/${project.id}`],
      [eLog, `enquiries/${id}`],
    ] as const)
      tx.set(ref, {
        actorUid: auth.currentUser!.uid,
        action: "Create project from confirmed enquiry",
        entityPath,
        createdAt: serverTimestamp(),
      });
  });
  return project.id;
}
export async function addUpdate(projectId: string, body: string) {
  const ref = doc(collection(db, `projects/${projectId}/updates`));
  const batch = writeBatch(db);
  const auditId = audit(batch, ref.path, "Publish progress update");
  batch.set(ref, { body, createdAt: serverTimestamp(), auditId });
  await batch.commit();
}
export async function ensureProfile() {
  const user = auth.currentUser!;
  const ref = doc(db, "users", user.uid);
  await runTransaction(db, async (tx) => {
    if (!(await tx.get(ref)).exists())
      tx.set(ref, {
        name: (user.displayName || "Customer").slice(0, 100),
        email: user.email,
        contactPreference: "Email",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
  });
}
