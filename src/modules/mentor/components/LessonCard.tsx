import { Book, MoreVertical, Edit, Trash2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lesson } from "../../../types/lesson";

interface LessonCardProps {
  lesson: Lesson;
  onDelete: (lessonId: string) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              {lesson.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {lesson.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {/* <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{lesson.duration || 0} minutes</span>
                </div> */}
              <div className="flex items-center">
                <Book className="w-4 h-4 mr-1" />
                <span>{lesson.materials.length} materials</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-purple-50 rounded-full"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                <button
                  onClick={() => {
                    navigate(`/mentor/my-lessons/${lesson.id}`);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Lesson
                </button>
                <button
                  onClick={() => {
                    onDelete(lesson.id);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Lesson
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="px-6 py-4 bg-purple-50 rounded-b-lg">
        <button
          // onClick={() => setSelectedLesson(lesson.id)}
          onClick={() => navigate(`/mentor/my-lessons/${lesson.id}`)}
          className="flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium"
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default LessonCard;
