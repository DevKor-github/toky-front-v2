'use client';

import { DrawBoard } from '@/components/DrawBoard';
import DrawCard from '@/components/DrawCard';
import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import styled from 'styled-components';

export default function Draw() {
  const DUMMY_PRODUCT = [
    {
      id: 1,
      name: '애플워치 7',
      image: '/api/image-proxy/test-5-0.png',
      totalDraw: 100,
    },
    {
      id: 2,
      name: '스타벅스\n아메리카노 (10명)',
      image: '/api/image-proxy/test-5-0.png',
      totalDraw: 200,
    },
    {
      id: 3,
      name: '토키 3',
      image: '/api/image-proxy/test-5-0.png',
      totalDraw: 300,
    },
    {
      id: 4,
      name: '토키 4',
      image: '/api/image-proxy/test-5-0.png',
      totalDraw: 400,
    },
    {
      id: 5,
      name: '토키 5',
      image: '/api/image-proxy/test-5-0.png',
      totalDraw: 500,
    },
  ];
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
          style={{ background: 'linear-gradient(90deg, #c33def -12.75%, #672bf3 113.73%)' }}
        >
          <Flex>
            <Flex></Flex>
            <Flex $direction="column" $align="center" $gap={12}>
              <DrawBoard />
              <Flex $gap={3} $align="center">
                <Icon.Question />
                <InfoText>응모권은 어떻게 받을 수 있나요?</InfoText>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            $gap="28px 12px"
            style={{ paddingBottom: 32, paddingTop: 10 }}
            $wrap="wrap"
            $justify="center"
            $align="center"
          >
            {DUMMY_PRODUCT.map((product) => (
              <DrawCard key={product.id} onDraw={() => {}} totalDraw={product.totalDraw} productName={product.name} />
            ))}
          </Flex>
        </Flex>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
`;

const MyDrawBoard = styled.div``;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.48px;
`;
