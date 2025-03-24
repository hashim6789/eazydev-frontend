import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import { AppDispatch, RootState } from "../../../../store";
import { api } from "../../../../configs";
import { updateMaterialProgress } from "../../../../store/slice";
import {
  ErrorState,
  LoadingState,
  NoContentState,
} from "../../../shared/Error";

interface MaterialContentProps {
  // onNavigate: (direction: "prev" | "next") => void;
  progressId: string;
}

const MaterialContent: React.FC<MaterialContentProps> = ({
  // onNavigate,
  progressId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const material = useSelector(
    (state: RootState) => state.learnings.currentMaterial
  );

  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (material) {
      const fetchSignedUrl = async () => {
        setLoading(true);
        try {
          const response = await api.post(
            `/api/progresses/${progressId}/get-signed-url`,
            { fileKey: material.fileKey, materialType: material.type }
          );
          if (response && response.status === 200) {
            setSignedUrl(response.data);
          } else {
            throw new Error("Failed to fetch signed URL.");
          }
        } catch (err) {
          console.error(err);
          setError("Could not load the material. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchSignedUrl();
    }
  }, [material, progressId]);

  const handleComplete = async () => {
    if (!material) return;

    try {
      const response = await api.put(`/api/progresses/${progressId}`, {
        materialId: material.id,
      });
      if (response && response.status === 200) {
        dispatch(
          updateMaterialProgress({ id: material.id, isCompleted: true })
        );
      }
    } catch (err) {
      console.error("Failed to mark material as complete:", err);
      setError("Failed to update progress. Please try again.");
    }
  };

  if (!material) {
    return <NoContentState />;
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  const ReadingContent = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {material.title}
      </h2>
      <div className="flex items-center gap-4 text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">Reading Material</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{material.duration} min read</span>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-6">
        {material.description}
      </p>
      {signedUrl && (
        <iframe
          src={signedUrl}
          title="Reading Material"
          className="w-full h-96 rounded-lg border"
        />
      )}
    </div>
  );

  const VideoContent = () => (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="relative aspect-video bg-gray-900">
        {signedUrl ? (
          <video controls className="w-full h-full rounded-lg">
            <source src={signedUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            Loading video...
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {material.title}
        </h2>
        <p className="text-gray-700 mb-4">{material.description}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Navigation */}
      {/* <div className="flex justify-between items-center mb-6">
        <button
          // onClick={() => onNavigate("prev")}
          className="flex items-center text-blue-500 hover:text-blue-600 transition"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Previous
        </button>
        <button
          // onClick={() => onNavigate("next")}
          className="flex items-center text-blue-500 hover:text-blue-600 transition"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div> */}

      {/* Content */}
      {material.type === "reading" ? <ReadingContent /> : <VideoContent />}

      {/* Actions */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          {material.isCompleted && (
            <span className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              Completed
            </span>
          )}
        </div>
        <button
          onClick={handleComplete}
          disabled={material.isCompleted}
          className={`px-6 py-2 rounded-lg transition-colors ${
            material.isCompleted
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {material.isCompleted ? "Completed" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
};

export default MaterialContent;
