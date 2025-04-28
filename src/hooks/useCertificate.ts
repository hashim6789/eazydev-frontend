import { useState, useEffect } from "react";
import { CertificateData, PaginatedData } from "../types";
import { api } from "../configs";

interface UseCertificatesResult {
  certificates: CertificateData[];
  loading: boolean;
  error: boolean;
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

export function useCertificates(limit = 5): UseCertificatesResult {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    async function fetchCertificates() {
      setLoading(true);
      setError(false);
      try {
        const response = await api.get<PaginatedData<CertificateData>>(
          "/certificates",
          {
            params: { page, limit },
          }
        );

        setCertificates(response.data.body); // backend must return { items: [], totalItems: number }
        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCertificates();
  }, [page, limit]);

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    certificates,
    loading,
    error,
    page,
    totalPages,
    nextPage,
    prevPage,
    setPage,
  };
}
