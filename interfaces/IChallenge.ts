import { IStudent } from "./IStudent";

export interface IChallenge {
  index: number;
  id: string;
  studentId: string;
  name: string;
  googleDriveFolder?: string;
  gradingStatus: "UNSUBMITTED" | "SUBMITTED" | "GRADE_PASSED" | "GRADE_FAILED";
  grade?: number;
  reviewerId?: string;
  student: IStudent;
  reviewer: IStudent;
}

export interface IChallengePaginateParams {
  page: number;
  size: number;
}
