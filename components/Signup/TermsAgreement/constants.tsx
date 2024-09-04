import { PersonalInfoTerm } from '@/components/Signup/TermsAgreement/PersonalInfoTerm';
import { ServiceTerm } from '@/components/Signup/TermsAgreement/ServiceTerm';

export type TermsType = 'ServiceTerm' | 'PersonalInfoTerm';

export const TERMS_LIST: { key: TermsType; text: string; details: () => JSX.Element }[] = [
  {
    key: 'ServiceTerm',
    text: '(필수) 서비스 이용약관 관련 전체 동의',
    details: () => <ServiceTerm />,
  },
  {
    key: 'PersonalInfoTerm',
    text: '(필수) 개인정보 수집 및 이용 동의',
    details: () => <PersonalInfoTerm />,
  },
] as const;
