export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-netflix-gray border-t-netflix-red" />
    </div>
  );
}
