'use client';

import { DrawBoard } from '@/components/DrawBoard';
import DrawCard from '@/components/DrawCard';
import { DrawPolicy } from '@/components/DrawPolicy/DrawPolicy';
import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import { useGetGiftItems, useGetMyTicketsUse, useGetTickets } from '@/libs/apis/tickets';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import { useAuthStore } from '@/libs/store/Providers/AuthStoreProvider';
import { useTicketStore } from '@/libs/store/Providers/TicketStoreProvider';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Draw() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const { setTickets, tickets } = useTicketStore((state) => state);
  const { refetch: refetchTickets, data: queriedTickets } = useGetTickets();
  const { refetch: refetchMyTicketsUse, data: myTicketsUse } = useGetMyTicketsUse();
  const { data: giftItems } = useGetGiftItems();
  const [canDraw, setCanDraw] = useState(false);

  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  useEffect(() => {
    if (queriedTickets) {
      setTickets(queriedTickets);
    }
  }, [queriedTickets, setTickets]);

  useEffect(() => {
    if (isLogin) {
      refetchTickets();
      refetchMyTicketsUse();
    }
  }, [isLogin, refetchTickets, refetchMyTicketsUse]);

  useEffect(() => {
    if (tickets > 0) {
      setCanDraw(true);
    } else {
      setCanDraw(false);
    }
  }, [tickets]);

  return (
    <div>
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <Flex
          $direction="column"
          $gap="32px"
          $justify="center"
          $align="center"
          style={{
            background: 'linear-gradient(90deg, #c33def -12.75%, #672bf3 113.73%)',
            padding: '32px 20px 0px 20px',
            position: 'relative',
          }}
        >
          <Flex $direction="column" $align="center" $gap={20} style={{ width: '100%' }}>
            <Flex $direction="column" $align="center" $gap={1}>
              <Subtitle>2024 토키 경품응모</Subtitle>
              <Title>여러번 응모할수록, 높아지는 당첨확률!</Title>
            </Flex>
            <Flex $direction="column" $align="center" $gap={12} style={{ width: '100%' }}>
              <DrawBoard myDraws={myTicketsUse ?? []} giftItems={giftItems ?? []} tickets={tickets} />
              <Flex $gap={3} $align="center">
                <Icon.Question />
                <InfoText onClick={scrollToBottom}>응모권은 어떻게 받을 수 있나요?</InfoText>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            $gap="28px 12px"
            style={{ paddingBottom: 32, paddingTop: 10, width: '100%' }}
            $wrap="wrap"
            $justify="center"
            $align="center"
          >
            {giftItems &&
              giftItems.map((gift) => (
                <DrawCard
                  key={gift.id}
                  id={gift.id}
                  canDraw={canDraw}
                  totalDraw={gift.count}
                  productName={gift.name}
                  imgUrl={gift.photoUrl}
                  productAlias={gift.alias}
                  isDone={true}
                />
              ))}
          </Flex>
        </Flex>
        <DrawPolicy />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.48px;
`;

const Title = styled.h1`
  text-align: center;
  text-shadow: 0px 2px 10px rgba(166, 20, 255, 0.5);
  font-family: 'HS-Regular';
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.96px;
  color: white;
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.white60};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.56px;
`;
