export interface ISlot {
  id: string;
  mentor: {
    id: string;
    firstName: string;
    lastName: string;
  };
  time: string;
  isBooked: boolean;
}

export interface IMeeting {
  id: string;
  course: { id: string; title: string };
  learner: { firstName: string; lastName: string; id: string };
  mentor: { firstName: string; lastName: string; id: string };
  roomId: string;
  slot: { time: number };
}
