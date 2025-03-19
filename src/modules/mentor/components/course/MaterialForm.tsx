import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IMaterial } from "../../../../types";
import Input from "./Input";
import { RadioGroup } from "./RadioGroup";
import { FileUpload } from "./FileUpload";
import { Textarea } from "./TextArea";
import { api } from "../../../../configs";
import { showErrorToast } from "../../../../utils";
import { getUserProperty } from "../../../../utils/local-user.util";

interface MaterialFormProps {
  initialData?: IMaterial;
  onSubmit: (material: IMaterial) => void;
  onCancel: () => void;
}

export const MaterialForm: React.FC<MaterialFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const defaultValues: Partial<IMaterial> = initialData || {
    title: "",
    description: "",
    mentorId: getUserProperty("id") as string,
    type: "reading",
    duration: 10,
    fileKey: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IMaterial>({ defaultValues });

  const materialType = watch("type");
  const [fileKey, setFileKey] = useState<string>(defaultValues.fileKey || "");
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setUploading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (
      (materialType === "reading" && file.type !== "application/pdf") ||
      (materialType === "video" && file.type !== "video/mp4")
    ) {
      showErrorToast("Invalid file type!");
      return;
    }

    setUploading(true);
    try {
      // Request signed URL from backend
      const response = await api.post<{ signedUrl: string; fileKey: string }>(
        `/api/upload/signed-url`,
        {
          fileName: file.name,
          fileType: file.type,
          materialType,
        }
      );

      const { signedUrl, fileKey } = response.data;

      // Upload file to S3
      await axios.put(signedUrl, file);
      showErrorToast(`The ${materialType} was uploaded successfully.`);

      // Store file key in form and update preview
      setValue("fileKey", fileKey); // Update fileKey in form state
      setFileKey(fileKey);
      setFileName(file.name);

      if (materialType === "reading" || materialType === "video") {
        setPreview(URL.createObjectURL(file)); // Set preview
      }
    } catch (error) {
      console.error("File upload failed:", error);
      showErrorToast("Failed to upload the file.");
    } finally {
      setUploading(false);
    }
  };

  const handleMaterialSubmit = async (data: IMaterial) => {
    onSubmit({ ...data, fileKey });
  };

  return (
    <div className="space-y-4">
      {/* Material Title */}
      <Input
        label="Material Title"
        name="title"
        register={register}
        rules={{ required: "Title is required" }}
        error={errors.title}
        placeholder="e.g., Introduction Video"
      />

      {/* Material Description */}
      <Textarea
        label="Material Description"
        name="description"
        register={register}
        rules={{ required: "Description is required" }}
        error={errors.description}
        placeholder="Brief description of this material..."
        rows={2}
      />

      {/* Material Type */}
      <RadioGroup
        label="Material Type"
        name="type"
        register={register}
        rules={{ required: "Type is required" }}
        error={errors.type}
        options={[
          { value: "reading", label: "Reading (PDF, Document)" },
          { value: "video", label: "Video" },
        ]}
      />

      {/* Duration */}
      <Input
        label="Duration (minutes)"
        name="duration"
        register={register}
        rules={{
          required: "Duration is required",
          min: { value: 1, message: "Duration must be at least 1 minute" },
        }}
        error={errors.duration}
        type="number"
      />

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
          type="button"
          onClick={handleSubmit(handleMaterialSubmit)}
          className="px-3 py-1.5 bg-blue-600 rounded-md text-white hover:bg-blue-700 text-sm"
        >
          {initialData ? "Update Material" : "Add Material"}
        </button>
      </div>
    </div>
  );
};
