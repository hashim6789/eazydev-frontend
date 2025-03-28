// src/components/CourseCreation/index.tsx - Main entry point for course creation
import React from "react";
import { CourseFormA } from "../../components/course";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { setEditingStatus } from "../../../../store/slice";

const CourseCreation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(setEditingStatus(false));
  return (
    <div className="container mx-auto px-4 py-6">
      <CourseFormA />
    </div>
  );
};

export default CourseCreation;
