export type TermsType = 'ServiceTerm' | 'PersonalInfoTerm';

export const TERMS_LIST: { key: TermsType; text: string }[] = [
  {
    key: 'ServiceTerm',
    text: '(필수) 서비스 이용약관 관련 전체 동의',
  },
  {
    key: 'PersonalInfoTerm',
    text: '(필수) 개인정보 수집 및 이용 동의',
  },
] as const;
