import React from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStyles } from "../../../../utils/color-theme.util";
import { Pagination } from "../../../shared/components";
import { useMaterialTable } from "../../../../hooks/useMaterialTable";
import Breadcrumbs from "../../../shared/components/BreadCrumbs";
import { MaterialType } from "../../../../types/material";
import MaterialCard from "../../components/MaterialCard";
import FilterSearchBar from "../../../shared/components/FilterSearchBar";
import { materialManagementPath } from "../../../../utils/path.util";
import ManagementHeader from "../../../shared/components/ManagementHeader";
import { NoContentState } from "../../../shared/Error/NoContentState";
import { LoadingState } from "../../../shared/Error/LoadingState";

const MaterialManagement: React.FC = () => {
  const navigate = useNavigate();
  const styles = useThemeStyles(); // Use dynamic theme styles

  const {
    data,
    searchQuery,
    materialFilterType,
    handleSearchChange,
    currentPage,
    handlePageChange,
    handleFilterChange,
    totalPages,
    loading,
    handleDelete,
  } = useMaterialTable({ itemsPerPage: 6, filterField: "type" });

  return (
    <div className={`p-6 min-h-screen ${styles.textSecondary}`}>
      <Breadcrumbs paths={materialManagementPath} />
      <div className="max-w-7xl mx-auto">
        <ManagementHeader
          entity="Material"
          description="Manage your educational content and assessments"
          buttonAction={() => navigate("/mentor/materials/create")}
        />

        {/* Search and Filter Bar */}
        <FilterSearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filterValue={materialFilterType}
          onFilterChange={(filter: string) =>
            handleFilterChange(filter as MaterialType | "all")
          }
          placeholder="Search materials..."
          options={["video", "reading"]}
          styles={styles}
        />
        {loading ? (
          <LoadingState />
        ) : (
          <>
            {/* Material List */}
            {data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.map((material) => (
                  <MaterialCard
                    key={material.id}
                    material={material}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <NoContentState title="No Material found" />
            )}
          </>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MaterialManagement;
