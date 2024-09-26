import { useGetMyRank } from '@/libs/apis/rank';
import ActionButton from '@/components/ActionButton';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import Link from 'next/link';
import { useGetRankInfiniteScroll } from '@/libs/apis/rank';

import styled from 'styled-components';

export function MainRankList() {
  const { data: myRank } = useGetMyRank();
  const { data: rankList } = useGetRankInfiniteScroll(3, 'top-rank');

  const flattenRankList = rankList?.pages.flatMap((page) => page.data) ?? [];

  return (
    <Wrapper>
      <RankHeader>
        <RankTitle>적중률 랭킹</RankTitle>
        <ActionButton color="var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.60))" fontSize="14px">
          <Details href="/rank">
            <Flex $gap={4} $align="center">
              자세히보기
              <Icon.ChevronForward />
            </Flex>
          </Details>
        </ActionButton>
      </RankHeader>
      <RankContainer>
        <MyRankContainer>
          <RankInfo>
            <Rank $digits={myRank ? myRank.rank.toString().length : 0}>{myRank?.rank}</Rank>
            <UserInfo>
              <MyRankText>내 랭킹</MyRankText>
              <Username>{myRank?.name}</Username>
            </UserInfo>
          </RankInfo>
          <CorrectAnswerPercentage>{myRank ? Math.round(myRank.correctAnswerPercentage) : ''}%</CorrectAnswerPercentage>
        </MyRankContainer>
        <Icon.MainRankListStroke $width={(window.innerWidth - 80).toString()} />
        <RankListContainer>
          {flattenRankList?.map((item, index) => (
            <RankItemContainer key={item.rank} $isCurrentUser={item.name === myRank?.name}>
              <RankInfo>
                <Rank $digits={item.rank.toString().length}>{item.rank}</Rank>
                <UserInfo>
                  <University $university={item.university}>
                    {item.university === 0 ? '고려대학교' : '연세대학교'}
                  </University>
                  <Username>{item.name}</Username>
                </UserInfo>
              </RankInfo>
              <CorrectAnswerPercentage>{Math.round(item.correctAnswerPercentage)}%</CorrectAnswerPercentage>
            </RankItemContainer>
          ))}
        </RankListContainer>
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
  margin-right: 6px;
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

const fontSizeMap: { [key: number]: number } = {
  1: 24,
  2: 22,
  3: 20,
  4: 18,
};

const Rank = styled.div<{ $digits: number }>`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: ${(props) => fontSizeMap[props.$digits] || 18}px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 56px;
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
  height: 24px;
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

const RankListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RankItemContainer = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const University = styled.div<{ $university: number }>`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.52px;
  color: ${(props) => (props.$university === 0 ? 'var(--Light-Red, #F95B6E)' : 'var(--Light-Blue, #5988FF)')};
`;

const Details = styled(Link)`
  color: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));
  text-align: right;

  /* Label2_r */
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.56px;
`;
