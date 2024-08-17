import { SelectionType } from '@/libs/constants/sports';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import Image from 'next/image';
import styled from 'styled-components';

interface MatchInfoProps {
  match: SelectionType;
}

export function MatchInfo({ match }: MatchInfoProps) {
  //TODO : match 정보를 받아와서 렌더링
  return (
    <Flex $direction="column" $justify="center" $align="center" $gap={19}>
      <ProgressInfo>
        <Icon.Dot />
        예측 진행 중
      </ProgressInfo>
      <Flex $gap={12} $align="center">
        <Flex $gap={4} $align="center">
          <Text>고려대학교</Text>
          <Image src="/api/image-proxy/test-5-0.png" alt="고려대학교" width={42} height={42} />
        </Flex>
        <Flex $align="center" $justify="center" $direction="column">
          <Text
            style={{
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: '-0.72px',
            }}
          >
            9/27 (금)
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 0,
            }}
          >
            14:30
          </Text>
        </Flex>
        <Flex $gap={4} $align="center">
          <Image src="/api/image-proxy/test-5-0.png" alt="고려대학교" width={42} height={42} />
          <Text>연세대학교</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

const ProgressInfo = styled.div`
  display: flex;
  padding: 3px 12px;
  align-items: center;
  text-align: center;
  gap: 4px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.white87};
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.48px;
  color: ${({ theme }) => theme.colors.white87};
`;

const Text = styled.div`
  color: white;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.56px;
`;
