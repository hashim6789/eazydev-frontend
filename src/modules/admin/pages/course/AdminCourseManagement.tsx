//imported built-in ui components
import { Users } from "lucide-react";
import { Breadcrumb, TitleSection } from "../../../shared/components";
import CoursesTable from "../../tables/CourseTable";

interface AdminUserProps {}

const AdminCourseManagement: React.FC<AdminUserProps> = ({}) => {
  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb
        paths={[
          { title: "Dashboard", link: "/admin/dashboard" },
          { title: "Course", link: "" },
        ]}
      />

      {/* Title Section */}
      <TitleSection
        icon={<Users className="h-6 w-6" />}
        title={`Course Overview`}
      />

      {/* Content */}
      <div>
        <CoursesTable />
      </div>
    </div>
  );
};

export default AdminCourseManagement;
