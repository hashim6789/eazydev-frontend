// src/components/CertificateGenerator.tsx
import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import confetti from "canvas-confetti";
import logoImage from "../../../../assets/img/logo.png";
import { CertificateData } from "../../../../types";
import { numberToDateString } from "../../../../utils/date.util";

interface CertificateProps {
  certificateData: CertificateData;
}

const Certificate: React.FC<CertificateProps> = ({ certificateData }) => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    // content: () => certificateRef.current, // Provide the certificate reference
    documentTitle: `${certificateData.course.title} Certificate - ${name}`, // Set the document title
    // onBeforeGetContent: () => {
    //   return new Promise<void>((resolve) => {
    //     setIsLoading(true); // Set loading state before printing
    //     resolve();
    //   });
    // },
    onAfterPrint: () => {
      setIsLoading(false); // Reset loading state after printing
    },
  });

  const generateCertificate = () => {
    setIsLoading(true);

    // Simulate a processing delay
    setTimeout(() => {
      setIsGenerated(true);
      setIsLoading(false);

      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1500);
  };

  const downloadCertificate = () => {
    handlePrint();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {!isGenerated ? (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <img
                className="h-12 w-auto"
                src={logoImage}
                alt="Course Logo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://via.placeholder.com/150";
                }}
              />
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Congratulations {certificateData.learner.firstName}{" "}
              {certificateData.learner.lastName || ""}, on Completing Your
              Course!
            </h2>

            <div className="mb-6">
              <p className="text-gray-600 text-center">
                You've successfully completed{" "}
                <span className="font-semibold">
                  {certificateData.course.title}
                </span>
                . Generate your certificate by entering your name below.
              </p>
            </div>

            <div className="space-y-4">
              {/* <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  placeholder="Enter your name as it should appear on the certificate"
                />
              </div> */}

              <button
                onClick={generateCertificate}
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Generate Certificate"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-8" ref={certificateRef}>
              <div className="border-8 border-double border-indigo-100 p-6 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-50 bg-opacity-50 z-0"></div>
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <img
                      className="h-16 w-auto mx-auto mb-4"
                      src={logoImage}
                      alt="Course Logo"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://via.placeholder.com/150";
                      }}
                    />
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                      Certificate of Completion
                    </h1>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
                  </div>

                  <div className="text-center mb-8">
                    <p className="text-lg text-gray-600">
                      This is to certify that
                    </p>
                    <h2 className="text-3xl font-bold text-indigo-800 my-4 font-serif italic">
                      {certificateData.learner.firstName}
                      {certificateData.learner.lastName || ""}
                    </h2>
                    <p className="text-lg text-gray-600">
                      has successfully completed the course
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800 my-4">
                      {certificateData.course.title}
                    </h3>
                    <p className="text-lg text-gray-600">
                      on {numberToDateString(certificateData.issueDate)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-12">
                    <div className="text-center">
                      <div className="h-px w-40 bg-gray-400 mx-auto mb-2"></div>
                      <p className="text-gray-800 font-medium">
                        {certificateData.mentor.firstName}
                        {certificateData.mentor.lastName}
                      </p>
                      <p className="text-sm text-gray-600">Instructor</p>
                    </div>

                    <div className="text-center">
                      <div className="h-px w-40 bg-gray-400 mx-auto mb-2"></div>
                      <p className="text-gray-800 font-medium">
                        Certificate ID
                      </p>
                      <p className="text-sm text-gray-600">{`CERT-${Math.random()
                        .toString(36)
                        .substring(2, 10)
                        .toUpperCase()}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={downloadCertificate}
              className="flex items-center justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Certificate
            </button>

            <button
              onClick={() => setIsGenerated(false)}
              className="flex items-center justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
