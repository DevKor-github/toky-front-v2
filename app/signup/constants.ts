export const TOTAL_PROGRESS = 3;

export type SchoolType = 'korea' | 'yonsei' | null;

export interface SignupFormType {
  school: SchoolType;
  nickname: string;
  phoneNumber: string;
}

export type SignupElements = keyof SignupFormType;
