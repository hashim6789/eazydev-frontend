// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Edit2 } from "lucide-react";
// import userImage from "../../../../assets/img/user_image.avif";
// import { config } from "../../../../shared/configs/config";
// import axios from "axios";
// import api from "../../../../shared/utils/api";
// import { showToast } from "../../../../shared/utils/toastUtils";
// import LoadingComponent from "../../../mentor/components/LoadingComponent";
// import ErrorComponent from "../../../mentor/components/ErrorComponent";

// // Form Validation Schema
// const schema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   lastName: z.string().min(1, "Last name is required"),
// });

// type FormData = z.infer<typeof schema>;

// const PersonalDetails: React.FC = () => {
//   const [profilePicture, setProfilePicture] = useState<string>(userImage);
//   const [userDetails, setUserDetails] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isEditable, setIsEditable] = useState<boolean>(false);

//   // Fetch user details on mount
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await api.get(`/api/profile/learner`);
//         setUserDetails(response.data.data);
//         if (response.data.data.profilePicture) {
//           setProfilePicture(response.data.data.profilePicture);
//         }
//       } catch (err) {
//         setError("Failed to fetch user details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserDetails();
//   }, []);

//   // Handle profile image upload
//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", config.CLOUDINARY_PRESET);

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/${config.CLOUDINARY_CLOUD_NAME}/image/upload`,
//         formData
//       );

//       if (response.status === 200) {
//         const profilePicture = response.data.secure_url;
//         setProfilePicture(profilePicture);

//         // Update profile image in backend
//         await api.put("/api/profile/learner/profile-img", { profilePicture });
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       showToast.error("Failed to upload image.");
//     }
//   };

//   // Form Handling
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       const response = await api.put("/api/profile/learner/personal", data);
//       if (response.status === 200) {
//         showToast.success(response.data.message);
//         setIsEditable(false);
//       }
//     } catch (error: any) {
//       showToast.error("Failed to update profile.");
//     }
//   };

//   if (loading) {
//     return <LoadingComponent theme="blue" item="personal details" />;
//   }
//   if (error) {
//     return <ErrorComponent theme="blue" item="personal details" />;
//   }

//   return (
//     <div>
//       <div className="space-y-6">
//         <div className="text-xl font-semibold mb-4">Basic Details</div>

//         {/* Profile Image */}
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
//               <img
//                 src={profilePicture}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <button
//               onClick={() => document.getElementById("fileInput")?.click()}
//               className="absolute bottom-0 right-0 rounded-full bg-white p-2 border border-gray-300"
//             >
//               <Edit2 className="h-4 w-4" />
//             </button>
//           </div>
//           <input
//             id="fileInput"
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </div>

//         {/* Edit Button */}
//         <div className="flex justify-end">
//           <button
//             onClick={() => setIsEditable(!isEditable)}
//             className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
//           >
//             {isEditable ? "Cancel" : "Edit"}
//           </button>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="border rounded-lg p-4"
//         >
//           <div className="grid gap-4 mt-6">
//             {/* First Name */}
//             <div className="grid gap-2">
//               <label className="text-sm font-medium">First Name</label>
//               <input
//                 {...register("firstName")}
//                 className="border p-2 rounded-md"
//                 defaultValue={userDetails?.firstName}
//                 placeholder="Enter first name"
//                 disabled={!isEditable}
//               />
//               {errors.firstName && (
//                 <p className="text-red-500 text-sm">
//                   {errors.firstName.message}
//                 </p>
//               )}
//             </div>

//             {/* Last Name */}
//             <div className="grid gap-2">
//               <label className="text-sm font-medium">Last Name</label>
//               <input
//                 {...register("lastName")}
//                 className="border p-2 rounded-md"
//                 defaultValue={userDetails?.lastName || "Hashim"}
//                 placeholder="Enter last name"
//                 disabled={!isEditable}
//               />
//               {errors.lastName && (
//                 <p className="text-red-500 text-sm">
//                   {errors.lastName.message}
//                 </p>
//               )}
//             </div>

//             {/* Email */}
//             <div className="grid gap-2">
//               <label className="text-sm font-medium">Email</label>
//               <input
//                 defaultValue={userDetails?.email || "hashim@gmail.com"}
//                 className="border p-2 rounded-md"
//                 type="email"
//                 disabled
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className={`bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-4 ${
//               !isEditable && "cursor-not-allowed opacity-50"
//             }`}
//             disabled={!isEditable}
//           >
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PersonalDetails;
