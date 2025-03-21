import React, { useState, useEffect } from "react";
import { MessageSquareText } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const TypingIndicator = () => {
  const [dots, setDots] = useState("");
  const { typeName, isTyping } = useSelector((state: RootState) => state.group);

  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isTyping]);

  if (!isTyping) return null;

  return (
    <div className="flex items-center p-2 text-gray-500 text-sm bg-gray-100 rounded-lg max-w-xs my-2 animate-pulse">
      <MessageSquareText size={16} className="mr-2 text-gray-400" />
      <div className="flex items-center">
        <span className="font-medium mr-1">{typeName}</span>
        <span>typing</span>
        <span className="w-6 text-left">{dots}</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
