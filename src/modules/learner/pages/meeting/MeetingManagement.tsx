// import React, { useState, useEffect } from "react";

// import { getUserProperty } from "../../../../shared/utils/user.util";
// import api from "../../../../shared/utils/api";
// import { ISlot } from "../../../../shared/types/Slot";
// import { transformSlots } from "../../../../shared/utils/transformer.util";
// import ScheduledMeetingsTable from "../../../common/components/MeetingTable";
// import AvailableSlots from "../../../mentor/components/meeting/AvailableSlots";

// const MeetingManagement: React.FC = () => {
//   const [slots, setSlots] = useState<ISlot[]>([]);

//   useEffect(() => {
//     fetchSlots();
//   }, []);

//   // Fetch slots from API
//   const fetchSlots = async () => {
//     try {
//       const response = await api.get("/api/slots");
//       console.log(response.data.data, "response");

//       // setSlots(sampleSlots);
//       setSlots(transformSlots(response.data.data));
//     } catch (error) {
//       console.error("Error fetching slots:", error);
//     }
//   };

//   return (
//     <div className="w-full h-full p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Manage Availability</h2>

//       {/* Scheduled Meetings Table */}
//       {/* <ScheduledMeetingsTable role="learner" /> */}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {/* Available Slots List */}
//         <AvailableSlots slots={slots} />
//       </div>
//     </div>
//   );
// };

// export default MeetingManagement;
