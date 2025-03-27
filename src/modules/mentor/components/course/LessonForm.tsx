import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Lesson, IMaterial, Material } from "../../../../types";
import { LessonFormSchema, LessonSchema } from "../../../../schemas";
import { MaterialForm } from "./MaterialForm";
import { api } from "../../../../configs";
import { showErrorToast, showSuccessToast } from "../../../../utils";

interface LessonFormProps {
  initialData?: Lesson;
  onSubmit: (lesson: Lesson) => void;
  onCancel: () => void;
}

export const LessonForm: React.FC<LessonFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonFormSchema>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
  });

  const [materials, setMaterials] = useState<Material[]>(
    initialData?.materials || []
  );
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [editingMaterialIndex, setEditingMaterialIndex] = useState<
    number | null
  >(null);

  const handleLessonSubmit: SubmitHandler<LessonFormSchema> = (data) => {
    onSubmit({
      ...data,
      materials,
      id: initialData?.id || "",
    });
  };

  const handleAddMaterial = async (material: Material) => {
    try {
      const response = await api.post<string>("/api/materials", material);
      if (response.status === 201 && response.data)
        setMaterials((prevMaterials) => [
          ...prevMaterials,
          { ...material, id: response.data },
        ]);
      showSuccessToast("material created successfully");
      setIsAddingMaterial(false);
    } catch (error: any) {
      showErrorToast(error.response.data.error || "Failed to create material");
    }
  };

  const handleUpdateMaterial = (material: Material) => {
    if (editingMaterialIndex !== null) {
      setMaterials((prevMaterials) => {
        const updatedMaterials = [...prevMaterials];
        updatedMaterials[editingMaterialIndex] = material;
        return updatedMaterials;
      });
      setEditingMaterialIndex(null);
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setMaterials((prevMaterials) => {
      const updatedMaterials = [...prevMaterials];
      updatedMaterials.splice(index, 1);
      return updatedMaterials;
    });
  };

  const handleEditMaterial = (index: number) => {
    setEditingMaterialIndex(index);
    setIsAddingMaterial(false);
  };

  return (
    <form onSubmit={handleSubmit(handleLessonSubmit)} className="space-y-6">
      {/* Lesson Title */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Lesson Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className={`block w-full px-3 py-2 border rounded-md ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Introduction to React Hooks"
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Lesson Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Lesson Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className={`block w-full px-3 py-2 border rounded-md ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Briefly describe what this lesson covers..."
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Materials List */}
      {materials.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Materials</h4>
          <div className="border rounded-lg divide-y">
            {materials.map((material, index) => (
              <div
                key={index}
                className="p-3 flex items-center justify-between"
              >
                <div>
                  <h5 className="font-medium">{material.title}</h5>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="capitalize">{material.type}</span>
                    <span className="mx-1">•</span>
                    <span>{material.duration} min</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEditMaterial(index)}
                    className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveMaterial(index)}
                    className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Material Form */}
      {isAddingMaterial && (
        <div className="border rounded-lg p-3 bg-gray-50">
          <h4 className="font-medium mb-3">Add Material</h4>
          <MaterialForm
            onSubmit={handleAddMaterial}
            onCancel={() => setIsAddingMaterial(false)}
          />
        </div>
      )}

      {/* Edit Material Form */}
      {editingMaterialIndex !== null && (
        <div className="border rounded-lg p-3 bg-gray-50">
          <h4 className="font-medium mb-3">Edit Material</h4>
          <MaterialForm
            initialData={materials[editingMaterialIndex]}
            onSubmit={handleUpdateMaterial}
            onCancel={() => setEditingMaterialIndex(null)}
          />
        </div>
      )}

      {/* Add Material Button */}
      {!isAddingMaterial && editingMaterialIndex === null && (
        <button
          type="button"
          onClick={() => setIsAddingMaterial(true)}
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Material
        </button>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
        >
          {initialData ? "Update Lesson" : "Add Lesson"}
        </button>
      </div>
    </form>
  );
};
