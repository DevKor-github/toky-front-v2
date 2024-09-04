import { Highlight } from '@/components/Signup/TermsAgreement/PersonalInfoTerm';
import styled from 'styled-components';

export function ServiceTerm() {
  return (
    <Wrapper>
      <Highlight>제 1조(목적)</Highlight>
      <Numbering>
        1.
        <p>
          본 약관은 TOKY가 운영하는 온라인 플랫폼 ‘toky.devkorclub’ 에서 제공하는 서비스(이하 ‘서비스’라 합니다)를
          이용자(이하 ‘이용자’라 합니다)가 이용함에 있어 당사자의 권리 의무 및 책임사항을 규정하는 것을 목적으로 합니다.
        </p>
      </Numbering>
      <Numbering>
        2.
        <p>PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 본 약관을 준용합니다.</p>
      </Numbering>
      <br />
      <Highlight>제 2조(제공하는 서비스)</Highlight>
      <p>‘TOKY’는 다음의 서비스를 제공합니다. </p>
      <Numbering>
        1.<p>직접 또는 제휴사와 공동으로 제공하는 이벤트 등 </p>
      </Numbering>
      <Numbering>
        2. <p>기타 ‘TOKY’가 정하는 업무</p>
      </Numbering>
      <br />
      <Highlight>제 3조(서비스의 중단 등)</Highlight>
      <Numbering>
        1.
        <p>
          ‘TOKY’가 제공하는 서비스는 9/9~10/5, 1일 24시간 제공을 원칙으로 합니다. 다만 시스템의 유지-보수를 위한 점검,
          통신장비의 교체 등 특별한 사유가 있는 경우 서비스의 전부 또는 일부에 대하여 일시적인 제공 중단이 발생할 수
          있습니다.
        </p>
      </Numbering>
      <Numbering>
        2.
        <p>
          ‘TOKY’는 전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가 발생하거나 발생할 우려가 있는 경우,
          전기통신사업법에 의한 기간통신사업자가 전기통신서비스를 중지하는 등 부득이한 사유가 발생한 경우 서비스의 전부
          또는 일부를 제한하거나 중지할 수 있습니다.
        </p>
      </Numbering>
      <br />
      <Highlight>제 4조(회원가입)</Highlight>
      <Numbering>
        1.
        <p>
          ‘TOKY’가 정한 양식에 따라 ‘이용자’가가 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써
          회원가입을 신청합니다.
        </p>
      </Numbering>
      <Numbering>
        2.
        <div>
          <p>‘TOKY’는 전항에 따라 회원가입을 신청한 ‘이용자’중 다음 각호의 사유가 없는 한 ‘회원’으로 등록합니다. </p>
          <Numbering>
            a.
            <p>회원으로 등록하는 것이 ‘TOKY’의 운영에 현저한 지장을 초래하는 것으로 인정되는 경우</p>
          </Numbering>
        </div>
      </Numbering>
      <Numbering>
        3.
        <p>회원가입 시기는 ‘TOKY’의 가입승낙 안내가 ‘회원’에게 도달한 시점으로 합니다.</p>
      </Numbering>
      <br />
      <Highlight>제 5조(회원탈퇴 및 자격상실 등)</Highlight>
      <Numbering>
        1.
        <p>‘회원’은 ‘TOKY’에 언제든지 탈퇴를 요청할 수 있으며, ‘TOKY’는 지체없이 회원탈퇴 요청을 처리합니다. </p>
      </Numbering>
      <Numbering>
        2.
        <div>
          <p>다음 각호의 사유가 발생한 경우 ‘TOKY’의 자격을 제한 또는 정지시킬 수 있습니다.</p>
          <Numbering>
            a.
            <p>다른 이용자의 정상적인 이용을 방해하는 경우 </p>
          </Numbering>
          <Numbering>
            b.
            <p>관계법령 또는 본 약관에서 금지하는 행위를 한 경우</p>
          </Numbering>
        </div>
      </Numbering>
      <br />
      <Highlight>제 4조(이용자 및 회원의 의무)</Highlight>
      <Numbering>
        1.
        <p>
          ‘이용자’는 회원가입 신청 시 사실에 근거하여 신청서를 작성해야합니다. 허위, 또는 타인의 정볼르 등록한 경우
          ‘TOKY’에 대하여 일체의 권리를 주장할 수 없으며, ‘TOKY’는 이로 인하여 발생한 손해에 대하여 책임을 부담하지
          않습니다.
        </p>
      </Numbering>
      <Numbering>
        2.
        <p>‘이용자’는 본 약관에서 규정하는 사항과 기타 ‘TOKY’가 정한 제반 규정 및 공지사항을 준수하여야 합니다.</p>
      </Numbering>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & p {
    margin-left: 1px;
  }
`;
export const Numbering = styled.div`
  display: flex;
  gap: 2px;
`;
