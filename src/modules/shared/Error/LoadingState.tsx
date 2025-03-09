// LoadingState component for displaying when content is loading
export const LoadingState = ({
  message = "Loading...",
  description = "Please wait while we fetch the information",
  spinnerSize = "h-12 w-12",
}) => {
  return (
    <div className="flex items-center justify-center h-full w-full p-6">
      <div className="text-center">
        <div
          className={`animate-spin ${spinnerSize} mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto`}
        ></div>
        <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
        {description && <p className="text-gray-500 mt-2">{description}</p>}
      </div>
    </div>
  );
};
