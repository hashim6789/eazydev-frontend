import { ChevronRight, Clock, Edit, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Material } from "../../../types/material";
import { useThemeStyles } from "../../../utils/color-theme.util";
import { getMaterialTypeIcon } from "../../../utils/icon.util";

interface MaterialCardProps {
  material: Material;
  handleDelete: (materialId: string) => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  handleDelete,
}) => {
  const materialId = material.id;
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const styles = useThemeStyles(); // Fetch theme-based styles
  const navigate = useNavigate();

  return (
    <div
      key={material.id}
      className={`${styles.cardBg} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getMaterialTypeIcon(material.type, styles)}
            <h3 className={`text-lg font-semibold ${styles.textPrimary}`}>
              {material.title}
            </h3>
          </div>
          <span
            className={`px-3 py-1 text-sm font-medium ${styles.textPrimary} ${styles.border} rounded-full`}
          >
            {material.type}
          </span>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`p-2 rounded-full ${styles.hover}`}
            >
              <MoreVertical className={`w-5 h-5 ${styles.textSecondary}`} />
            </button>
            {showMenu && (
              <div
                className={`absolute right-0 mt-2 w-48 ${styles.cardBg} rounded-md shadow-lg z-10 py-1 border ${styles.border}`}
              >
                <button
                  onClick={() => navigate(`/mentor/materials/${materialId}`)}
                  className={`flex items-center w-full px-4 py-2 text-sm ${styles.textPrimary} ${styles.hover}`}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  View Material
                </button>
                <button
                  onClick={() => {
                    handleDelete(material.id);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50`}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Material
                </button>
              </div>
            )}
          </div>
        </div>

        <p className={`mb-4 ${styles.textSecondary}`}>{material.description}</p>
        <div className={`flex items-center ${styles.textSecondary}`}>
          <Clock className="w-4 h-4 mr-2" />
          <span>{material.duration} minutes</span>
        </div>
      </div>
      <div
        className={`px-6 py-4 ${styles.lightBg} rounded-b-lg border-t ${styles.border}`}
      >
        <button
          onClick={() => navigate(`/mentor/materials/${material.id}`)}
          className={`flex items-center ${styles.textPrimary} ${styles.hover} text-sm font-medium`}
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default MaterialCard;
