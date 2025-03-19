// src/components/UI/FileUpload.tsx - Reusable FileUpload component
import React, { useState, useRef } from "react";
import { CloudUploadIcon } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  onFileUpload: (
    fileKey: string,
    filePreview: string,
    fileName: string
  ) => void;
  maxSizeMB?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = "*/*",
  onFileUpload,
  maxSizeMB = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setErrorMessage(null);

    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMessage(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    // Check file type
    if (!file.type.match(accept.replace(/\*/g, ".*"))) {
      setErrorMessage(`File type not accepted. Please upload ${accept}`);
      return;
    }

    try {
      setIsUploading(true);

      // In a real app, you'd upload the file to your server or cloud storage here
      // For this example, we'll simulate an upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a file preview URL
      const filePreview = URL.createObjectURL(file);

      // Generate a mock file key (in a real app, this would come from your server)
      const fileKey = `upload_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

      onFileUpload(fileKey, filePreview, file.name);
    } catch (error) {
      console.error("File upload error:", error);
      setErrorMessage("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        } ${isUploading ? "opacity-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CloudUploadIcon className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-1 text-sm text-gray-500">
          {isUploading ? (
            "Uploading..."
          ) : (
            <>
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Click to upload
              </span>{" "}
              or drag and drop
            </>
          )}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {accept.replace(/\*/g, "")} (Max {maxSizeMB}MB)
        </p>
      </div>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileInput}
        disabled={isUploading}
      />
    </div>
  );
};
