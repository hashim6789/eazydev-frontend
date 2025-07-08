import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../configs";
import { Material } from "../../types/material";
import { getAxiosErrorMessage } from "../../utils";
import { ResponseErrorMessages } from "../../constants";

type newMaterial = Partial<Material>;

// Create an async thunk for the login API request
export const updateMaterial = createAsyncThunk(
  "material/update",
  async ({ data }: { data: newMaterial }, thunkAPI) => {
    try {
      const response = await api.put(`/api/materials/${data.id}`, data);
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(
        getAxiosErrorMessage(error, ResponseErrorMessages.ERROR.WENT_WRONG)
      );
    }
  }
);
