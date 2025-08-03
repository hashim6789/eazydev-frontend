import useFetch from "../../../hooks/useFetch";
import { CertificateData } from "../../../types/certificate";
import { ErrorState, LoadingState, NoContentState } from "../../shared/Error";
import { format } from "date-fns";
import { useState } from "react";
import { Pagination } from "./Pagination";
import { PaginatedData } from "../../../types";
import { useNavigate } from "react-router-dom";

const CompletedCertificates: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const pageSize = 5;

  const {
    data: certificates,
    loading,
    error,
  } = useFetch<PaginatedData<CertificateData>>(
    `/certificates?page=${currentPage}&limit=${pageSize}`
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!certificates || certificates.body.length === 0)
    return <NoContentState />;

  const totalPages = certificates.last_page;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Certificates</h2>
        <p className="text-sm text-gray-500">
          {certificates.body.length} issued
        </p>
      </div>

      <div className="space-y-4">
        {certificates.body.map((cert) => (
          <div
            key={cert.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
          >
            <div className="sm:flex justify-between items-start mb-3">
              <div className="mb-2 sm:mb-0">
                <h3 className="font-medium text-gray-900">
                  {cert.course.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Issued on {format(new Date(cert.issueDate), "MMM d, yyyy")}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Certificate ID #{`CERT-${cert.id.slice(-8).toUpperCase()}`}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <button
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                  onClick={() => navigate(`/certificates/${cert.id}`)}
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CompletedCertificates;
