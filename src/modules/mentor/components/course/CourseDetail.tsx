// src/components/CourseCreation/CourseDetails.tsx - Course Details Form
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Category, ICourse } from "../../../../types";
import Input from "./Input";
import { Select } from "./Select";
import { Textarea } from "./TextArea";
import { FileUpload } from "./FileUpload";
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import { config } from "../../../../configs";
import { showErrorToast, showSuccessToast } from "../../../../utils";
import { setThumbnail } from "../../../../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";

interface CourseDetailsProps {
  onSubmit: (data: Partial<ICourse>) => void;
  initialData: Partial<ICourse>;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ICourse>();
  const { course } = useSelector((state: RootState) => state.course);
  const dispatch = useDispatch<AppDispatch>();

  const { data: categories } = useFetch<Category[]>("/api/categories");

  // const handleThumbnailUpload = (fileKey: string, previewUrl: string) => {
  //   setThumbnailPreview(previewUrl);
  // };

  const handleThumbnailUpload = async (
    fileKey: string,
    filePreview: string,
    fileName: string
  ) => {
    try {
      // Simulating the Cloudinary upload using the file preview
      const formData = new FormData();
      const fileBlob = await fetch(filePreview).then((r) => r.blob());
      formData.append("file", fileBlob, fileName);
      formData.append("upload_preset", config.CLOUDINARY_PRESET);
      console.log(
        fileName,
        config.CLOUDINARY_PRESET,
        config.CLOUDINARY_CLOUD_NAME
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${config.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      if (response.status === 200) {
        const secureUrl = response.data.secure_url;
        dispatch(setThumbnail({ thumbnail: secureUrl }));
        showSuccessToast("Thumbnail uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      showErrorToast("Failed to upload image.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold">Course Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Course Title"
          name="title"
          register={register}
          rules={{ required: "Title is required" }}
          error={errors.title}
          placeholder="e.g., Complete React Developer Course"
        />

        <Input
          label="Price ($)"
          name="price"
          register={register}
          rules={{
            required: "Price is required",
            min: { value: 0, message: "Price must be positive" },
          }}
          error={errors.price}
          type="number"
          placeholder="e.g., 49.99"
        />
      </div>

      <Select
        label="Category"
        name="categoryId"
        register={register}
        rules={{ required: "Category is required" }}
        error={errors.categoryId}
        options={
          categories
            ? categories.map((cat) => ({ value: cat.id, label: cat.title }))
            : []
        }
        placeholder="Select a category"
      />

      <Textarea
        label="Course Description"
        name="description"
        register={register}
        rules={{ required: "Description is required" }}
        error={errors.description}
        placeholder="Describe what students will learn in this course..."
        rows={4}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Course Thumbnail
        </label>
        {!course.thumbnail && (
          <FileUpload
            accept="image/*"
            onFileUpload={(fileKey, filePreview, fileName) =>
              handleThumbnailUpload(fileKey, filePreview, fileName)
            }
            maxSizeMB={2}
          />
        )}

        {course.thumbnail && (
          <div className="mt-2">
            <img
              src={course.thumbnail}
              alt="Thumbnail preview"
              className="w-64 h-36 object-cover rounded border"
            />
          </div>
        )}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
        >
          Continue to Lessons
        </button>
      </div>
    </form>
  );
};
