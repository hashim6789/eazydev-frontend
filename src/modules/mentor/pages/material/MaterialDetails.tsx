import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../../hooks/useFetch";
import { AppDispatch, RootState } from "../../../../store";
import { Material } from "../../../../types/material";
import { useThemeStyles } from "../../../../utils/color-theme.util";
import { ArrowLeft } from "lucide-react";
import { setMaterial } from "../../../../store/slice/materialSlice";
import { DetailsHeader } from "../../components/MaterialsDetailsHeader";
import { MaterialDetailsContent } from "../../components/MaterialDetailContent";

const MaterialDetails: React.FC = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const { data } = useFetch<Material>(`/api/materials/${materialId}`);
  const dispatch = useDispatch<AppDispatch>();
  const { material, error, loading } = useSelector(
    (state: RootState) => state.material
  );

  const theme = useThemeStyles();

  useEffect(() => {
    if (data) {
      dispatch(setMaterial(data));
    }
  }, [data, dispatch]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${theme.cardBg}`}
      >
        <div
          className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme.primary}`}
        ></div>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${theme.cardBg}`}
      >
        <div className={`text-red-600 text-center ${theme.textPrimary}`}>
          <p className="text-xl font-semibold mb-2">Error loading material</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.lightBg} py-8 px-4 sm:px-6 lg:px-8`}>
      <button
        onClick={() => window.history.back()}
        className={`flex items-center ${theme.text} ${theme.hover} mb-6`}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Materials
      </button>
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-lg shadow-md overflow-hidden ${theme.cardBg}`}>
          <DetailsHeader material={material} />
          <div className="p-6">
            <MaterialDetailsContent material={material} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetails;
