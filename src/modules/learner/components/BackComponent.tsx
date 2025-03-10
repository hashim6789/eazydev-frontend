import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface BackComponentProps {
  item: string;
  theme: "purple" | "red" | "blue";
}

const BackComponent: React.FC<BackComponentProps> = ({ item, theme }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center text-${theme}-600 hover:text-${theme}-700 mb-6`}
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back to {item}
    </button>
  );
};

export default BackComponent;
