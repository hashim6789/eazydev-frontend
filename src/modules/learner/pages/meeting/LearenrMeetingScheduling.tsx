// import React, { useState, useEffect } from "react";
// import api from "../../../../shared/utils/api";
// import { ISlot } from "../../../../shared/types/Slot";
// import { transformSlots } from "../../../../shared/utils/transformer.util";
// import ScheduledMeetingsTable from "../../../common/components/MeetingTable";
// import { getUserProperty } from "../../../../shared/utils/user.util";
// import { useParams } from "react-router-dom";

// const LearnerMeetingScheduling: React.FC = () => {
//   const { mentorId, courseId } = useParams();
//   const [slots, setSlots] = useState<ISlot[]>([]);
//   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

//   useEffect(() => {
//     fetchSlots();
//   }, []);

//   console.log("slots", slots);
//   // Fetch slots from API
//   const fetchSlots = async () => {
//     try {
//       const response = await api.get(`/api/slots/mentors/${mentorId}`);
//       setSlots(transformSlots(response.data.data));
//     } catch (error) {
//       console.error("Error fetching slots:", error);
//     }
//   };

//   // Handle slot booking
//   const handleBookSlot = async (slotId: string) => {
//     try {
//       const learnerId = getUserProperty("id");
//       await api.patch(`/api/slots/${slotId}/book`, { learnerId, courseId });
//       alert("Slot booked successfully!");
//       fetchSlots();
//     } catch (error) {
//       console.error("Error booking slot:", error);
//     }
//   };

//   return (
//     <div className="w-full h-full p-6 bg-white shadow-lg rounded-lg">
//       {/* <h2 className="text-2xl font-semibold mb-4">Schedule a Meeting</h2> */}

//       {/* Scheduled Meetings Table */}
//       <ScheduledMeetingsTable role="learner" />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {/* Available Slots List */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Available Slots</h3>
//           {slots.length > 0 ? (
//             <ul className="list-disc pl-5">
//               {slots.map((slot) => (
//                 <li key={slot.id} className="mb-2">
//                   <div className="flex justify-between items-center">
//                     <span>{`${slot.date} - ${slot.time}`}</span>
//                     {!slot.isBooked ? (
//                       <button
//                         onClick={() => handleBookSlot(slot.id)}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                       >
//                         {"book"}
//                       </button>
//                     ) : (
//                       <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
//                         {"N/A"}
//                       </button>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No available slots.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LearnerMeetingScheduling;
