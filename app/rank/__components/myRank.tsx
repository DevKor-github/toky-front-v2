import styled from 'styled-components';
import Link from 'next/link';
import ActionButton from '@/components/ActionButton';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import type { RankItem } from '@/libs/apis/rank';

interface MyRankProps {
  shareHandler: () => void;
  myRank: RankItem | undefined;
}

export default function MyRank({ shareHandler, myRank }: MyRankProps) {
  return (
    <Wrapper>
      <MyRankContainer>
        <MyRankText>{myRank?.name}님의 랭킹</MyRankText>
        <MyRankDetail>
          <MyRankInfo>
            <MyRankNumber>{myRank?.rank}</MyRankNumber>
            <MyRankText>등</MyRankText>
          </MyRankInfo>
          <Icon.RankStroke />
          <MyCorrectAnswerPercentageInfo>
            <MyCorrectAnswerPercentageNumber>{myRank?.correctAnswerPercentage}</MyCorrectAnswerPercentageNumber>
            <MyCorrectAnswerPercentageText>% 적중</MyCorrectAnswerPercentageText>
          </MyCorrectAnswerPercentageInfo>
        </MyRankDetail>
        <Flex $gap="6px">
          <Link href="/bets">
            <ActionButton color="white" bgColor="#FFFFFF26" fontSize="14px" padding="8px 16px" borderRadius="99px">
              예측 결과보기
            </ActionButton>
          </Link>
          <ActionButton
            color="white"
            bgColor="linear-gradient(90deg, rgba(134, 0, 240, 0.80) -12.75%, rgba(70, 0, 183, 0.80) 113.73%)"
            fontSize="14px"
            padding="8px 16px"
            borderRadius="99px"
            fontWeight="700"
            onClick={shareHandler}
          >
            내 랭킹 공유하기
          </ActionButton>
        </Flex>
      </MyRankContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.navigationBarHeight + 12}px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MyRankContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 15px 0px;
  margin: 0 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: var(
    --Background-5,
    linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%),
    #121212
  );
`;

const MyRankDetail = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

const MyRankInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const MyRankNumber = styled.div`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  text-align: center;

  /* Display0 */
  font-family: 'Spoqa Han Sans Neo';
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1px;
`;

const MyRankText = styled.div`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.64px;
`;

const MyCorrectAnswerPercentageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MyCorrectAnswerPercentageNumber = styled.div`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  text-align: center;

  /* Display0 */
  font-family: 'Spoqa Han Sans Neo';
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1px;
`;

const MyCorrectAnswerPercentageText = styled.div`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.64px;
`;
