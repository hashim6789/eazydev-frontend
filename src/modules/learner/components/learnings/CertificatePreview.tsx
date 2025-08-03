import React from "react";
import useFetch from "../../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Certificate from "./Certicate";
import { CertificateData } from "../../../../types";

const CertificatePreview: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const { data: certificateData, loading } = useFetch<CertificateData>(
    `/certificates/${certificateId}`
  );
  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-600 font-medium">
              Loading certificate preview...
            </p>
          </div>
        ) : certificateData ? (
          <Certificate certificateData={certificateData} type="preview" />
        ) : (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-600 font-medium">
              No certificate data available. Please check again later.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CertificatePreview;
