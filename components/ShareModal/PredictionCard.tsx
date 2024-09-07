'use client';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import { ForwardedRef, forwardRef, use, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { DRAW_IMAGE_LIST, KOREA_WIN_IMAGE_LIST, YONSEI_WIN_IMAGE_LIST } from './constants';

type PredictionResult = 'KOREA' | 'YONSEI' | 'DRAW';

interface PredictionCardProps {
  nickname: string;
  numWinKorea: number;
  numWinYonsei: number;
}
export function PredictionCardFC(
  { nickname, numWinKorea, numWinYonsei }: PredictionCardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const predictionResult = numWinKorea > numWinYonsei ? 'KOREA' : numWinKorea == numWinYonsei ? 'DRAW' : 'YONSEI';
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    setIsLoaded(false);
    const charaterSrcList =
      predictionResult === 'KOREA'
        ? KOREA_WIN_IMAGE_LIST
        : predictionResult === 'YONSEI'
          ? YONSEI_WIN_IMAGE_LIST
          : DRAW_IMAGE_LIST;
    const randomIndex = Math.floor(Math.random() * charaterSrcList.length);
    setSrc(charaterSrcList[randomIndex]);
    setIsLoaded(true);
  }, [predictionResult]);

  return (
    <>
      {src && isLoaded && (
        <ShareCardWrapper ref={ref}>
          <ShareCard $predictionResult={predictionResult}>
            <UserContainer $predictionResult={predictionResult}>{nickname}님의 예측</UserContainer>
            <ScoreContainer>
              <UnivName>고려대학교</UnivName>
              <Flex $gap={8} $align="center">
                <ScoreBox $predictionResult={predictionResult}>{numWinKorea}</ScoreBox>
                <Colon>:</Colon>
                <ScoreBox $predictionResult={predictionResult}>{numWinYonsei}</ScoreBox>
              </Flex>
              <UnivName>연세대학교</UnivName>
            </ScoreContainer>
            <ShareFooter>
              <p>2024 정기전 승부예측 토키</p>
              <Icon.Divider />
              <p>@official.toky</p>
            </ShareFooter>
            <CharacterImage src={src} alt="character" />
          </ShareCard>
        </ShareCardWrapper>
      )}
    </>
  );
}

export default forwardRef(PredictionCardFC);

const CharacterImage = styled.img`
  width: 289px;
  vertical-align: 'bottom';
  z-index: 1000;
  border-radius: 15px;
  position: absolute;
  bottom: 0%;
`;

const UserContainer = styled.div<{ $predictionResult: PredictionResult }>`
  z-index: 1002;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 207px;
  height: 26px;
  border-radius: 26px;
  margin-top: 30px;
  line-height: 27px;
  background: ${({ theme }) => theme.colors.white60};
  text-align: center;
  ${(props) => {
    if (props.$predictionResult === 'KOREA')
      return css`
        color: #f3233c;
      `;
    else if (props.$predictionResult === 'YONSEI')
      return css`
        color: #2948ff;
      `;
    else
      return css`
        color: #4c0eb0;
      `;
  }}
`;

const ScoreContainer = styled.div`
  z-index: 1001;
  width: 220px;
  position: absolute;
  top: 13%;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ShareCard = styled.div<{ $predictionResult: PredictionResult }>`
  position: relative;
  border-radius: 15px;
  width: 289px;
  height: 430px;
  flex-shrink: 0;
  color: white;
  background-color: transparent;
  ${(props) => {
    if (props.$predictionResult === 'KOREA')
      return css`
        //background: linear-gradient(180deg, #f84853 0%, #ffb1b1 100%);
        color: #f3233c;
      `;
    else if (props.$predictionResult === 'YONSEI')
      return css`
        //background: linear-gradient(180deg, #8bd5ff 0%, #445fff 100%);
        color: #2948ff;
      `;
    else
      return css`
        //background: linear-gradient(360deg, #d0b2ff 0%, #7e41ff 100%, #6e2bff 100%);
        color: #4c0eb0;
      `;
  }}
  & h3 {
    font-size: 14px;
    font-family: Spoqa Han Sans Neo;
    font-weight: 500;
    letter-spacing: -0.56px;
    text-align: center;
  }
`;

const UnivName = styled.p`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.48px;
  color: white;
`;

const Colon = styled.h1`
  text-align: center;
  font-size: 35px;
  font-weight: 700;
  text-shadow: 1px 1px 9px rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.white87};
`;

const ShareFooter = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 0);
  z-index: 1002;
  display: flex;
  justify-content: center;
  gap: 7px;

  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.6px;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
`;

const ScoreBox = styled.div<{ $predictionResult: PredictionResult }>`
  ${(props) => {
    if (props.$predictionResult === 'KOREA')
      return css`
        color: #f9555e;
      `;
    else if (props.$predictionResult === 'YONSEI')
      return css`
        color: #445fff;
      `;
    else
      return css`
        color: #4c0eb0;
      `;
  }}
  width: 34px;
  border-radius: 4px;
  padding: 3px 0px 1px 0px;
  text-align: center;
  font-size: 38px;
  font-style: normal;
  font-weight: 900;
  line-height: 38px;
  background: ${({ theme }) => theme.colors.white87};
`;

const ShareCardWrapper = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;
