export interface IChallenge {
  id: string;
  studentId: string;
  name: string;
  googleDriveFolder?: string;
  gradingStatus: "UNSUBMITTED" | "SUBMITTED" | "GRADE_PASSED" | "GRADE_FAILED";
  grade?: number;
  reviewerId?: string;
}

export interface IChallengePaginateParams {
  page: number;
  size: number;
}
