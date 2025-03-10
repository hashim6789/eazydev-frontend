// import { X } from "lucide-react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../store";

// interface GroupInfoSidebarProps {
//   onClose: () => void;
// }

// // Group Info Sidebar Component
// const GroupInfoSidebar = ({ onClose }: GroupInfoSidebarProps) => {
//   const { groups } = useSelector((state: RootState) => state.group);
//   const mentor = groups[0].mentor;
//   const learners = groups[0].learners;
//   return (
//     <aside className="w-64 border-l bg-white h-full">
//       <div className="p-4 border-b flex justify-between items-center">
//         <h3 className="font-semibold text-gray-800">Group Info</h3>
//         <button
//           onClick={onClose}
//           className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-150"
//         >
//           <X size={20} className="text-gray-500" />
//         </button>
//       </div>
//       <div className="p-4 space-y-6">
//         {groups && mentor && (
//           <div>
//             <h4 className="text-sm font-medium text-gray-500 mb-2">Mentor</h4>
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                 <img src={mentor.profilePicture} alt="" />
//               </div>
//               <div>
//                 <p className="font-medium text-gray-800">{`${mentor.firstName} ${mentor.lastName}`}</p>
//                 {/* <p className="text-sm text-gray-500">{mentor.expertise}</p> */}
//               </div>
//             </div>
//           </div>
//         )}
//         <div>
//           <h4 className="text-sm font-medium text-gray-500 mb-2">Learners</h4>
//           <div className="space-y-2">
//             {learners &&
//               learners.map((learner) => (
//                 <div key={learner._id} className="flex items-center space-x-2">
//                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
//                     <img src={learner.profilePicture} alt="" />
//                   </div>
//                   <span className="text-gray-800">{`${learner.firstName} ${learner.lastName}`}</span>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default GroupInfoSidebar;
