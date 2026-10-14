import { useEffect } from "react";
import { useLocation } from "wouter";
import AuthGate, { useSession } from "./Auth";
import Admin from "./Admin";
import Customer from "./Customer";
function Workspace() {
  const [path, navigate] = useLocation();
  const { admin } = useSession();
  useEffect(() => {
    if (path === "/sign-in")
      navigate(admin ? "/admin" : "/dashboard", { replace: true });
  }, [path, admin, navigate]);
  return path.startsWith("/admin") ? (
    <Admin />
  ) : path === "/sign-in" ? (
    <p role="status">Opening your workspace…</p>
  ) : (
    <Customer />
  );
}
export default function Entry() {
  const [path] = useLocation();
  return (
    <AuthGate adminOnly={path === "/admin" || path.startsWith("/admin/")}>
      <Workspace />
    </AuthGate>
  );
}
