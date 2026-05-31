export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050816] text-white">
      <h1 className="text-5xl font-bold text-red-400">
        Access Denied
      </h1>

      <p className="mt-4 text-white/70">
        You are not authorized to access this admin panel.
      </p>

      <a
        href="/"
        className="mt-8 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 text-cyan-300 transition hover:bg-cyan-500/20"
      >
        Return to Portfolio
      </a>
    </div>
  );
}