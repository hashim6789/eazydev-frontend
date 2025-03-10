// import React, { useState } from "react";
// import { User, KeyRound, ShoppingBag, CreditCard } from "lucide-react";
// import PersonalDetails from "../components/profile/PersonalDetails";
// import ChangePassword from "../components/profile/ChangePassword";
// import PurchaseHistory from "../components/profile/PurchaseHistory";
// import Subscriptions from "../components/profile/Subsctiptions";

// type NavState = "personal" | "password" | "purchases" | "subscriptions";

// interface TabButtonProps {
//   active: boolean;
//   onClick: () => void;
//   icon: React.ReactNode;
//   label: string;
// }

// const TabButton = ({ active, onClick, icon, label }: TabButtonProps) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center gap-2 p-2 border-b-2 transition-colors ${
//       active
//         ? "border-blue-600 text-blue-600"
//         : "border-transparent hover:border-blue-200"
//     }`}
//   >
//     {icon}
//     {label}
//   </button>
// );

// // const PersonalDetails = () => (
// //   <div className="space-y-6">
// //     <h2 className="text-xl font-semibold">Personal Details</h2>
// //     <div className="grid gap-4 md:grid-cols-2">
// //       <div>
// //         <label className="block text-sm font-medium mb-1">First Name</label>
// //         <input
// //           type="text"
// //           className="w-full p-2 border rounded-lg"
// //           placeholder="Enter first name"
// //         />
// //       </div>
// //       <div>
// //         <label className="block text-sm font-medium mb-1">Last Name</label>
// //         <input
// //           type="text"
// //           className="w-full p-2 border rounded-lg"
// //           placeholder="Enter last name"
// //         />
// //       </div>
// //       <div className="md:col-span-2">
// //         <label className="block text-sm font-medium mb-1">Email</label>
// //         <input
// //           type="email"
// //           className="w-full p-2 border rounded-lg"
// //           placeholder="Enter email"
// //         />
// //       </div>
// //       <div className="md:col-span-2">
// //         <label className="block text-sm font-medium mb-1">Bio</label>
// //         <textarea
// //           className="w-full p-2 border rounded-lg h-24"
// //           placeholder="Tell us about yourself"
// //         />
// //       </div>
// //     </div>
// //     <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
// //       Save Changes
// //     </button>
// //   </div>
// // );

// // const ChangePassword = () => (
// //   <div className="space-y-6">
// //     <h2 className="text-xl font-semibold">Change Password</h2>
// //     <div className="space-y-4 max-w-md">
// //       <div>
// //         <label className="block text-sm font-medium mb-1">
// //           Current Password
// //         </label>
// //         <input
// //           type="password"
// //           className="w-full p-2 border rounded-lg"
// //           placeholder="Enter current password"
// //         />
// //       </div>
// //       <div>
// //         <label className="block text-sm font-medium mb-1">New Password</label>
// //         <input
// //           type="password"
// //           className="w-full p-2 border rounded-lg"
// //           placeholder="Enter new password"
// //         />
// //       </div>
// //       <div>
// //         <label className="block text-sm font-medium mb-1">
// //           Confirm New Password
// //         </label>
// //         <input
// //           type="password"
// //           className="w-full p-2 border rounded-lg"
// //           placeholder="Confirm new password"
// //         />
// //       </div>
// //     </div>
// //     <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
// //       Update Password
// //     </button>
// //   </div>
// // );

// // const PurchaseHistory = () => (
// //   <div className="space-y-6">
// //     <h2 className="text-xl font-semibold">Purchase History</h2>
// //     <div className="space-y-4">
// //       {[1, 2, 3].map((item) => (
// //         <div
// //           key={item}
// //           className="border rounded-lg p-4 hover:shadow-md transition-shadow"
// //         >
// //           <div className="flex justify-between items-start mb-2">
// //             <div>
// //               <h3 className="font-medium">Advanced Web Development</h3>
// //               <p className="text-sm text-gray-600">
// //                 Purchased on March {item}, 2024
// //               </p>
// //             </div>
// //             <span className="font-semibold text-blue-600">$99.99</span>
// //           </div>
// //           <div className="flex justify-between items-center">
// //             <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded">
// //               Completed
// //             </span>
// //             <button className="text-blue-600 hover:text-blue-700 text-sm">
// //               View Receipt
// //             </button>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );

// // const Subscriptions = () => (
// //   <div className="space-y-6">
// //     <h2 className="text-xl font-semibold">Subscriptions</h2>
// //     <div className="space-y-4">
// //       <div className="border rounded-lg p-4">
// //         <div className="flex justify-between items-start mb-4">
// //           <div>
// //             <h3 className="font-medium">Pro Plan</h3>
// //             <p className="text-sm text-gray-600">Active until April 15, 2024</p>
// //           </div>
// //           <span className="font-semibold text-blue-600">$29.99/month</span>
// //         </div>
// //         <div className="flex space-x-2">
// //           <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
// //             Manage Subscription
// //           </button>
// //           <button className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition-colors">
// //             Cancel
// //           </button>
// //         </div>
// //       </div>

// //       <div className="mt-6">
// //         <h3 className="font-medium mb-4">Available Plans</h3>
// //         <div className="grid md:grid-cols-2 gap-4">
// //           {["Basic Plan", "Premium Plan"].map((plan) => (
// //             <div
// //               key={plan}
// //               className="border rounded-lg p-4 hover:shadow-md transition-shadow"
// //             >
// //               <h4 className="font-medium mb-2">{plan}</h4>
// //               <p className="text-sm text-gray-600 mb-4">
// //                 Access to all {plan.toLowerCase()} features and content
// //               </p>
// //               <button className="w-full bg-gray-100 text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition-colors">
// //                 View Details
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// const LearnerProfile = () => {
//   const [navState, setNavState] = useState<NavState>("personal");

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
//       <h1 className="text-2xl font-bold">Account & Settings</h1>

//       <div className="w-full">
//         <div className="grid grid-cols-2 md:grid-cols-4 w-full mb-4">
//           <TabButton
//             active={navState === "personal"}
//             onClick={() => setNavState("personal")}
//             icon={<User className="h-4 w-4" />}
//             label="Personal Details"
//           />
//           <TabButton
//             active={navState === "password"}
//             onClick={() => setNavState("password")}
//             icon={<KeyRound className="h-4 w-4" />}
//             label="Change Password"
//           />
//           <TabButton
//             active={navState === "purchases"}
//             onClick={() => setNavState("purchases")}
//             icon={<ShoppingBag className="h-4 w-4" />}
//             label="Purchases"
//           />
//           <TabButton
//             active={navState === "subscriptions"}
//             onClick={() => setNavState("subscriptions")}
//             icon={<CreditCard className="h-4 w-4" />}
//             label="Subscriptions"
//           />
//         </div>

//         {navState === "personal" && <PersonalDetails />}
//         {navState === "password" && <ChangePassword />}
//         {navState === "purchases" && <PurchaseHistory />}
//         {navState === "subscriptions" && <Subscriptions />}
//       </div>
//     </div>
//   );
// };

// export default LearnerProfile;
