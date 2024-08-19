import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';

import { useSignupForm } from '@/app/signup/store';
import { Check } from '@/libs/design-system/icons/Check';
import { TERMS_LIST, TermsType } from '@/components/Signup/TermsAgreement/constants';
import { TermButton } from '@/components/Signup/TermsAgreement/TermButton';

export function TermsAgreement() {
  const agreement = useSignupForm((state) => state.agreement);
  const setAgreement = useSignupForm((state) => state.setAgreement);

  const [terms, setTerms] = useState<{ [key in TermsType]: boolean }>({ ServiceTerm: false, PersonalInfoTerm: false });

  useEffect(() => {
    let allChecked = true;
    Object.values(terms).map((val) => {
      if (!val) {
        allChecked = false;
      }
    });

    if (allChecked) {
      setAgreement(true);
    } else {
      setAgreement(false);
    }
  }, [terms, setAgreement]);

  const handleTermAgree = useCallback((target: TermsType) => {
    setTerms((prev) => ({ ...prev, [target]: !prev[target] }));
  }, []);

  return (
    <Wrapper>
      <Guide>
        <p>경품 지급을 위해 필요해요</p>
        <h2>
          <strong>약관</strong>에 동의해주세요.
        </h2>
      </Guide>
      <ButtonsLayout>
        <TotalButton
          $selected={agreement}
          onClick={() => {
            if (agreement) {
              setAgreement(false);
              setTerms({ PersonalInfoTerm: false, ServiceTerm: false });
            } else {
              setAgreement(true);
              setTerms({ PersonalInfoTerm: true, ServiceTerm: true });
            }
          }}
        >
          <Check opacity={agreement ? 0.87 : 0.38} />
          약관 전체 동의
          <ButtonBackground />
        </TotalButton>
        <TermButtonLayout>
          {TERMS_LIST.map((term) => (
            <TermButton
              key={term.key}
              text={term.text}
              details={term.details}
              selected={terms[term.key]}
              onClick={() => handleTermAgree(term.key)}
            />
          ))}
        </TermButtonLayout>
      </ButtonsLayout>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;
const Guide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  color: var(--_60, rgba(255, 255, 255, 0.6));

  & p {
    font-size: 12px;
    font-weight: 300;
    letter-spacing: -0.48px;
  }
  & h2 {
    font-size: 22px;
    letter-spacing: -0.88px;
    & strong {
      color: var(--white_0, #fff);
    }
  }
`;

const ButtonsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TotalButton = styled.button<{ $selected: boolean }>`
  position: relative;
  overflow: hidden;
  height: 51px;
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 0 16px;

  background: ${({ $selected }) => $selected && 'var(--Purple, #4C0EB0)'};
  transition: background 0.2s;

  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-size: 15px;
  letter-spacing: -0.6px;
`;
const ButtonBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;

  background: var(
    --Background-5,
    linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%),
    #121212
  );
`;

const TermButtonLayout = styled.div`
  padding: 0 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;
