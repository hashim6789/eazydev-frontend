import { api } from "../configs";
import { Material } from "../types/material";

export const addMaterialService = async (material: Material) => {
  return api.post<string>("/materials", material);
};

export const updateMaterialService = async (material: Material) => {
  return api.put<string>(`/materials/${material.id}`, material);
};

export const removeMaterialService = async (materialId: string) => {
  return api.delete(`/materials/${materialId}`);
};
