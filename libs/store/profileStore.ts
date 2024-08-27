import { create } from 'zustand';

export interface Profile {
  name: string;
  university: number;
  phoneNumber: string;
  inviteCode: string;
}

export interface ProfileStore {
  profile: Profile | null;
  setProfile: (props: Profile) => void;
}

export const createProfileStore = () => {
  return create<ProfileStore>()((set) => ({
    profile: null,
    setProfile: (profile: Profile) => {
      set({ profile });
    },
  }));
};
