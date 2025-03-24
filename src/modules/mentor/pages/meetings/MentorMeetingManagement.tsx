import React, { useState, useEffect, useCallback } from "react";
import { ISlot } from "../../../../types/meeting";
import { api } from "../../../../configs";
import { SlotFormData } from "../../../../schemas";
import { getUserProperty } from "../../../../utils/local-user.util";
import SlotForm from "../../components/meetings/SlotForm";
import { transformSlots } from "../../../../utils/transformer.util";
import { showErrorToast, showSuccessToast } from "../../../../utils";
import ScheduledMeetingsTable from "../../../shared/components/SheduledMeetingsTable";
import AvailableSlots from "../../../shared/components/AvailableSlots";

const MentorMeetingManagement: React.FC = () => {
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [, setLoading] = useState<boolean>(false);

  // Fetch slots with useCallback for better dependency management
  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/slots");
      const transformedSlots = transformSlots(response.data); // Transforms slot data
      setSlots(transformedSlots);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showErrorToast("Failed to fetch slots. Please try again.");
      console.error("Error fetching slots:", error);
    }
  }, []);

  // Initial fetch on component mount
  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  // Handles adding a new slot
  const handleAddSlot = async (data: SlotFormData) => {
    try {
      const hour = parseInt(data.time.split(":")[0], 10);
      const newSlot = {
        mentorId: getUserProperty("id"),
        time: hour,
        isBooked: false, // Default value for a new slot
      };

      const response = await api.post("/api/slots", newSlot);
      if (response.status === 201) {
        showSuccessToast("The slot was created successfully.");
        fetchSlots();
      }
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Error adding the slot. Try again."
      );
      console.error("Error adding slot:", error);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Availability</h2>

      {/* Scheduled Meetings Table */}
      <ScheduledMeetingsTable role="mentor" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Available Slots List */}
        <AvailableSlots slots={slots} />

        {/* Slot Form to add new slots */}
        <SlotForm onSubmit={handleAddSlot} />
      </div>
    </div>
  );
};

export default MentorMeetingManagement;
