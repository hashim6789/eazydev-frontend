import { Award, Monitor } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../store";
import { ErrorState, LoadingState } from "../../../shared/Error";
import { api } from "../../../../configs";
import BackComponent from "../../components/BackComponent";
import useUnAuthorizedFetch from "../../../../hooks/useUnAuthorizedFetch";
import { PopulatedCourseDetails } from "../../../../types";
import { IPurchase } from "../../../../types/purchase";
import { useEffect, useState } from "react";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [isPurchased, setIsPurchased] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const {
    data: course,
    error,
    loading,
  } = useUnAuthorizedFetch<PopulatedCourseDetails>(
    `/api/no-auth/courses/${courseId}`
  );

  useEffect(() => {
    const fetchPurchaseStatus = async () => {
      try {
        if (isAuthenticated) {
          const response = await api.get(`/api/purchases`);
          if (response.status === 200) {
            const purchases: IPurchase[] = response.data;
            console.log(purchases);
            setIsPurchased(
              purchases.some((purchase) => purchase.course.id === courseId)
            );
          }
        }
      } catch (err) {
        console.error("Failed to fetch purchase status:", err);
      }
    };

    fetchPurchaseStatus();
  }, [courseId, isAuthenticated]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !course) {
    return <ErrorState />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <BackComponent item="Courses" theme="blue" />
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="relative">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full rounded-lg object-cover h-64"
            />
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-2 text-gray-600">{course.description}</p>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Main Lessons</h2>
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center p-4 bg-blue-50 rounded-lg"
                  >
                    <span className="mr-4 text-blue-600 font-semibold">
                      {index + 1}.
                    </span>
                    <div>
                      <span className="text-gray-800">{lesson.title}</span>
                      <p className="text-gray-600">{lesson.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-3xl font-bold text-blue-600">
                  ₹{course.price}
                </span>
              </div>
            </div>

            {isPurchased ? (
              <button
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-6"
                onClick={() => navigate("/learner/learnings")}
              >
                Go to My Learnings
              </button>
            ) : (
              <button
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-6"
                onClick={() => navigate(`/learner/checkout/${courseId}`)}
              >
                Buy Now
              </button>
            )}

            <div className="space-y-4 mt-6">
              <div className="flex items-center text-gray-600">
                <Monitor className="w-5 h-5 mr-2" />
                <span>Access on all devices</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Award className="w-5 h-5 mr-2" />
                <span>Certificate of completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
