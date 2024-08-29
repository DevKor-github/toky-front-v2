import { Flex } from '@/libs/design-system/flex';
import styled from 'styled-components';
import FreeModeCarousel from '../FreeModeCarousel';
import { DrawHistory } from './DrawHistory';
import { Icon } from '@/libs/design-system/icons';
import { DrawGift, DrawGiftItem, MyDrawGifts } from '@/libs/apis/tickets';

interface DrawBoardProps {
  giftItems: DrawGiftItem[];
  myDraws: DrawGift[];
  tickets: number;
}

export function DrawBoard({ myDraws, tickets, giftItems }: DrawBoardProps) {
  return (
    <Wrapper>
      <Title>내 응모권</Title>
      <Flex $gap={4} style={{ marginTop: 4, marginBottom: 12 }} $align="center" $justify="center">
        <Icon.Ticket />
        <MyDraw>{tickets}</MyDraw>
      </Flex>
      <Title>내 응모 현황</Title>
      <CarouselWrapper>
        <FreeModeCarousel padding="16px" spaceBetween={16}>
          {giftItems.map((item) => {
            const myDrawItem = myDraws.find((draw) => draw.giftId === item.id);
            return <DrawHistory key={item.id} name={item.name} usedDraw={myDrawItem?.count ?? 0} />;
          })}
        </FreeModeCarousel>
      </CarouselWrapper>
      <Flex $direction="column" $justify="center"></Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 16px;
  width: 100%;
  position: relative;
`;

const CarouselWrapper = styled.div`
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 8px;
  width: 100%;
`;

const Title = styled.h5`
  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.56px;
`;

const MyDraw = styled.p`
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.96px;
`;
