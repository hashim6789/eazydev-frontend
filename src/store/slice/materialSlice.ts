import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateMaterial } from "../thunks/update-material.thunk";
import { MaterialState } from "../interfaces/MaterialState";
import { Material } from "../../types/material";

const initialState: MaterialState = {
  material: null,
  prevMaterial: null,
  error: null,
  loading: false,
};

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    setMaterial(state, action: PayloadAction<Material>) {
      state.material = action.payload;
      state.prevMaterial = action.payload;
    },
    editMaterial(state, action: PayloadAction<Partial<Material>>) {
      if (state.material) {
        state.material = { ...state.material, ...action.payload };
      }
    },
    resetForm(state) {
      state.material = state.prevMaterial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateMaterial.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        updateMaterial.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log(action.payload.data.course);
          // const { data } = action.payload;
          state.material = action.payload.data.material;
          state.prevMaterial = state.material;
          state.error = null;
          state.loading = false;
        }
      )
      .addCase(updateMaterial.rejected, (state, action: PayloadAction<any>) => {
        const { message } = action.payload;
        state.error = message;
        state.loading = false;
        state.material = state.prevMaterial;
      });
  },
});

export const { setMaterial, editMaterial, resetForm } = materialSlice.actions;
export const materialReducers = materialSlice.reducer;
