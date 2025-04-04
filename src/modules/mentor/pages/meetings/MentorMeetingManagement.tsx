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
import { SlotMessages } from "../../../../constants/SlotMessages.contant";

const MentorMeetingManagement: React.FC = () => {
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [, setLoading] = useState<boolean>(false);

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/slots");
      const transformedSlots = transformSlots(response.data); // Transforms slot data
      setSlots(transformedSlots);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      showErrorToast(error.response.data.error || SlotMessages.ERROR.FETCH);
      console.error(SlotMessages.ERROR.FETCH, error);
    }
  }, []);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const handleAddSlot = async (data: SlotFormData) => {
    try {
      const hour = parseInt(data.time.split(":")[0], 10);
      const newSlot = {
        mentorId: getUserProperty("id"),
        time: hour,
        isBooked: false,
      };

      const response = await api.post("/slots", newSlot);
      if (response.status === 201) {
        showSuccessToast(SlotMessages.SUCCESS.CREATE);
        fetchSlots();
      }
    } catch (error: any) {
      showErrorToast(error.response.data.error || SlotMessages.ERROR.CREATE);
      console.error(SlotMessages.ERROR.CREATE, error);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Availability</h2>

      <ScheduledMeetingsTable role="mentor" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AvailableSlots slots={slots} />

        <SlotForm onSubmit={handleAddSlot} />
      </div>
    </div>
  );
};

export default MentorMeetingManagement;
