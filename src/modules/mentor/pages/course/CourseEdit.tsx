import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import {
  setCourseDetails,
  setCurrentStep,
  setFetchedCourseDetails,
} from "../../../../store/slice";
import { Course, ICourse, PopulatedCourseDetails } from "../../../../types";
import { api } from "../../../../configs";
import { showErrorToast } from "../../../../utils";
import { useNavigate, useParams } from "react-router-dom";
import { CourseFormA } from "../../components/course/CourseFormEdit";
import { LoadingState } from "../../../shared/Error";

const CourseEditing: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get<Course>(`/api/courses/${courseId}`);
        if (response && response.status === 200) {
          dispatch(setFetchedCourseDetails(response.data));
        }
      } catch (error) {
        showErrorToast("Failed to fetch course details.");
        navigate("/mentor/courses"); // Redirect if fetching fails
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, dispatch, navigate]);

  return (
    <div className="container mx-auto px-4 py-6">
      {isLoading ? <LoadingState /> : <CourseFormA isEditing={true} />}
    </div>
  );
};

export default CourseEditing;
