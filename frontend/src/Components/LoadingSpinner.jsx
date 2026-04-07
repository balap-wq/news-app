export default function LoadingSpinner({ size = "medium" }) {
  const sizeClasses = {
    small: "h-6 w-6 border-2",
    medium: "h-10 w-10 border-4",
    large: "h-16 w-16 border-4",
  };

  return (
    <div className="flex items-center justify-center w-full py-10">
      <div
        className={`
          ${sizeClasses[size]}
          border-gray-400 border-t-orange-300 border-solid
          rounded-full animate-spin
        `}
      />
    </div>
  );
}
