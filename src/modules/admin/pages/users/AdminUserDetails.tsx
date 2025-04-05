//imported build-in ui components
import { BookOpen } from "lucide-react";

//imported build-in hooks
import { useParams } from "react-router-dom";

//imported custom hooks
import useFetch from "../../../../hooks/useFetch";
import { SubRole } from "../../../../types";
import { FC } from "react";
import { getButtonTheme } from "../../../../utils";
import useUserBlock from "../../../../hooks/useUserBlock";
import userImage from "../../../../assets/img/logo.png";

interface LearnerDetailsProps {
  role: SubRole;
}

interface Learner {
  firstName: string;
  lastName: string | null;
  email: string;
  profilePicture: string | null;
  courses: { title: string; thumbnail: string; price: string }[];
  isBlocked: boolean | null;
}

const AdminUserDetails: FC<LearnerDetailsProps> = ({ role }) => {
  const { learnerId, mentorId } = useParams();
  const userId = learnerId || mentorId;
  const {
    data: user,
    setData,
    loading: userLoading,
  } = useFetch<Learner>(`/users/${userId}?userRole=${role}`);
  console.log("user", user);
  const { handleBlockUnblock } = useUserBlock();
  console.log("User", user);

  const getInitials = (firstName: string, lastName: string | null) => {
    return `${firstName[0]}${lastName ? lastName[0] : ""}`.toUpperCase();
  };

  const handleBlock = async (id: string) => {
    if (user) {
      const success = await handleBlockUnblock(
        id,
        role,
        user.isBlocked as boolean
      );
      if (success) {
        setData({ ...user, isBlocked: !user.isBlocked });
      }
    }
  };

  const content = role === "learner" ? "Purchased" : "Created";

  //loading handling
  if (userLoading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading user details...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we fetch the information
          </p>
        </div>
      </div>
    );
  }

  //error handling
  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-800">
            error fetch user details...
          </h2>
          <p className="text-red-500 mt-2">Please try again (:</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md mb-8 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {user.profilePicture ? (
              <img
                src={user.profilePicture || userImage}
                alt={`${user.firstName}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-gray-600">
                {getInitials(user.firstName, user.lastName)}
              </span>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              {user.isBlocked && (
                <span className="px-2 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-md">
                  Blocked
                </span>
              )}
            </div>
            <p className="text-gray-500">{user.email}</p>
          </div>

          {userId && user.isBlocked !== null && (
            <button
              onClick={() => handleBlock(userId)}
              className={`text-sm px-4 py-2 rounded-md mr-2 ${getButtonTheme(
                user.isBlocked as boolean
              )}`}
            >
              {user.isBlocked ? "Unblock" : "Block"}
            </button>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{user.courses.length}</p>
              <p className="text-sm text-gray-500">Courses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchased Courses */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {content} Courses
          </h2>
        </div>

        <div className="p-6">
          <div className="h-[600px] overflow-y-auto pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {course.thumbnail && (
                    <div className="aspect-video relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetails;
