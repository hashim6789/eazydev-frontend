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

// // src/App.tsx - Example App component
// import React from "react";
// import CourseCreation from "./components/CourseCreation";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-4 px-4">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Learning Platform
//           </h1>
//         </div>
//       </header>
//       <main>
//         <CourseCreation />
//       </main>
//     </div>
//   );
// }

// export default App;

//   export default CourseForm;

//   export default CourseDetails;

//   export default LessonsList;

//   export default LessonForm;

//   export default MaterialForm;

// export default Select;

// export default FileUpload;

// export default ProgressBar;

// export default RadioGroup;
