import userImage from "../../../assets/img/user_image.avif";
import { SubRole } from "../../../types";

interface TableRowProps {
  user: any; // Replace `any` with your user type.
  role: SubRole;
  handleView: (userId: string, role: SubRole) => void;
}

export const TableRow: React.FC<TableRowProps> = ({
  user,
  role,
  handleView,
}) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <img
            className="h-10 w-10 rounded-full"
            src={user.profilePicture || userImage}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = userImage;
            }}
            alt="Profile"
          />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{user.email}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.isBlocked
            ? "bg-red-100 text-red-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {user.isBlocked ? "Blocked" : "Unblocked"}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button
        onClick={() => handleView(user.id, role)}
        className="text-sm px-4 py-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200"
      >
        View
      </button>
    </td>
  </tr>
);
