import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
if (import.meta.env.VITE_USE_EMULATORS === "true") {
  if (!firebaseConfig.projectId?.startsWith("demo-") || !["localhost","127.0.0.1"].includes(window.location.hostname)) throw new Error("Emulators require a demo project on localhost.");
  connectAuthEmulator(auth,"http://127.0.0.1:9099",{disableWarnings:true});
  connectFirestoreEmulator(db,"127.0.0.1",8080);
  connectStorageEmulator(storage,"127.0.0.1",9199);
}
export default app;
