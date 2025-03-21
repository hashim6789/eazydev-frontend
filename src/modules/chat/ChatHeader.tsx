import { Users, Menu, Activity } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import TypingIndicator from "../shared/components/TypingIndicator";
interface ChatHeaderProps {
  onMenuClick: () => void;
  onInfoClick: () => void;
}

const ChatHeader = ({ onMenuClick, onInfoClick }: ChatHeaderProps) => {
  const { groups, selectedGroupId, isTyping, onlineCount } = useSelector(
    (state: RootState) => state.group
  );
  const group = groups.find((group) => group._id === selectedGroupId);

  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-4">
      {/* Left Section: Menu and Group Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
        >
          <Menu size={20} />
        </button>

        {group && (
          <div className="flex flex-col">
            <h2 className="font-semibold text-gray-800">{group.title}</h2>

            {/* Status indicators row */}
            <div className="flex items-center space-x-2 text-xs">
              {/* Participants count */}
              <div className="flex items-center text-gray-500">
                <Users size={12} className="mr-1" />
                <span>{group.memberCount} participants</span>
              </div>

              {/* Online indicator */}
              {onlineCount > 0 && (
                <div className="flex items-center text-green-600">
                  <Activity size={12} className="mr-1" />
                  <span>{onlineCount} online</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Center: Typing Indicator */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
        {isTyping && <TypingIndicator />}
      </div>

      {/* Right: Group Info Button */}
      <button
        onClick={onInfoClick}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150 flex items-center space-x-1"
      >
        <span className="text-sm text-gray-600 hidden sm:inline">
          Group Info
        </span>
        <Users size={20} className="text-gray-600" />
      </button>
    </div>
  );
};

export default ChatHeader;
