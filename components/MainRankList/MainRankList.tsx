import { useGetMyRank } from '@/libs/apis/rank';
import ActionButton from '@/components/ActionButton';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';

import styled from 'styled-components';

export function MainRankList() {
  const { data: myRank } = useGetMyRank();
  return (
    <Wrapper>
      <RankHeader>
        <RankTitle>적중률 랭킹</RankTitle>
        <ActionButton color="var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.60))" fontSize="14px">
          <Flex $gap={4} $align="center">
            자세히보기
            <Icon.ChevronForward />
          </Flex>
        </ActionButton>
      </RankHeader>
      <RankContainer>
        <MyRankContainer>
          <RankInfo>
            <Rank>{myRank?.rank}</Rank>
            <UserInfo>
              <MyRankText>내 랭킹</MyRankText>
              <Username>{myRank?.name}</Username>
            </UserInfo>
          </RankInfo>
          <CorrectAnswerPercentage>{myRank?.correctAnswerPercentage}%</CorrectAnswerPercentage>
        </MyRankContainer>
      </RankContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
  padding: 0 14px 0 20px;
  gap: 12px;
`;

const RankHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RankTitle = styled.div`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.8px;
`;

const RankContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: 10px;
  background: var(
    --Background-5,
    linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%),
    #121212
  );
`;

const MyRankContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const RankInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Rank = styled.div`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: -2px;
`;

const MyRankText = styled.div`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));

  /* Label2_r */
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.56px;
`;

const Username = styled.div`
  color: var(--_87, rgba(255, 255, 255, 0.87));

  /* Label1_b */
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: -0.64px;
`;

const CorrectAnswerPercentage = styled.div`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  text-align: right;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
