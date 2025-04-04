// import { useCreateMaterial } from "../../../hooks/useCreateMaterial";

// const CreateMaterialForm = () => {
//   const {
//     register,
//     handleSubmit,
//     onSubmit,
//     handleFileUpload,
//     errors,
//     uploading,
//     preview,
//     selectedType,
//   } = useCreateMaterial();

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Material Type */}
//       <div>
//         <label>Type</label>
//         <select {...register("type")}>
//           <option value="reading">Reading</option>
//           <option value="video">Video</option>
//         </select>
//       </div>

//       {/* Title */}
//       <div>
//         <label>Title</label>
//         <input {...register("title")} />
//         {errors.title && <span>{errors.title.message}</span>}
//       </div>

//       {/* Description */}
//       <div>
//         <label>Description</label>
//         <textarea {...register("description")} />
//         {errors.description && <span>{errors.description.message}</span>}
//       </div>

//       {/* Duration */}
//       <div>
//         <label>Duration (minutes)</label>
//         <input type="number" {...register("duration")} />
//         {errors.duration && <span>{errors.duration.message}</span>}
//       </div>

//       {/* File Upload */}
//       <div>
//         <label>Upload File</label>
//         <input type="file" onChange={handleFileUpload} />
//         {uploading && <p>Uploading...</p>}
//         {preview && selectedType === "reading" && <embed src={preview} />}
//         {preview && selectedType === "video" && (
//           <video src={preview} controls />
//         )}
//       </div>

//       {/* Submit */}
//       <button type="submit" disabled={uploading}>
//         Submit
//       </button>
//     </form>
//   );
// };

// export default CreateMaterialForm;
