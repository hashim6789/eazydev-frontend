import React from "react";
import { useThemeStyles } from "../../../utils/color-theme.util";

interface EntityManagementHeaderProps {
  //   title: string;
  entity: string;
  description: string;
  //   buttonLabel: string;
  buttonAction: () => void; // Callback for button click
}

const ManagementHeader: React.FC<EntityManagementHeaderProps> = ({
  description,
  entity,
  buttonAction,
}) => {
  const styles = useThemeStyles();
  return (
    <div className="mb-6 border-b pb-4 flex justify-between items-center">
      <div>
        <h1 className={`text-3xl font-bold ${styles.textPrimary}`}>
          {entity} Management
        </h1>
        <p className={`${styles.textSecondary}`}>{description}</p>
      </div>
      <button
        onClick={buttonAction}
        className={`${styles.primary} ${styles.hover} ${styles.buttonText} px-4 py-2 font-semibold rounded-lg shadow-md`}
      >
        + Create New {entity}
      </button>
    </div>
  );
};

export default ManagementHeader;
