import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { ISlot } from "../../../../types/meeting";
import { api } from "../../../../configs";
import { transformSlots } from "../../../../utils/transformer.util";
import { getUserProperty } from "../../../../utils/local-user.util";
import ScheduledMeetingsTable from "../../../shared/components/SheduledMeetingsTable";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const LearnerMeetingScheduling: React.FC = () => {
  const { progressId } = useParams();
  const [slots, setSlots] = useState<ISlot[]>([]);
  const { mentor } = useSelector((state: RootState) => state.learnings);
  // const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  console.log("slots", slots);
  // Fetch slots from API
  const fetchSlots = async () => {
    try {
      if (mentor) {
        const response = await api.get(`/api/slots/mentor/${mentor.id}`);
        setSlots(transformSlots(response.data));
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  // Handle slot booking
  const handleBookSlot = async (slotId: string) => {
    try {
      const learnerId = getUserProperty("id");
      await api.patch(`/api/slots/${slotId}/book`, { learnerId, progressId });
      alert("Slot booked successfully!");
      fetchSlots();
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white shadow-lg rounded-lg">
      {/* <h2 className="text-2xl font-semibold mb-4">Schedule a Meeting</h2> */}

      {/* Scheduled Meetings Table */}
      <ScheduledMeetingsTable role="learner" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Available Slots List */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Slots</h3>
          {slots.length > 0 ? (
            <ul className="list-disc pl-5">
              {slots.map((slot) => (
                <li key={slot.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <span>{` ${slot.time}`}</span>
                    {!slot.isBooked ? (
                      // Convert current time and compare with slot.time
                      Number(
                        new Date().toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                        })
                      ) >= Number(slot.time) ? (
                        // Disabled button for past or invalid time slot
                        <button
                          disabled
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg cursor-not-allowed"
                        >
                          Unavailable: Past Slot
                        </button>
                      ) : (
                        // Active "Book" button for future time slots
                        <button
                          onClick={() => handleBookSlot(slot.id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Book
                        </button>
                      )
                    ) : (
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-not-allowed">
                        N/A
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No available slots.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnerMeetingScheduling;
