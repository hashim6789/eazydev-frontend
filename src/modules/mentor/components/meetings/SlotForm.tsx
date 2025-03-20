import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SlotFormData, slotSchema } from "../../../../schemas";

const SlotForm = ({ onSubmit }: { onSubmit: (data: SlotFormData) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SlotFormData>({
    resolver: zodResolver(slotSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Date Field */}

      <div>
        <label className="block text-gray-600 mb-1">Select Time:</label>
        <input
          type="time"
          className="w-full p-2 border rounded"
          {...register("time", {
            required: "Time is required.",
          })}
        />
        {errors.time && (
          <p className="text-red-500 text-sm">{errors.time.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Add Slot
      </button>
    </form>
  );
};

export default SlotForm;
