import { Clock, Award, Monitor, Share2, Tag, BookOpen } from "lucide-react";

import userImage from "../../../../assets/img/user_image.avif";
import { useParams, useNavigate } from "react-router-dom";

import useUnAuthorizedFetch from "../../../../hooks/useUnAuthorizedFetch";
import BackComponent from "../../components/BackComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import useFetch from "../../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { PopulatedCourseDetails } from "../../../../types";
import { ErrorState, LoadingState } from "../../../shared/Error";
import { api } from "../../../../configs";
import { IPurchase } from "../../../../types/purchase";
import { showInfoToast } from "../../../../utils";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [isPurchased, setPurchased] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const {
    data: course,
    error,
    loading,
  } = isAuthenticated
    ? useFetch<PopulatedCourseDetails>(`/courses/${courseId}`)
    : useUnAuthorizedFetch<PopulatedCourseDetails>(
        `/no-auth/courses/${courseId}`
      );

  const { data: purchaseData } = isAuthenticated
    ? useFetch<IPurchase[]>("/purchases")
    : { data: [] };

  useEffect(() => {
    if (purchaseData) {
      const data: IPurchase[] = purchaseData;
      const purchased = data.some(
        (purchase) => purchase.course.id === courseId
      );
      setPurchased(purchased);
      console.log("isPurchased", purchased);
    }
  }, [purchaseData, courseId]);

  if (loading) {
    return <LoadingState />;
  }
  if (error || !course) {
    return <ErrorState />;
  }

  const handlePurchase = async () => {
    if (isAuthenticated) {
      const response = await api.get("/purchases");
      if (response && response.status === 200) {
        const data: IPurchase[] = response.data;
        const isPurchased = data.some(
          (purchase) => purchase.course.id === courseId
        );
        console.log("isPurchased", isPurchased);
        if (isPurchased) {
          showInfoToast("you are already purchased this course.");
          navigate("/learner/learnings");
        } else {
          navigate(`/learner/checkout/${courseId}`);
        }
      } else {
        navigate(`/learner/checkout/${courseId}`);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className=" mx-auto p-6">
      <BackComponent item="Courses" theme="blue" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full object-cover h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-4 inline-block">
                    {course.category.title}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {course.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="mt-6 flex items-center p-4 bg-blue-50 rounded-lg">
              <img
                src={course.mentor.profilePicture || userImage}
                alt={`${course.mentor.firstName} ${course.mentor.lastName}`}
                onError={(e) => {
                  e.currentTarget.src = userImage; // Your fallback image path
                }}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-sm text-gray-500">Instructor</p>
                <p className="font-medium text-gray-900">
                  {course.mentor.firstName} {course.mentor.lastName}
                </p>
              </div>
            </div>

            {/* Course Description */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Course
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Curriculum */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                Course Curriculum
              </h2>
              <div className="border rounded-lg overflow-hidden">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-4 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b last:border-b-0`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {/* Lesson duration could go here */}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                {/* Price */}
                <div className="p-6 border-b">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      ${course.price.toFixed(2)}
                    </span>
                    {course.price < 100 && (
                      <span className="text-lg text-gray-400 line-through">
                        ${(course.price * 1.2).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    {!isPurchased ? (
                      <>
                        <button
                          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                          onClick={handlePurchase}
                        >
                          Buy Now
                        </button>
                      </>
                    ) : (
                      <button
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                        onClick={() => navigate("/learner/learnings")}
                      >
                        Go To Learnings
                      </button>
                    )}
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    This course includes:
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <BookOpen className="w-5 h-5 mr-3 text-blue-600" />
                      <span>{course.lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-3 text-blue-600" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Monitor className="w-5 h-5 mr-3 text-blue-600" />
                      <span>Access on all devices</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Award className="w-5 h-5 mr-3 text-blue-600" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </div>

                {/* Course Status */}
                {course.status && (
                  <div className="p-6 bg-blue-50 border-t">
                    <div className="flex items-center">
                      <Tag className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-medium text-blue-700">
                        {course.status}
                      </span>
                    </div>
                  </div>
                )}

                {/* Social Share */}
                <div className="p-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Share this course
                  </h3>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <Share2 className="w-5 h-5 text-gray-700" />
                    </button>
                    {/* Add other social icons as needed */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
