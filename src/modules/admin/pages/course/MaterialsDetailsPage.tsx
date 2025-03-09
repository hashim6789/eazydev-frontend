// //imported custom hooks
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import useFetch from "../../../../hooks/useFetch";
// import { useForm } from "react-hook-form";

// //import redux utilities
// import { AppDispatch, RootState } from "../../../../store";
// import {
//   editMaterial,
//   resetForm,
//   setMaterial,
// } from "../../../../store/slices/materialSlice";
// import { updateMaterial } from "../../../../store/thunks/material/updateMaterial";

// //imported sub components
// import MaterialDetailsHeader from "../../components/course/MaterialDetailsHeader";
// import MaterialDetailsContent from "../../components/course/MaterilsDetailsContent";

// //imported other utilities
// import { showToast } from "../../../../shared/utils/toastUtils";
// import { IMaterial } from "../../../../shared/types/Material";
// import { ArrowLeft } from "lucide-react";

// const MaterialDetailPage: React.FC = () => {
//   const { materialId } = useParams<{ materialId: string }>();
//   const { data } = useFetch<IMaterial>(`/api/materials/${materialId}`);
//   const dispatch = useDispatch<AppDispatch>();
//   const { material, error, loading } = useSelector(
//     (state: RootState) => state.material
//   );
//   const [isEditing, setIsEditing] = useState(false);

//   const { setValue } = useForm<IMaterial>();

//   useEffect(() => {
//     if (data) {
//       dispatch(setMaterial(data));
//     }
//   }, [data, dispatch]);

//   const handleChange = (field: keyof IMaterial, value: any) => {
//     if (field === "duration") value = Number(value);
//     dispatch(editMaterial({ [field]: value }));
//     setValue(field, value);
//   };

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//     console.log("reset");
//     dispatch(resetForm());
//   };

//   const onSubmit = async () => {
//     setIsEditing(false);
//     try {
//       if (!material) return null;
//       const resultAction = await dispatch(
//         updateMaterial({
//           data: material,
//           user: "mentor",
//         })
//       );
//       if (updateMaterial.fulfilled.match(resultAction)) {
//         showToast.success("The course updated successfully.");
//       } else {
//         showToast.error("The course updated Failed!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
//       </div>
//     );
//   }

//   if (error || !material) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-600 text-center">
//           <p className="text-xl font-semibold mb-2">Error loading material</p>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <button
//         onClick={() => window.history.back()}
//         className="flex items-center text-red-600 hover:text-red-700 mb-6"
//       >
//         <ArrowLeft className="w-5 h-5 mr-2" />
//         Back to Materials
//       </button>
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <MaterialDetailsHeader material={material} />
//           <div className="p-6">
//             <MaterialDetailsContent material={material} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MaterialDetailPage;
