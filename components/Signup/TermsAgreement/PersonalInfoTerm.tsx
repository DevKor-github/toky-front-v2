import { Numbering } from '@/components/Signup/TermsAgreement/ServiceTerm';
import styled from 'styled-components';

export function PersonalInfoTerm() {
  return (
    <div>
      <p>
        TOKY는 개인정보보호법 등 관련법령상의 개인정보보호규정을 준수하며 귀하의 개인정보보호에 최선을 다하고 있습니다.
        개인정보보호법에 근거하여 다음과 같은 내용으로 개인정보를 수집 및 처리하고자 안내 드리오니 확인하여 주시기
        바랍니다.
      </p>
      <br />
      <Heading>제1조(개인정보 수집 및 이용목적)</Heading>
      <p>이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 목적 이외의 용도로는 사용되지 않습니다.</p>
      <Highlight>- 경품 제공</Highlight>
      <br />
      <Heading>제2조(개인정보 수집 및 이용 항목)</Heading>
      <p>TOKY는 개인정보 수집 목적을 위하여 다음과 같은 정보를 수집합니다.</p>
      <Highlight>- 전화번호</Highlight>
      <br />
      <Heading>제3조(개인정보 보유 및 이용기간)</Heading>
      <Numbering>
        1.
        <p>수집한 개인정보는 수집-이용 동의일로부터 개인정보 수집-이용 목적을 달성할 때까지 보관 및 이용합니다.</p>
      </Numbering>
      <Numbering>
        2.
        <p>
          개인정보 보유기간의 경과, 처리목적의 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
          파기합니다.
        </p>
      </Numbering>
      <br />
      <Heading>제4조(동의 거부 관리)</Heading>
      <p>
        귀하는 본 안내에 따른 개인정보 수집-이용에 대하여 동의를 거부할 권리가 있습니다. 다만, 귀하가 개인정보 동의를
        거부하시는 경우에 경품 미지급의 불이익이 발생할 수 있음을 알려드립니다.
      </p>
    </div>
  );
}

export const Heading = styled.h2`
  color: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));

  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.48px;
`;

export const Highlight = styled.strong`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));

  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.48px;
`;
