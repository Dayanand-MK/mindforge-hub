import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-12 text-center max-w-md">
        <div className="text-7xl mb-6">🔭</div>
        <h1 className="text-6xl font-black text-white mb-3 font-display">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn-primary glow-hover px-8 py-3">
          Go Home
        </Link>
      </div>
    </div>
  );
}
