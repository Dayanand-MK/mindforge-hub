import { writeFile } from "node:fs/promises";
const target = new URL(
  "../../artifacts/mindforge-hub/.env.local",
  import.meta.url,
);
const content = `# Local emulator-only configuration. No production credentials.
VITE_FIREBASE_API_KEY=demo-local-key
VITE_FIREBASE_AUTH_DOMAIN=demo-mindforge.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=demo-mindforge
VITE_FIREBASE_STORAGE_BUCKET=demo-mindforge.appspot.com
VITE_FIREBASE_APP_ID=demo-local-app
VITE_USE_EMULATORS=true
VITE_NOINDEX=true
`;
try {
  await writeFile(target, content, { flag: "wx" });
  console.log(
    "Created local demo configuration. Start Firebase emulators and then the website (see docs/RUN-AND-DEPLOY.md).",
  );
} catch (error) {
  if (error.code === "EEXIST")
    throw new Error(
      "An .env.local already exists. It has not been overwritten. Review it before switching environments.",
    );
  throw error;
}
