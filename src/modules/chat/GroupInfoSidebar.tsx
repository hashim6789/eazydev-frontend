import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import userImage from "../../assets/img/user_image.avif";
import { getUserProperty } from "../../utils/local-user.util";

interface GroupInfoSidebarProps {
  onClose: () => void;
}

// Group Info Sidebar Component
const GroupInfoSidebar = ({ onClose }: GroupInfoSidebarProps) => {
  const { groups, selectedGroupId } = useSelector(
    (state: RootState) => state.group
  );
  const group = groups.find((item) => item.id === selectedGroupId) || groups[0];
  const mentor = group.mentor;
  const learners = group.learners;
  const userId = getUserProperty("id");

  return (
    <aside className="w-64 border-l bg-white h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Group Info</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-150"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>
      <div className="p-4 space-y-6">
        {groups && mentor && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Mentor</h4>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <img src={mentor.profilePicture || userImage} alt="" />
              </div>
              <div>
                {mentor.id !== userId ? (
                  <p className="font-medium text-gray-800">{`${
                    mentor.firstName
                  } ${mentor.lastName || ""}`}</p>
                ) : (
                  <p className="font-medium text-gray-800">You</p>
                )}
                {/* <p className="text-sm text-gray-500">{mentor.expertise}</p> */}
              </div>
            </div>
          </div>
        )}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Learners</h4>
          <div className="space-y-2">
            {learners &&
              learners.map((learner) => (
                <div key={learner.id} className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <img src={learner.profilePicture || userImage} alt="" />
                  </div>
                  {learner.id !== userId ? (
                    <span className="text-gray-800">{`${learner.firstName} ${
                      learner.lastName || ""
                    }`}</span>
                  ) : (
                    <p className="font-medium text-gray-800">You</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default GroupInfoSidebar;
