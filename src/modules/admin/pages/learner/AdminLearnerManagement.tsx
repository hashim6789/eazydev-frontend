//imported sub classes

//imported child components
import LearnersTable from "../../tables/LearnerTable";

//imported custom hooks

//imported built in  ui components
import { ChevronRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserTable from "../../tables/LearnerTable";
import { SubRole } from "../../../../types";

interface AdminUserProps {
  role: SubRole;
}

const AdminUserManagement: React.FC<AdminUserProps> = ({ role }) => {
  const navigate = useNavigate();

  const userTitle = role === "learner" ? "Learners" : "Mentors";

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <a
          onClick={() => navigate("/admin/dashboard")}
          className="hover:text-red-600 transition-colors"
        >
          Dashboard
        </a>
        <ChevronRight className="h-4 w-4" />
        <span className="text-red-600 font-medium">{userTitle}</span>
      </nav>

      {/* Title Section */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-red-100 rounded-lg">
          <Users className="h-6 w-6 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          {userTitle} Overview
        </h1>
      </div>

      {/* Content */}
      <div>
        <UserTable role={role} />
      </div>
    </div>
  );
};

export default AdminUserManagement;
