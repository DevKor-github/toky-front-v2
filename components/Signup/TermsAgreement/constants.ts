export type TermsType = 'ServiceTerm' | 'PersonalInfoTerm';

export const TERMS_LIST: { key: TermsType; text: string; details: string }[] = [
  {
    key: 'ServiceTerm',
    text: '(필수) 서비스 이용약관 관련 전체 동의',
    details:
      '위원은 정당에 가입하거나 정치에 관여할 수 없다. 군사법원의 조직·권한 및 재판관의 자격은 법률로 정한다. 대통령이 임시회의 집회를 요구할 때에는 기간과 집회요구의 이유를 명시하여야 한다.',
  },
  {
    key: 'PersonalInfoTerm',
    text: '(필수) 개인정보 수집 및 이용 동의',
    details:
      '위원은 정당에 가입하거나 정치에 관여할 수 없다. 군사법원의 조직·권한 및 재판관의 자격은 법률로 정한다. 대통령이 임시회의 집회를 요구할 때에는 기간과 집회요구의 이유를 명시하여야 한다.',
  },
] as const;
