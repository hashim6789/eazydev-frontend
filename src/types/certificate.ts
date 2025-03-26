import { UserBaseDetails } from "./User";

export interface CertificateData {
  id: string;
  progressId: string;
  course: {
    id: string;
    title: string;
  };
  mentor: UserBaseDetails;
  learner: UserBaseDetails;
  issueDate: number;
}
