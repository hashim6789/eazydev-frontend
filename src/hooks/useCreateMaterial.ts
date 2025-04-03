import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../configs";
import { showErrorToast, showSuccessToast } from "../utils";
import {
  CreateMaterialFormData,
  materialSchema,
} from "../schemas/material.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserProperty } from "../utils/local-user.util";
import { ValidationMessages } from "../constants";
import { MaterialMessages } from "../constants/material.constant";

export const useCreateMaterial = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateMaterialFormData>({
    defaultValues: {
      fileKey: "",
      duration: 2,
      type: "video",
      title: "",
      description: "",
      mentorId: getUserProperty("id") as string,
    },
    resolver: zodResolver(materialSchema),
  });

  const [uploading, setUploading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const selectedType = watch("type");

  // Handle file upload logic
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (
      (selectedType === "reading" && file.type !== "application/pdf") ||
      (selectedType === "video" && file.type !== "video/mp4")
    ) {
      showErrorToast(ValidationMessages.INVALID_MATERIAL_FILE);
      return;
    }

    setUploading(true);
    try {
      // Request a signed URL from the backend
      const response = await api.post(`/upload/signed-url`, {
        fileName: file.name,
        fileType: file.type,
        materialType: selectedType,
      });

      const { signedUrl, fileKey } = response.data;

      // Upload file to S3
      await axios.put(signedUrl, file);
      if (selectedType === "reading") {
        showSuccessToast(MaterialMessages.READING_UPLOAD_SUCCESS);
      } else {
        showSuccessToast(MaterialMessages.VIDEO_UPLOAD_SUCCESS);
      }

      // Store file key in form
      setValue("fileKey", fileKey);
      // setValue("fileKey", "lecture_02.mp4");

      // Generate a local preview of the file
      setPreview(URL.createObjectURL(file));
    } catch (error) {
      console.error(MaterialMessages.FILE_UPLOAD_FAILED, error);
      showErrorToast(MaterialMessages.FILE_UPLOAD_FAILED);
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission logic
  const onSubmit = async (formData: CreateMaterialFormData) => {
    try {
      const response = await api.post(`/materials`, formData);
      if (response.status === 201) {
        const materialId = response.data.materialId;
        showSuccessToast(MaterialMessages.MATERIAL_CREATED_SUCCESS);
        reset();
        setPreview(null); // Clear the preview
        navigate(`/mentor/materials/${materialId}`); // Redirect to the materials page
      }
    } catch (error: any) {
      console.error(MaterialMessages.ERROR_OCCURRED, error);
      showErrorToast(
        error.response?.data?.message || MaterialMessages.ERROR_OCCURRED
      );
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    handleFileUpload,
    watch,
    setValue,
    errors,
    uploading,
    preview,
    selectedType,
  };
};
