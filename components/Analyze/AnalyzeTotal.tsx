'use client';

import styled from 'styled-components';
import AnalyzeTotalList from './AnalyzeTotalList';
import { CheerUniversity } from './CheerUniversity';

export function AnalyzeTotal() {
  return (
    <>
      <Wrapper>
        <TitleContainer>역대 정기전 종합 성적</TitleContainer>
        <Divider top={68} />
        <HistoryContainer>
          <div>
            <HistoryTitle>고려대학교</HistoryTitle>
            <HistoryWin> 20승</HistoryWin>
          </div>
          <div>
            <HistoryTitle>무승부</HistoryTitle>
            <HistoryWin> 10</HistoryWin>
          </div>
          <div>
            <HistoryTitle>연세대학교</HistoryTitle>
            <HistoryWin>21승</HistoryWin>
          </div>
        </HistoryContainer>
        <Divider top={84} />
      </Wrapper>
      <AnalyzeTotalList />
      <CheerUniversity />
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 43px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.8px;
`;

const HistoryContainer = styled.div`
  display: flex;
  color: white;
  padding-top: 13px;
  padding-bottom: 10px;
  align-items: center;
  text-align: center;

  width: 242px;
  justify-content: space-between;
`;
const HistoryTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.72px;
`;
const HistoryWin = styled.div`
  -webkit-text-stroke-width: 0.5;
  -webkit-text-stroke-color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));

  font-weight: 700;
  font-size: 30px;
  line-height: 38px;
  letter-spacing: -3px;
`;

const Divider = styled.div<{ top: number }>`
  width: 350px;
  height: 0px;
  top: ${({ top }) => top}px;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;
