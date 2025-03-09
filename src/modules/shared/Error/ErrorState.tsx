// ErrorState component for displaying error messages
export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load the requested data. Please try again later.",
  icon = true,
  actionButton = null,
}) => {
  return (
    <div className="flex items-center justify-center h-full w-full p-6">
      <div className="text-center max-w-md">
        {icon && (
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-5">{message}</p>
        {actionButton}
      </div>
    </div>
  );
};
