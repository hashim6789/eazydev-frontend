// NoContentState component for displaying when no content is available
export const NoContentState = ({
  title = "No content found",
  message = "There are no items to display at the moment.",
  icon = true,
  actionButton = null,
}) => {
  return (
    <div className="flex items-center justify-center h-full w-full p-6">
      <div className="text-center max-w-md">
        {icon && (
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
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

// // Example usage:
// const ExampleUsage = () => {
//   // State to determine which component to show
//   const [status, setStatus] = React.useState('loading'); // 'loading', 'error', 'noContent', 'success'
//   const [data, setData] = React.useState(null);

//   // Example retry function
//   const handleRetry = () => {
//     setStatus('loading');
//     // Fetch data implementation here
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-7xl h-screen">
//       {status === 'loading' && (
//         <LoadingState message="Loading user details..." />
//       )}

//       {status === 'error' && (
//         <ErrorState
//           title="Failed to load data"
//           message="We couldn't retrieve the user information. Please try again."
//           actionButton={
//             <button
//               onClick={handleRetry}
//               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//             >
//               Try Again
//             </button>
//           }
//         />
//       )}

//       {status === 'noContent' && (
//         <NoContentState
//           title="No users found"
//           message="There are no users that match your search criteria."
//           actionButton={
//             <button
//               onClick={() => setStatus('success')}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Clear Filters
//             </button>
//           }
//         />
//       )}

//       {status === 'success' && data && (
//         <div>
//           {/* Your actual content here */}
//           <h1>User Details</h1>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExampleUsage;
