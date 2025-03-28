import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "../../../../types";
import { useMentorCourseManagement } from "../../../../hooks/userMentorCourseManagement";
import {
  CourseDetailsFormSchema,
  CourseDetailsSchema,
} from "../../../../schemas";

export const CourseDetails: React.FC = () => {
  const {
    categories,
    course,
    setStep,
    handleThumbnailUpload,
    handleCourseSubmit,
  } = useMentorCourseManagement();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    course.category
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CourseDetailsFormSchema>({
    resolver: zodResolver(CourseDetailsSchema),
    defaultValues: {
      title: course.title, // Default value for 'title'
      price: course.price, // Default value for 'price'
      category: course.category, // Default value for 'category'
      description: course.description, // Default value for 'description'
      thumbnail: course.thumbnail, // Default value for 'thumbnail' URL
    },
  });
  //     // Watch the category field to sync form values dynamically
  // const watchCategory = watch("category");

  const handleCategoryChange = (id: string) => {
    const category = categories.find((cat) => cat.id === id); // Find category by ID
    if (category) {
      setSelectedCategory(category); // Update selectedCategory state
      console.log("Selected category:", category);
      setValue("category", category); // Update form state with full category object
    }
  };
  const onSubmit: SubmitHandler<CourseDetailsFormSchema> = (data) => {
    handleCourseSubmit({
      ...data,
      category: data.category || undefined, // Ensure valid category data
    });
  };

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const filePreview = URL.createObjectURL(file);
      const secureUrl = await handleThumbnailUpload(
        file.name,
        filePreview,
        file.name
      );
      if (secureUrl) {
        setValue("thumbnail", secureUrl); // Set the thumbnail value in the form
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold">
        {course.id ? "Edit Course" : "Create Course"}
      </h2>

      {/* Course Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Title
        </label>
        <input
          type="text"
          placeholder="e.g., Complete React Developer Course"
          className={`w-full px-4 py-3 border rounded-md focus:outline-none ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price ($)
        </label>
        <input
          type="number"
          placeholder="e.g., 49.99"
          className={`w-full px-4 py-3 border rounded-md focus:outline-none ${
            errors.price ? "border-red-500" : "border-gray-300"
          }`}
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      {/* Category Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
          value={selectedCategory?.id || ""}
          onChange={(e) => {
            handleCategoryChange(e.target.value); // Pass the selected value (ID) to the handler
          }}
        >
          <option value="" disabled>
            {selectedCategory
              ? `Selected: ${selectedCategory.title}`
              : "Select a category"}
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Course Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Description
        </label>
        <textarea
          placeholder="Describe what students will learn in this course..."
          rows={4}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Course Thumbnail Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Thumbnail
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none"
        />
        {errors.thumbnail && (
          <p className="mt-1 text-sm text-red-600">
            {errors.thumbnail.message}
          </p>
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

      {/* Submit Button */}
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
        >
          {course.id ? "Update Course" : "Create Course"}
        </button>
      </div>
      {course.id && (
        <div className="pt-4 flex justify-start">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="px-6 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
          >
            Go to Lessons
          </button>
        </div>
      )}
    </form>
  );
};
