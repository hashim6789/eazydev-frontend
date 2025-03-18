// import React from "react";
// import { ArrowLeft, Book, Video } from "lucide-react";

// import { useCreateMaterial } from "../../../../hooks/useCreateMaterial";
// import { useThemeStyles } from "../../../../utils/color-theme.util";

// const MaterialCreation: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     onSubmit,
//     setValue,
//     handleFileUpload,
//     watch,
//     errors,
//     uploading,
//     preview,
//     selectedType,
//   } = useCreateMaterial();

//   const styles = useThemeStyles();

//   return (
//     <div className={`${styles.darkBg} min-h-screen p-6`}>
//       <button
//         onClick={() => window.history.back()}
//         className={`flex items-center ${styles.textPrimary} hover:${styles.textSecondary} mb-6`}
//       >
//         <ArrowLeft className="w-5 h-5 mr-2" />
//         Back to Materials
//       </button>
//       <div className="">
//         <h1 className={`text-2xl font-bold ${styles.textPrimary} mb-2`}>
//           Create New Material
//         </h1>
//         <p className={`${styles.textSecondary} mb-8`}>
//           Add new learning contents for your students
//         </p>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className={`${styles.cardBg} rounded-lg shadow-md p-6`}>
//             <div className="space-y-4 mb-6">
//               <div>
//                 <label
//                   className={`block text-sm font-medium ${styles.textPrimary} mb-1`}
//                 >
//                   Material Type
//                 </label>
//                 <div className="grid grid-cols-2 gap-4">
//                   {["reading", "video"].map((type) => (
//                     <label
//                       key={type}
//                       className={`
//                         flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer
//                         ${
//                           watch("type") === type
//                             ? `${styles.activeBorder} ${styles.lightBg}`
//                             : `${styles.border} hover:${styles.activeBorder}`
//                         }
//                       `}
//                     >
//                       <input
//                         type="radio"
//                         value={type}
//                         {...register("type")}
//                         className="sr-only"
//                         disabled={!!preview}
//                       />
//                       {type === "reading" && (
//                         <Book className={`w-5 h-5 mr-2 ${styles.text}`} />
//                       )}
//                       {type === "video" && (
//                         <Video className={`w-5 h-5 mr-2 ${styles.text}`} />
//                       )}
//                       <span className="capitalize">{type}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label
//                   className={`block text-sm font-medium ${styles.textPrimary} mb-1`}
//                 >
//                   Title
//                 </label>
//                 <input
//                   {...register("title")}
//                   className={`w-full px-4 py-2 border ${styles.border} rounded-lg ${styles.inputFocus}`}
//                   placeholder="Enter material title"
//                 />
//                 {errors.title && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.title.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label
//                   className={`block text-sm font-medium ${styles.textPrimary} mb-1`}
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   {...register("description")}
//                   className={`w-full px-4 py-2 border ${styles.border} rounded-lg ${styles.inputFocus}`}
//                   rows={3}
//                   placeholder="Enter material description"
//                 />
//                 {errors.description && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.description.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label
//                   className={`block text-sm font-medium ${styles.textPrimary} mb-1`}
//                 >
//                   Duration (minutes)
//                 </label>
//                 <input
//                   id="duration"
//                   type="number"
//                   defaultValue={20}
//                   {...(register("duration"), { valueAsNumber: true })}
//                   onChange={(e) =>
//                     setValue("duration", Number(e.target.value) || 0)
//                   }
//                   className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//                 {errors.duration && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.duration.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* File upload field */}
//             {!preview && (
//               <div>
//                 <label
//                   className={`block text-sm font-medium ${styles.textPrimary} mb-1`}
//                 >
//                   {selectedType === "reading" ? "Upload PDF" : "Upload Video"}
//                 </label>
//                 <input
//                   type="file"
//                   accept={
//                     selectedType === "reading" ? "application/pdf" : "video/mp4"
//                   }
//                   onChange={handleFileUpload}
//                   className={`w-full px-4 py-2 border ${styles.border} rounded-lg`}
//                 />
//                 {uploading && (
//                   <p className={`${styles.textSecondary} text-sm`}>
//                     Uploading...
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* File preview */}
//             {preview && (
//               <div>
//                 <label
//                   className={`block text-sm font-medium ${styles.textPrimary} mb-1`}
//                 >
//                   Preview
//                 </label>
//                 {selectedType === "reading" && (
//                   <embed
//                     src={preview}
//                     type="application/pdf"
//                     className="w-full h-96"
//                   />
//                 )}
//                 {selectedType === "video" && (
//                   <video controls className="w-full h-96">
//                     <source src={preview} type="video/mp4" />
//                   </video>
//                 )}
//               </div>
//             )}

//             {/* Hidden Input for File Key */}
//             <input type="hidden" {...register("fileKey")} />
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               className={`px-6 py-2 border ${styles.border} rounded-lg hover:${styles.lightBg}`}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={`px-6 py-2 ${styles.primary} ${styles.buttonText} rounded-lg hover:${styles.hover} focus:ring-2 ${styles.focusRing}`}
//             >
//               Create Material
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MaterialCreation;

import React from "react";
import { useCreateMaterial } from "../../../../hooks/useCreateMaterial";
import MaterialForm from "../../components/MaterialForm";

const MaterialCreation: React.FC = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    setValue,
    handleFileUpload,
    watch,
    errors,
    uploading,
    preview,
    selectedType,
  } = useCreateMaterial();

  return (
    <MaterialForm
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      setValue={setValue}
      handleFileUpload={handleFileUpload}
      watch={watch}
      errors={errors}
      uploading={uploading}
      preview={preview}
      selectedType={selectedType}
      mode="create"
    />
  );
};

export default MaterialCreation;
