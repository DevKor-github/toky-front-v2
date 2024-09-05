'use client';
import { Flex } from '@/libs/design-system/flex';
import styled from 'styled-components';

export function DrawPolicy() {
  const everyDayTicket =
    '• 출석체크 시 매일 1개\n• 출석체크 문제 정답 시 1개\n• 승부예측 결과 인스타 공유 시 매일 1개 ';
  const onlyOneTicket = '• 승부예측 완료 시 문항 당 1개\n• 초대 링크를 통해 가입 시 친구랑 나 둘 다 5개';
  const endTicket = '• 승부예측 적중 시 문제 당 3개\n• 한 종목 전부 적중 시 2배 지급 보너스';
  const giftPayment =
    '• 2024.10.06 추첨 후, 회원가입 전화번호를 통해 개별 연락\n• 2024.10.08 까지 미 응답시, 당첨 자동 취소';
  return (
    <Wrapper>
      <Flex $direction="column" $gap={30}>
        <Flex $direction="column" $gap={15}>
          <Flex $direction="column" $gap={10}>
            <div className="title">응모 기간</div>
            <div className="content">2024.09.09 ~ 2024.10.05 23:59 (익일 추첨)</div>
          </Flex>
          <Flex $direction="column" $gap={10}>
            <div className="title">매일 얻을 수 있어요!</div>
            <div className="content">{everyDayTicket}</div>
          </Flex>
          <Flex $direction="column" $gap={10}>
            <div className="title">한번만 얻을 수 있어요!</div>
            <div className="content">{onlyOneTicket}</div>
          </Flex>

          <Flex $direction="column" $gap={10}>
            <div className="title"> 정기전 종료 후 얻을 수 있어요!</div>
            <div className="content">{endTicket}</div>
          </Flex>
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
