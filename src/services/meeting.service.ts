import { api } from "../configs";
import { HttpStatusCode } from "axios";

interface JoinMeetingResponse {
  otherPeerId?: string;
}

export const joinMeeting = async (
  meetId: string,
  peerId: string
): Promise<JoinMeetingResponse | null> => {
  const response = await api.post<JoinMeetingResponse>(
    `/meetings/${meetId}/join`,
    { peerId }
  );

  if (response.status === HttpStatusCode.Ok) {
    return response.data;
  }

  throw new Error("Error joining meeting");
};
