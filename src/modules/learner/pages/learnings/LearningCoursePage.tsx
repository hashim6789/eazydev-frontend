import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronUp, ChevronDown, BookOpen, ArrowLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";

import useFetch from "../../../../hooks/useFetch";
import MaterialContent from "../../components/learnings/MaterialContent";
import {
  setCurrentMaterial,
  setLessons,
  setMentor,
} from "../../../../store/slice";
import {
  ErrorState,
  LoadingState,
  NoContentState,
} from "../../../shared/Error";
import {
  PopulatedProgressLearningsDTO,
  ProgressMaterial,
} from "../../../../types";

const CourseLearningLayout = () => {
  const navigate = useNavigate();
  const { progressId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { lessons, currentMaterial } = useSelector(
    (state: RootState) => state.learnings
  );

  // State for managing lesson collapsibles
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);

  // Fetching lessons and managing state
  const { data, error, loading } = useFetch<PopulatedProgressLearningsDTO>(
    `/progresses/${progressId}`
  );

  useEffect(() => {
    if (data) {
      dispatch(setMentor(data.mentor));
      dispatch(setLessons(data.lessons));
    } else if (error) {
      //   dispatch(setLearningsError("Failed to fetch lessons"));
    }
  }, [data, error, dispatch]);

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleMaterialClick = (material: ProgressMaterial) => {
    dispatch(setCurrentMaterial(material));
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!lessons || lessons.length === 0) {
    return <NoContentState />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => navigate("/learner/learnings")}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learnings
          </button>
        </div>

        {/* Lessons List */}
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            Course Content
          </h1>
          {lessons.map((lesson) => (
            <div key={lesson.id} className="mb-4">
              {/* Lesson Header */}
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">
                      {lesson.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {lesson.isCompleted ? "Completed" : "In Progress"}
                    </div>
                  </div>
                </div>
                {expandedLessons.includes(lesson.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Materials List */}
              {expandedLessons.includes(lesson.id) && (
                <div className="mt-2 space-y-2 px-6">
                  {lesson.materials.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => handleMaterialClick(material)}
                      className={`w-full px-4 py-2 rounded-lg flex items-center space-x-3 transition-colors ${
                        currentMaterial && currentMaterial.id === material.id
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          material.isCompleted ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      <span className="text-sm">{material.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-4 space-y-3">
          <button
            onClick={() => navigate(`/learner/meetings/${progressId}`)}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Connect Mentor
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <MaterialContent progressId={progressId as string} />
      </main>
    </div>
  );
};

export default CourseLearningLayout;
