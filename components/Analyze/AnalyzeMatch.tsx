import { SelectionMap, SelectionType } from '@/libs/constants/sports';
import { Flex } from '@/libs/design-system/flex';
import styled from 'styled-components';
import { TOTAL_MATCH_LIST } from './constants';
import { BestPlayer } from './BestPlayer';
import Image from 'next/image';

export function AnalyzeMatch({ match }: { match: Exclude<SelectionType, 'All'> }) {
  const matchInfo = TOTAL_MATCH_LIST[SelectionMap[match]];
  const { koreaWin, yonseiWin, matchName } = matchInfo;
  const isKoreaWin = koreaWin > yonseiWin;

  return (
    <>
      <RecordWrapper $backgroundUrl="/image-proxy/test-5-0.png">
        <Flex $align="center" $direction="column">
          <Flex $gap={8} $direction="column" $align="center">
            <Subtitle>역대 전적</Subtitle>
            <Title>
              {matchName} 전적은 {isKoreaWin ? '고려대' : '연세대'}가 우세해요
            </Title>
          </Flex>
        </Flex>
        <InfoWrapper>
          <Flex $direction="column">
            <UnivName $isKorea={true}>고려대학교</UnivName>
            <KoreaWin>{koreaWin}승</KoreaWin>
          </Flex>
          <Flex $direction="column" $align="flex-end">
            <UnivName $isKorea={false}>연세대학교</UnivName>
            <YonseiWin>{yonseiWin}승</YonseiWin>
          </Flex>
        </InfoWrapper>
      </RecordWrapper>
      <BestPlayer match={match} />
    </>
  );
}

const RecordWrapper = styled.div<{ $backgroundUrl: string }>`
  height: 400px;
  position: relative;
  width: 100%;
  padding-top: 40px;
  background: url(${(props) => props.$backgroundUrl}) no-repeat center;
  background-size: cover;
`;

const TokyImage = styled(Image)`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const Subtitle = styled.h3`
  color: rgba(255, 255, 255, 0.38);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.56px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.8px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
  padding: 0 20px;
`;

const KoreaWin = styled.div`
  font-family: 'YoonA Meolijeongche2S Stencil Variable';
  font-size: 42px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.68px;
  background: var(--Red-Gradient-2, linear-gradient(90deg, #f3233c 0%, #f95b6e 100%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const YonseiWin = styled.div`
  text-align: right;
  font-family: 'YoonA Meolijeongche2S Stencil Variable';
  font-size: 42px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.68px;
  background: linear-gradient(90deg, rgba(91, 132, 255, 0.6) 0%, rgba(41, 72, 255, 0.6) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const UnivName = styled.div<{ $isKorea: boolean }>`
  color: ${({ $isKorea }) => ($isKorea ? '#D32C40' : 'rgba(41, 70, 246, 0.60)')};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.56px;
`;
