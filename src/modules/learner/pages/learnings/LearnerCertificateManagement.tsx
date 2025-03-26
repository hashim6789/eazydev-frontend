import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../configs";
import Certificate from "../../components/learnings/Certicate";
import { CertificateData } from "../../../../types";

const CourseCertificateManagement: React.FC = () => {
  const { progressId } = useParams(); // Retrieve progressId from the URL
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch certificate data based on progressId
  useEffect(() => {
    if (!progressId) return;

    const fetchCertificateData = async () => {
      setLoading(true);
      try {
        const response = await api.get<CertificateData>(
          `/api/progresses/${progressId}/certificate`
        );
        if (response.status === 201) {
          setCertificateData(response.data);
          console.log("progress data", response.data);
          console.log("progress data", certificateData);
        }
      } catch (error) {
        console.error("Error fetching certificate data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateData();
  }, [progressId]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">
            Course Certificate
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-600 font-medium">
                Loading certificate data...
              </p>
            </div>
          ) : certificateData ? (
            <Certificate certificateData={certificateData} />
          ) : (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-600 font-medium">
                Unable to load certificate data. Please try again later.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Your Course Platform. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CourseCertificateManagement;
