//imported child components
import CategoryTable from "../../tables/CategoryTable";

//imported built-in ui components
import { Breadcrumb, TitleSection } from "../../../shared/components";
import { Group } from "lucide-react";

interface AdminCategoryProps {}

const AdminCategoryManagement: React.FC<AdminCategoryProps> = ({}) => {
  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb
        paths={[
          { title: "Dashboard", link: "/admin/dashboard" },
          { title: "Categories", link: "" },
        ]}
      />

      {/* Title Section */}
      <TitleSection
        icon={<Group className="h-6 w-6" />}
        title={`Categories Overview`}
      />

      {/* Content */}
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default AdminCategoryManagement;
