import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ILesson, IMaterial } from "../../../../types";
import Input from "./Input";
import { Textarea } from "./TextArea";
import { MaterialForm } from "./MaterialForm";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { api } from "../../../../configs";
import { showErrorToast, showSuccessToast } from "../../../../utils";
import { getUserProperty } from "../../../../utils/local-user.util";

interface LessonFormProps {
  initialData?: ILesson;
  onSubmit: (lesson: ILesson) => void;
  onCancel: () => void;
}

export const LessonForm: React.FC<LessonFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  // Default lesson data
  const defaultValues: ILesson = initialData || {
    title: "",
    description: "",
    mentorId: getUserProperty("id") as string,
    materials: [],
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILesson>({
    defaultValues,
  });

  // State for managing materials
  const [materials, setMaterials] = useState<IMaterial[]>(
    defaultValues.materials || []
  );
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [editingMaterialIndex, setEditingMaterialIndex] = useState<
    number | null
  >(null);

  // Add a new material
  const handleAddMaterial = async (material: IMaterial) => {
    try {
      const response = await api.post<{ material: IMaterial }>(
        `/api/materials`,
        material
      );
      if (response && response.status === 201) {
        setMaterials((prev) => [...prev, response.data.material]);
        setIsAddingMaterial(false);
        showSuccessToast("material successfully created");
      }
    } catch (error: any) {
      showErrorToast("Failed to add material the file.");
    }
  };

  // Update an existing material
  const handleUpdateMaterial = (material: IMaterial) => {
    if (editingMaterialIndex !== null) {
      setMaterials((prev) => {
        const updated = [...prev];
        updated[editingMaterialIndex] = material;
        return updated;
      });
      setEditingMaterialIndex(null);
    }
  };

  // Remove a material
  const handleRemoveMaterial = (index: number) => {
    setMaterials((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  // Edit a material
  const handleEditMaterial = (index: number) => {
    setEditingMaterialIndex(index);
    setIsAddingMaterial(false);
  };

  // Submit the lesson form
  const handleLessonSubmit = (data: ILesson) => {
    onSubmit({ ...data, materials });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(handleLessonSubmit)} className="space-y-6">
        {/* Lesson Details */}
        <Input
          label="Lesson Title"
          name="title"
          register={register}
          rules={{ required: "Title is required" }}
          error={errors.title}
          placeholder="e.g., Introduction to React Hooks"
        />

        <Textarea
          label="Lesson Description"
          name="description"
          register={register}
          rules={{ required: "Description is required" }}
          error={errors.description}
          placeholder="Briefly describe what this lesson covers..."
          rows={3}
        />

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
    </div>
  );
};
