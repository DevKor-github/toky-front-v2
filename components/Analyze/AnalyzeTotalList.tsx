'use client';

import styled from 'styled-components';
import AnalyzeItem from './AnalyzeTotalItem';
import Image from 'next/image';
import { TOTAL_MATCH_LIST } from './constants';

export default function AnalyzeTotalList() {
  const matchList = TOTAL_MATCH_LIST;

  return (
    <Wrapper>
      <BackgroundImageWrapper>
        <BackgroundImageContent>
          <KoreaLogo src="/api/image-proxy/test-5-0.png" width={288} height={289} alt={'Korea Univ Logo'} />
          <YonseiLogo src="/api/image-proxy/test-5-0.png" width={292} height={295} alt={'Yonsei Univ Logo'} />
        </BackgroundImageContent>
      </BackgroundImageWrapper>
      {matchList.map((match) => (
        <AnalyzeItem
          key={match.matchName}
          matchName={match.matchName}
          koreaWin={match.koreaWin}
          yonseiWin={match.yonseiWin}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  align-items: center;
  background-color: #121212;
  overflow: hidden;
`;

const BackgroundImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 60px;
`;

const BackgroundImageContent = styled.div`
  position: relative;
  width: 100%;
`;

const KoreaLogo = styled(Image)`
  position: absolute;
  left: -150px;
`;

const YonseiLogo = styled(Image)`
  position: absolute;
  right: -160px;
  top: 189px;
`;
