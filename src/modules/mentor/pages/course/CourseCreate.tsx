// src/components/CourseCreation/index.tsx - Main entry point for course creation
import React from "react";
import { CourseForm } from "../../components/course";

const CourseCreation: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <CourseForm />
    </div>
  );
};

export default CourseCreation;
