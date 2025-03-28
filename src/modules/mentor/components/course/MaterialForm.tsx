import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Material } from "../../../../types";
import { api } from "../../../../configs";
import { showErrorToast, showSuccessToast } from "../../../../utils";
import { MaterialFormSchema, MaterialSchema } from "../../../../schemas";

interface MaterialFormProps {
  initialData?: Material;
  onSubmit: (material: Material) => void;
  onCancel: () => void;
}

export const MaterialForm: React.FC<MaterialFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const defaultValues: MaterialFormSchema = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    type: initialData?.type || "reading",
    duration: initialData?.duration || 10,
    fileKey: initialData?.fileKey || "",
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MaterialFormSchema>({
    resolver: zodResolver(MaterialSchema),
    defaultValues,
  });

  const materialType = watch("type");
  const [fileName, setFileName] = useState<string>(defaultValues.fileKey || "");
  const [isUploading, setUploading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      (materialType === "reading" && file.type !== "application/pdf") ||
      (materialType === "video" && file.type !== "video/mp4")
    ) {
      showErrorToast("Invalid file type!");
      return;
    }

    setUploading(true);
    try {
      const response = await api.post<{ signedUrl: string; fileKey: string }>(
        "/api/upload/signed-url",
        {
          fileName: file.name,
          fileType: file.type,
          materialType,
        }
      );

      const { signedUrl, fileKey } = response.data;
      await axios.put(signedUrl, file);
      showSuccessToast(`The ${materialType} was uploaded successfully.`);

      setValue("fileKey", fileKey);
      setFileName(file.name);

      if (materialType === "reading" || materialType === "video") {
        setPreview(URL.createObjectURL(file));
      }
    } catch (error: any) {
      console.error("File upload failed:", error);
      showErrorToast(error.response.data.error || "Failed to upload the file.");
    } finally {
      setUploading(false);
    }
  };

  const handleMaterialSubmit: SubmitHandler<MaterialFormSchema> = (data) => {
    const materialId = initialData ? initialData.id : "";
    onSubmit({ ...data, fileKey: data.fileKey || "", id: materialId });
  };

  return (
    // <form onSubmit={handleSubmit(handleMaterialSubmit)} className="space-y-6">
    <div>
      {/* Material Title */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Material Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className={`block w-full px-3 py-2 border rounded-md ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Introduction Video"
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Material Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Material Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className={`block w-full px-3 py-2 border rounded-md ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Brief description of this material..."
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Material Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Material Type
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="reading"
              {...register("type")}
              className="mr-2"
            />
            Reading (PDF, Document)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="video"
              {...register("type")}
              className="mr-2"
            />
            Video
          </label>
        </div>
        {errors.type && (
          <p className="text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700"
        >
          Duration (minutes)
        </label>
        <input
          type="number"
          {...register("duration", { valueAsNumber: true })} // Ensure the value is parsed as a number
          className={`block w-full px-3 py-2 border rounded-md ${
            errors.duration ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter duration in minutes"
        />
        {errors.duration && (
          <p className="text-sm text-red-600">{errors.duration.message}</p>
        )}
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {materialType === "video" ? "Upload Video" : "Upload Document"}
        </label>
        <input
          type="file"
          accept={
            materialType === "video"
              ? "video/*"
              : "application/pdf,.doc,.docx,.txt"
          }
          onChange={handleFileUpload}
          disabled={isUploading}
          className="block"
        />
        {isUploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {fileName && (
          <p className="text-sm text-gray-600">Selected file: {fileName}</p>
        )}
        {preview && materialType === "reading" && (
          <iframe
            src={preview}
            title="PDF Preview"
            className="w-full h-40 border rounded"
          />
        )}
        {preview && materialType === "video" && (
          <video
            src={preview}
            controls
            className="w-full h-40 border rounded"
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit(handleMaterialSubmit)}
          className="px-3 py-1.5 bg-blue-600 rounded-md text-white hover:bg-blue-700 text-sm"
        >
          {initialData ? "Update Material" : "Add Material"}
        </button>
      </div>
    </div>
    // </form>
  );
};
