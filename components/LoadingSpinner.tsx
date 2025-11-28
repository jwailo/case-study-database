export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#EE0B4F] mb-4"></div>
        <p className="text-gray-600 font-medium">Loading case studies...</p>
      </div>
    </div>
  );
}
