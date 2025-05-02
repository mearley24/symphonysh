
export function LoadingIndicator() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-accent/30 rounded-full mb-4"></div>
        <p className="text-white">Loading scheduling page...</p>
      </div>
    </div>
  );
}
