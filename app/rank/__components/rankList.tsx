import React from 'react';
import styled from 'styled-components';

interface RankItem {
  rank: number;
  correctAnswerPercentage: number;
  name: string;
  university: number;
}

export default function RankList({
  data,
  currentUser,
  children,
}: {
  data: RankItem[];
  currentUser: string;
  children?: React.ReactNode;
}) {
  return (
    <RankListContainer>
      {data.map((item) => (
        <RankItem key={item.rank} $isCurrentUser={item.name === currentUser}>
          <RankInfo>
            <RankNumber>{item.rank}</RankNumber>
            <UserInfo>
              <University $university={item.university}>
                {item.university === 0 ? '고려대학교' : '연세대학교'}
              </University>
              <Username>{item.name}</Username>
            </UserInfo>
          </RankInfo>
          <CorrectAnswerPercentage>{item.correctAnswerPercentage}%</CorrectAnswerPercentage>
        </RankItem>
      ))}
      {children}
    </RankListContainer>
  );
}

const RankListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
`;

const RankItem = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: ${(props) => (props.$isCurrentUser ? 'rgba(255, 255, 255, 0.05)' : 'transparent')};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
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

const RankInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RankNumber = styled.div`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 56px;
`;
