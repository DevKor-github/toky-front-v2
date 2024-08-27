'use client';
import { Flex } from '@/libs/design-system/flex';
import styled from 'styled-components';

export function DrawPolicy() {
  const pointPolicy =
    '• 가입 시 100p 지급\n • 예측/랭킹 공유 시 매일 100p 지급 (최초 1회 300p 지급)\n• 승부 예측 참여 시 항목 당 50p 지급\n• 적중시 항목 당 100p 지급\n• 종목의 예측 항목 중 ';
  const policyDetail =
    '5개 맞히면 보너스 500p 지급\n4개 맞히면 보너스 300p 지급\n3개 맞히면 보너스 100p 지급\n(적중 포인트는 경기 당일 자정 전 지급)';
  const giftPayment =
    '• 2023.09.16 추첨 후, 회원가입 전화번호를 통해 개별 연락\n• 9월19일까지 미응답시, 당첨 자동 취소\n• 경품 지급 시 양교 학교 인증 필수 (*인증 불가 시 당첨 취소) \n• 부정한 방법으로 응모에 참여 시 당첨 취소';
  return (
    <Wrapper>
      <Flex $direction="column" $gap={26}>
        <Flex $direction="column" $gap={10}>
          <div className="title">응모 기간</div>
          <div className="content"> ~ 2023.09.15 23:59 (익일 추첨)</div>
        </Flex>
        <Flex $direction="column" $gap={10}>
          <div className="title">포인트 지급 방침</div>
          <div className="content">
            {pointPolicy}
            <div style={{ paddingLeft: 15 }}>{policyDetail}</div>
          </div>
        </Flex>
        <Flex $direction="column" $gap={10}>
          <div className="title">상품 지급 안내</div>
          <div className="content">{giftPayment}</div>
        </Flex>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #121212;
  padding: 43px 0px 53px 22px;

  .title {
    color: rgba(255, 255, 255, 0.6);
    font-family: Spoqa Han Sans Neo;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.6px;
  }

  .content {
    color: rgba(255, 255, 255, 0.6);
    font-family: Spoqa Han Sans Neo;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    white-space: pre-wrap;
  }
`;
