import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { whatsappUrl } from "@/lib/site";
import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebase/config";
import { useToast } from "../components/Toast";

interface Client {
  id: string;
  name: string;
  phone?: string;
  project: string;
  status: string;
  totalAmount: number;
  paidAmount: number;
  progress: number;
  createdAt?: string;
}

const STATUS_COLORS: Record<string, string> = {
  Pending: "badge-pending",
  "In Progress": "badge-progress",
  Completed: "badge-completed",
};

const PAYMENT_STATUS = (total: number, paid: number) => {
  if (paid === 0) return { label: "Pending", cls: "badge-pending" };
  if (paid >= total) return { label: "Paid", cls: "badge-completed" };
  return { label: "Partial", cls: "badge-progress" };
};

export default function Track() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { showToast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  useEffect(() => onAuthStateChanged(auth, u => { setUser(u); setClient(null); setAuthReady(true); }), []);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ txnId: "", amount: "", notes: "" });
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authReady || !user) { setLoading(false); return; }
    setLoading(true); setError("");
    let active = true;
    if (!id) { setError("Invalid tracking ID"); setLoading(false); return; }
    const fetchClient = async () => {
      try {
        const docRef = doc(db, "clients", id);
        const snap = await getDoc(docRef);
        if (!active) return;
        if (snap.exists()) {
          setClient({ id: snap.id, ...snap.data() } as Client);
        } else {
          setError("No record found for this ID. Please check your Customer ID.");
        }
      } catch (e) {
        if(active) setError("Access unavailable. Ask the business to link your signed-in account to this project.");
      } finally {
        if(active) setLoading(false);
      }
    };
    fetchClient();
    return () => { active = false; };
  }, [id, user, authReady]);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentForm.txnId || !paymentForm.amount) {
      showToast("Transaction ID and amount are required", "error");
      return;
    }
    const amount = Number(paymentForm.amount);
    if (!user || !Number.isFinite(amount) || amount <= 0 || paymentForm.txnId.trim().length > 150) { showToast("Enter a valid positive amount and transaction reference.", "error"); return; }
    if (screenshotFile && (!/^(image\/png|image\/jpeg|image\/webp)$/.test(screenshotFile.type) || screenshotFile.size > 5 * 1024 * 1024)) { showToast("Use a PNG, JPEG or WebP image under 5 MB.", "error"); return; }
    setSubmitting(true);
    try {
      let screenshotURL = "";
      if (screenshotFile) {
        const storageRef = ref(storage, `payment-proofs/${user.uid}/${id}/${crypto.randomUUID()}`);
        await uploadBytes(storageRef, screenshotFile);
        screenshotURL = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "paymentProofs"), {
        customerId: id,
        ownerUid: user.uid,
        txnId: paymentForm.txnId.trim(),
        amount: Number(paymentForm.amount),
        screenshotURL,
        notes: paymentForm.notes,
        status: "pending",
        timestamp: serverTimestamp(),
      });

      showToast("Payment proof submitted! Admin will verify soon.", "success");
      setPaymentForm({ txnId: "", amount: "", notes: "" });
      setScreenshotFile(null);
      setShowPaymentForm(false);
    } catch (e) {
      showToast("Failed to submit payment proof. Try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (authReady && !user) return <section className="max-w-lg mx-auto pt-28 pb-16 px-4"><h1 className="section-title mb-5">Sign in to track your project</h1><p className="mb-5">Use the Google account linked to your project by the business.</p><button className="btn-primary" onClick={() => signInWithPopup(auth, new GoogleAuthProvider()).catch(() => showToast("Sign-in failed. Please try again.", "error"))}>Sign in with Google</button></section>;
  if (!authReady || loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin w-12 h-12 text-purple-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-400">Fetching your project details...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-10 text-center max-w-md">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-white font-bold text-2xl mb-3">Project Not Found</h2>
          <p className="text-gray-400 mb-6">{error || "We couldn't find a project with this ID."}</p>
          <Link href="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const remaining = client.totalAmount - client.paidAmount;
  const payStatus = PAYMENT_STATUS(client.totalAmount, client.paidAmount);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <button className="btn-outline mb-4" onClick={() => signOut(auth)}>Sign out</button><p className="text-purple-300 text-sm font-medium mb-1">Customer ID</p>
              <h1 className="text-3xl font-black text-white font-display">{client.id}</h1>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${STATUS_COLORS[client.status] || "badge-pending"}`}>
              {client.status || "Pending"}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Customer Name</p>
              <p className="text-white font-semibold">{client.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Project Title</p>
              <p className="text-white font-semibold">{client.project}</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold">Project Progress</h3>
            <span className="text-purple-300 font-bold text-lg">{client.progress || 0}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-1000"
              style={{
                width: `${client.progress || 0}%`,
                background: "linear-gradient(90deg, #7c3aed, #6366f1, #06b6d4)"
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Started</span>
            <span>Completed</span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Payment Details</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${payStatus.cls}`}>{payStatus.label}</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 glass rounded-xl">
              <p className="text-gray-400 text-xs mb-1">Total Amount</p>
              <p className="text-white font-bold text-lg">₹{(client.totalAmount || 0).toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-green-600/10 border border-green-500/30 rounded-xl">
              <p className="text-gray-400 text-xs mb-1">Paid</p>
              <p className="text-green-400 font-bold text-lg">₹{(client.paidAmount || 0).toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-orange-600/10 border border-orange-500/30 rounded-xl">
              <p className="text-gray-400 text-xs mb-1">Remaining</p>
              <p className="text-orange-400 font-bold text-lg">₹{remaining.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Payment Proof Form */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Submit Payment Proof</h3>
            <button
              onClick={() => setShowPaymentForm(!showPaymentForm)}
              className="btn-primary text-sm py-2 px-4"
            >
              {showPaymentForm ? "Cancel" : "Submit Proof"}
            </button>
          </div>

          {showPaymentForm && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4 mt-4 border-t border-white/10 pt-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Transaction ID <span className="text-red-400">*</span></label>
                <input
                  value={paymentForm.txnId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, txnId: e.target.value })}
                  className="input-field" placeholder="UPI/Bank transaction ID" required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Amount Paid (₹) <span className="text-red-400">*</span></label>
                <input
                  type="number" min="0.01" step="0.01" value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="input-field" placeholder="Amount in rupees" required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Payment Screenshot</label>
                <div className="relative">
                  <input type="file" accept="image/*"
                    onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                    className="input-field file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-purple-600/30 file:text-purple-300 cursor-pointer"
                  />
                </div>
                {screenshotFile && (
                  <p className="text-green-400 text-xs mt-1">Selected: {screenshotFile.name}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Notes (optional)</label>
                <textarea
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                  className="input-field resize-none h-20" placeholder="Any additional notes..."
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3">
                {submitting ? "Submitting..." : "Submit Payment Proof"}
              </button>
            </form>
          )}
        </div>

        {/* WhatsApp support */}
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-gray-400 mb-4">For queries about your project, contact us directly on WhatsApp</p>
          <a
            href={whatsappUrl(`Hi, my customer ID is ${id} and I have a query.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.109 1.524 5.832L.057 23.09l5.398-1.417A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.359-.214-3.725.977.995-3.635-.234-.373A9.818 9.818 0 1112 21.818z"/>
            </svg>
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
