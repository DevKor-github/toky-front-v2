import { Flex } from '@/libs/design-system/flex';
import Image from 'next/image';
import styled, { css } from 'styled-components';

export function OperationService() {
  return (
    <>
      <Wrapper $isOdd={true} style={{ padding: '50px 30px 0px 0px' }}>
        <BackgroudImage src="/image-proxy/test-5-0.png" $isOdd={true} width={230} height={241} alt="승부예측하기" />
        <Content $isOdd>
          <Flex $direction="column" $gap={20}>
            <Title>승부예측하기</Title>
            <Flex $direction="column">
              <Text>승부예측 탭에서 </Text>
              <Text>고려대-연세대 승리 예측하기</Text>
            </Flex>
          </Flex>
        </Content>
      </Wrapper>
      <Wrapper $isOdd={false} style={{ padding: '50px 0px 0px 50px' }}>
        <BackgroudImage src="/image-proxy/test-5-0.png" $isOdd={false} width={230} height={241} alt="승부예측하기" />
        <Content $isOdd={false}>
          <Flex $direction="column" $gap={20}>
            <Title>역대 전적확인하기</Title>
            <Flex $direction="column">
              <Text>정기전 역대 전적, 경기별 전적 등 </Text>
              <Text>정기전 관련 정보 확인하기</Text>
            </Flex>
          </Flex>
        </Content>
      </Wrapper>
      <Wrapper $isOdd={true} style={{ padding: '50px 30px 0px 0px' }}>
        <BackgroudImage src="/image-proxy/test-5-0.png" $isOdd={true} width={230} height={241} alt="승부예측하기" />
        <Content $isOdd>
          <Flex $direction="column" $gap={20}>
            <Title>선수정보 확인하기</Title>
            <Text>각 종목-학교별 출전선수 정보 보기</Text>
          </Flex>
        </Content>
      </Wrapper>
      <Wrapper $isOdd={false} style={{ padding: '50px 0px 0px 50px' }}>
        <BackgroudImage src="/image-proxy/test-5-0.png" $isOdd={false} width={230} height={241} alt="승부예측하기" />
        <Content $isOdd={false}>
          <Flex $direction="column" $gap={20}>
            <Title>응모권으로 경품응모</Title>
            <Flex $direction="column">
              <Text>경품응모 탭에서 </Text>
              <Text>응모권을 사용해 경품 응모하기</Text>
            </Flex>
          </Flex>
        </Content>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div<{ $isOdd: boolean }>`
  height: 240px;
  position: relative;
  background: ${({ $isOdd }) =>
    $isOdd
      ? 'var(--Background-5, linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #121212)'
      : '#121212'};
`;

const BackgroudImage = styled(Image)<{ $isOdd: boolean }>`
  position: absolute;

  bottom: 0;
  ${({ $isOdd }) =>
    $isOdd
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
`;

const Title = styled.h2`
  color: #fff;
  text-align: center;
  font-family: 'Happiness Sans';
  font-size: 22px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: -0.9px;
`;

const Text = styled.div`
  color: #fff;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.56px;
`;

const Content = styled.div<{ $isOdd: boolean }>`
  position: relative;
  display: flex;
  justify-content: ${({ $isOdd }) => ($isOdd ? 'flex-end' : 'flex-start')};
`;
