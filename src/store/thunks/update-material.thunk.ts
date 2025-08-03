import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../configs";
import { Material } from "../../types/material";
import { getAxiosErrorMessage } from "../../utils";

type newMaterial = Partial<Material>;

// Create an async thunk for the login API request
export const updateMaterial = createAsyncThunk(
  "material/update",
  async ({ data }: { data: newMaterial }, thunkAPI) => {
    try {
      const response = await api.put(`/api/materials/${data.id}`, data);
      return response.data;
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
