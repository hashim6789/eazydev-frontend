import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../configs";
import { Material } from "../../types/material";

type newMaterial = Partial<Material>;

// Create an async thunk for the login API request
export const updateMaterial = createAsyncThunk(
  "material/update",
  async ({ data }: { data: newMaterial }, thunkAPI) => {
    try {
      const response = await api.put(`/api/materials/${data.id}`, data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
