import { ISlot } from "../types/meeting";

export function transformSlots(slots: any[]): ISlot[] {
  const res = slots.map((item) => {
    const time =
      item.time > 12 ? `${item.time % 12} : 00 PM` : `${item.time} : 00 AM`;
    return {
      id: item.id as string,
      mentor: item.mentor as {
        id: string;
        firstName: string;
        lastName: string;
      },
      time: time as string,
      isBooked: item.isBooked as boolean,
    };
  });
  return res;
}
