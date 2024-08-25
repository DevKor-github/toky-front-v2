import { create } from 'zustand';

export interface Profile {
  name: string;
  university: number;
  phoneNumber: string;
  inviteCode: string;
}

interface ProfileStore {
  profile: Profile | null;
  setProfile: (props: Profile) => void;
}

export const useProfileStore = create<ProfileStore>()((set) => ({
  profile: null,
  setProfile: (profile: Profile) => {
    set({ profile });
  },
}));
