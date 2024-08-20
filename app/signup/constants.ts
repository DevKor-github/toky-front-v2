export const TOTAL_PROGRESS = 4;

export type SchoolType = 'korea' | 'yonsei' | null;

export interface SignupFormType {
  school: SchoolType;
  nickname: string;
  phoneNumber: string;
  agreement: boolean;
}

export type SignupElements = keyof SignupFormType;
