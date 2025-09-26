export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto"></div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-fg">Loading Tracker Tokens</h2>
          <p className="text-fg/70">Initializing privacy protection...</p>
        </div>
      </div>
    </div>
  );
}
