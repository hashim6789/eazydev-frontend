import { useCertificates } from "../../../hooks/useCertificate";
import { ErrorState, LoadingState, NoContentState } from "../../shared/Error";
import { format } from "date-fns";

const CertificatesList: React.FC = () => {
  const { certificates, loading, error, page, totalPages, nextPage, prevPage } =
    useCertificates(5); // fetch 5 certificates per page

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (certificates.length === 0) return <NoContentState />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Certificates</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="sm:flex justify-between items-start mb-3">
              <div className="mb-2 sm:mb-0">
                <h3 className="font-medium text-gray-900">
                  {certificate.course.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Issued on{" "}
                  {format(new Date(certificate.issueDate), "MMM d, yyyy")}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Certificate ID: {certificate.id.slice(-8)}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <a
                  href={`/certificates/${certificate.id}/download`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors bg-blue-100 px-3 py-1 rounded-md"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesList;
