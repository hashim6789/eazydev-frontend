//imported sub classes

//imported child components
import UserTable from "../../tables/UserTable";

//imported built-in ui components
import { Users } from "lucide-react";
import { SubRole } from "../../../../types";
import { Breadcrumb, TitleSection } from "../../../shared/components";

interface AdminUserProps {
  role: SubRole;
}

const AdminUserManagement: React.FC<AdminUserProps> = ({ role }) => {
  const userTitle = role === "learner" ? "Learners" : "Mentors";

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb
        paths={[
          { title: "Dashboard", link: "/admin/dashboard" },
          { title: userTitle, link: "" },
        ]}
      />

      {/* Title Section */}
      <TitleSection
        icon={<Users className="h-6 w-6" />}
        title={`${userTitle} Overview`}
      />

      {/* Content */}
      <div>
        <UserTable role={role} />
      </div>
    </div>
  );
};

export default AdminUserManagement;
