import { Flex } from '@/libs/design-system/flex';
import styled from 'styled-components';
import FreeModeCarousel from '../FreeModeCarousel';
import { DrawHistory } from './DrawHistory';
import { Icon } from '@/libs/design-system/icons';

export function DrawBoard() {
  const DUMMY = [
    {
      id: 1,
      name: '애플워치 7',
      usedDraw: 100,
    },
    {
      id: 2,
      name: '에어팟 프로',
      usedDraw: 200,
    },
    {
      id: 3,
      name: '코닥 미니샷',
      usedDraw: 300,
    },
    {
      id: 4,
      name: '배달의민족',
      usedDraw: 400,
    },
    {
      id: 5,
      name: '토키 5',
      usedDraw: 500,
    },
  ];
  return (
    <Wrapper>
      <Title>내 응모권</Title>
      <Flex $gap={4} style={{ marginTop: 4, marginBottom: 12 }} $align="center" $justify="center">
        <Icon.Ticket />
        <MyDraw>10장</MyDraw>
      </Flex>
      <Title>내 응모 현황</Title>
      <CarouselWrapper>
        <FreeModeCarousel padding="16px" spaceBetween={16}>
          {DUMMY.map((item) => (
            <DrawHistory key={item.id} name={item.name} usedDraw={item.usedDraw} />
          ))}
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
  width: 348px;
`;

const CarouselWrapper = styled.div`
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 8px;
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
