import React from "react";
import { Outlet } from "react-router-dom";

import LearnerNavbar from "../components/LearnerNavbar";
import LearnerFooter from "../components/LearnerFooter";

const LearnerLayout: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-white">
        <LearnerNavbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Outlet />
        </main>
        <LearnerFooter />
      </div>
    </>
  );
};

export default LearnerLayout;
