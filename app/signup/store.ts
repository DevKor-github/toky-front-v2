import { create } from 'zustand';
import { SignupElements, SchoolType, SignupFormType } from '@/app/signup/constants';

interface SignupFormStore extends SignupFormType {
  setSchool: (select: SchoolType) => void;
  setNickname: (input: string) => void;
  setPhoneNumber: (input: string) => void;
}
export const useSignupForm = create<SignupFormStore>((set) => ({
  school: null,
  nickname: '',
  phoneNumber: '',
  setSchool: (select: SchoolType) => set({ school: select }),
  setNickname: (input: string) => set({ nickname: input }),
  setPhoneNumber: (input: string) => set({ phoneNumber: input }),
}));

interface ErrorStore {
  error: SignupElements | null;
  setError: (message: SignupElements) => void;
  clearError: () => void;
}
export const useSignupError = create<ErrorStore>((set) => ({
  error: null,
  setError: (code: SignupElements) => set({ error: code }),
  clearError: () => set({ error: null }),
}));
