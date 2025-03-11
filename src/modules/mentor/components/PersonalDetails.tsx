import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Edit2 } from "lucide-react";
import axios from "axios";
import { api, config } from "../../../configs";
import { showErrorToast, showSuccessToast } from "../../../utils";
import userImage from "../../../assets/img/user_image.avif";

// import LoadingComponent from "../LoadingComponent";
// import ErrorComponent from "../ErrorComponent";

// Form Validation Schema
const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

type FormData = z.infer<typeof schema>;

const PersonalDetails: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string>(userImage);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  // Fetch user details on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`/api/profile/mentor`);
        setUserDetails(response.data.data);
        if (response.data.data.profilePicture) {
          setProfilePicture(response.data.data.profilePicture);
        }
      } catch (err) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  // Handle profile image upload
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", config.CLOUDINARY_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${config.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      if (response.status === 200) {
        const profilePicture = response.data.secure_url;
        setProfilePicture(profilePicture);

        // Update profile image in backend
        await api.put("/api/profile/mentor/profile-img", { profilePicture });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showErrorToast("Failed to upload image.");
    }
  };

  // Form Handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.put("/api/profile/mentor/personal", data);
      if (response.status === 200) {
        showSuccessToast(response.data.message);
        setIsEditable(false);
      }
    } catch (error: any) {
      showErrorToast("Failed to upload image.");
    }
  };

  //   if (loading) {
  //     return <LoadingComponent theme="blue" item="personal details" />;
  //   }
  //   if (error) {
  //     return <ErrorComponent theme="blue" item="personal details" />;
  //   }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Personal Information</h3>

      <div className="flex items-center gap-6">
        {/* Profile Picture */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => document.getElementById("fileInput")?.click()}
            className="absolute bottom-0 right-0 rounded-full bg-white p-2 border border-gray-300"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <button
          onClick={() => setIsEditable(!isEditable)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          {isEditable ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 border rounded-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              First Name
            </label>
            <input
              {...register("firstName")}
              defaultValue={userDetails?.firstName}
              placeholder="Enter first name"
              className={`w-full p-2 rounded-md border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-purple-500 outline-none bg-transparent`}
              disabled={!isEditable}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              Last Name
            </label>
            <input
              {...register("lastName")}
              defaultValue={userDetails?.lastName || "Hashim"}
              placeholder="Enter last name"
              className={`w-full p-2 rounded-md border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-purple-500 outline-none bg-transparent`}
              disabled={!isEditable}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              Email
            </label>
            <input
              type="email"
              defaultValue={userDetails?.email || "hashim@gmail.com"}
              className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none bg-transparent"
              disabled
            />
          </div>

          {/* Phone */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              Phone
            </label>
            <input
              type="tel"
              defaultValue={userDetails?.phone || "+1 (555) 123-4567"}
              className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none bg-transparent"
              disabled={!isEditable}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className={`bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md ${
              !isEditable && "cursor-not-allowed opacity-50"
            }`}
            disabled={!isEditable}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
