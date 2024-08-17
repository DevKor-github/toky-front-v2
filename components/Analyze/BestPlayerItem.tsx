import PlayerImage from '../../../public/image/Logo.webp';
import { styled, css } from 'styled-components';
import Image from 'next/image';
import { BestPlayerInfo } from './constants';
import { Flex } from '@/libs/design-system/flex';

type PlayerProps = {
  player: BestPlayerInfo;
};
export default function BestPlayerItem({ player }: PlayerProps) {
  const { alias, name, position, backNumber, body, stat, imageUrl, description, department, isKorea } = player;
  return (
    <Wrapper $isKorea={isKorea}>
      {!isKorea ? <DropShadow /> : <></>}
      <ImageContainer $isKorea={isKorea}>
        <Image src={imageUrl} alt="player" width={200} height={290}></Image>
      </ImageContainer>
      <TextInfo $isKorea={isKorea}>
        <Flex $gap={24} $direction="column" $align={isKorea ? 'flex-start' : 'flex-end'}>
          <Flex $direction="column" $gap={4} $align={isKorea ? 'flex-start' : 'flex-end'}>
            <Nickname $isKorea={isKorea}>{alias}</Nickname>
            <Flex $direction="column" $gap={6} $align={isKorea ? 'flex-start' : 'flex-end'}>
              <Flex $gap={4} $align="flex-end">
                {isKorea && <Name>{name}</Name>}
                <Department>{department}</Department>
                {!isKorea && <Name>{name}</Name>}
              </Flex>
              <Description $isKorea={isKorea}>{description}</Description>
            </Flex>
          </Flex>
          <PlayerInfoTable $isKorea={isKorea}>
            <tbody>
              <tr>
                <th>포지션</th>
                <td>{position}</td>
                <th>신장/체중</th>
                <td>{body}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>백넘버</th>
                <td>{backNumber}</td>
                <th>지난 성적</th>
                <td>{stat}</td>
              </tr>
            </tbody>
          </PlayerInfoTable>
        </Flex>
      </TextInfo>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $isKorea: boolean }>`
  height: 290px;
  position: relative;
  overflow: hidden;
  clip-path: polygon(100% 0, 100% 100%, 50% 100%, 0 91%, 0 0);
  -webkit-clip-path: polygon(100% 0, 100% 100%, 50% 100%, 0 91%, 0 0);
  ${(props) =>
    props.$isKorea
      ? css`
          background: linear-gradient(
            0deg,
            rgba(18, 18, 18, 0) 0%,
            rgba(243, 35, 60, 0.17) 50%,
            rgba(18, 18, 18, 0) 100%
          );
        `
      : css`
          background: linear-gradient(
            0deg,
            rgba(18, 18, 18, 0) 0%,
            rgba(41, 72, 255, 0.17) 50%,
            rgba(18, 18, 18, 0) 100%
          );
        `}
`;
const TextInfo = styled.div<{ $isKorea: boolean }>`
  display: flex;
  position: absolute;
  width: 100%;
  min-height: 183px;
  ${(props) =>
    props.$isKorea
      ? css`
          top: 62px;
          padding-left: 168px;
          padding-right: 20px;
        `
      : css`
          bottom: 62px;
          padding-left: 20px;
          padding-right: 168px;
          justify-content: flex-start;
        `}
`;

const ImageContainer = styled.div<{ $isKorea: boolean }>`
  position: absolute;
  ${(props) =>
    props.$isKorea &&
    css`
      top: 0%;
      left: 0%;
    `}
  ${(props) =>
    !props.$isKorea &&
    css`
      bottom: 0%;
      right: 0%;
    `};
`;

const Nickname = styled.h5<{ $isKorea: boolean }>`
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Spoqa Han Sans Neo';
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.9px;
  padding: 4px 6px;
  ${(props) =>
    props.$isKorea &&
    css`
      background: var(--grad-red-2, linear-gradient(90deg, #f3233c 0%, rgba(243, 35, 60, 0.25) 100%));
    `}
  ${(props) =>
    !props.$isKorea &&
    css`
      background: var(--grad-blue-2, linear-gradient(90deg, rgba(41, 72, 255, 0.25) 0%, #2948ff 100%));
    `};
`;

const Name = styled.div`
  /* TODO font멕이기 */
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 37px;
  font-style: normal;
  font-weight: 700;
  line-height: 44px;
`;
const Department = styled.div`
  color: #fff;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.84px;
`;
const Description = styled.p<{ $isKorea: boolean }>`
  color: #fff;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.56px;

  ${(props) =>
    !props.$isKorea &&
    css`
      text-align: end;
    `}
`;

const PlayerInfoTable = styled.table<{ $isKorea: boolean }>`
  color: white;
  & th {
    font-size: 9px;
    font-weight: 700;
  }
  & td {
    font-size: 14px;
    font-weight: 500;
    padding: 0px 6px;
  }
  ${(props) =>
    props.$isKorea &&
    css`
      & th {
        color: #f95b6e;
      }
    `}
  ${(props) =>
    !props.$isKorea &&
    css`
      & th {
        color: #5b84ff;
      }
    `};
`;

const DropShadow = styled.div`
  fill: linear-gradient(0deg, rgba(255, 255, 255, 0) 16.27%, rgba(255, 255, 255, 0.03) 72.19%), #121212;
  filter: drop-shadow(0px -2px 40px rgba(0, 0, 0, 0.15));
  height: 170px;
  position: absolute;
  top: -29px;
  clip-path: polygon(0 0, 100% 26%, 100% 100%, 0% 100%);
  width: 100%;
`;
