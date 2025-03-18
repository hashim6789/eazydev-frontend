import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "../../../../store";
import { Material } from "../../../../types/material";
import { useThemeStyles } from "../../../../utils/color-theme.util";
import { showErrorToast, showSuccessToast } from "../../../../utils";
import { ArrowLeft } from "lucide-react";
import {
  editMaterial,
  resetForm,
  setMaterial,
} from "../../../../store/slice/materialSlice";
import { updateMaterial } from "../../../../store/thunks/update-material.thunk";
import { DetailsHeader } from "../../components/MaterialsDetailsHeader";
import { MaterialDetailsContent } from "../../components/MaterialDetailContent";
import { MaterialActions } from "../../components/MaterialActions";
import MaterialForm from "../../components/MaterialForm";

const MaterialDetails: React.FC = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const { data } = useFetch<Material>(`/api/materials/${materialId}`);
  const dispatch = useDispatch<AppDispatch>();
  const { material, error, loading } = useSelector(
    (state: RootState) => state.material
  );
  const [isEditing, setIsEditing] = useState(false);

  const { setValue } = useForm<Material>();
  const theme = useThemeStyles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<Material>({
    defaultValues: material || {},
  });

  const selectedType = watch("type");

  const [uploading, setUploading] = useState<boolean>(false);
  const fileKey = material ? material.fileKey : null;
  const [preview, setPreview] = useState<string | null>(fileKey); // Store the preview URL

  // Function to handle file upload (you can customize this)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setMaterial(data));
    }
  }, [data, dispatch]);

  const handleChange = (field: keyof Material, value: any) => {
    if (field === "duration") value = Number(value);
    dispatch(editMaterial({ [field]: value }));
    setValue(field, value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    dispatch(resetForm());
  };

  const onSubmit = async () => {
    setIsEditing(false);
    try {
      if (!material) return null;
      const resultAction = await dispatch(
        updateMaterial({
          data: material,
        })
      );
      if (updateMaterial.fulfilled.match(resultAction)) {
        showSuccessToast("The course updated successfully.");
      } else {
        showErrorToast("The course update failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

          {isEditing && (
            <MaterialForm
              onSubmit={onSubmit}
              register={register}
              handleSubmit={handleSubmit}
              setValue={setValue}
              handleFileUpload={handleFileUpload}
              watch={watch}
              errors={errors}
              uploading={uploading}
              preview={preview}
              selectedType={selectedType}
              mode="edit"
              defaultValues={material}
            />
          )}

          <MaterialActions
            isEditing={isEditing}
            handleEditClick={handleEditClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MaterialDetails;
