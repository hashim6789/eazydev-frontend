import { Material } from "../../types/material";

export interface MaterialState {
  material: Material | null;
  prevMaterial: Material | null;
  error: string | null;
  loading: boolean;
}
