import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';

export interface PlayerCardProps {
  image: string;
  name: string;
  jerseyNumber: string;
  position: string;
  year: string;
  heightWeight: string;
}

export function PlayerCard({
  image,
  name,
  jerseyNumber,
  position,
  year,
  heightWeight,
  scale,
}: PlayerCardProps & { scale: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    // TODO image최적화
    <CardContainer onClick={handleToggle} scale={scale}>
      <Image src={image} alt={name} />
      <NameContainer className={isFlipped ? '' : 'visible'} scale={scale}>
        <NamePosition scale={scale}>{name}</NamePosition>
      </NameContainer>
      <InfoContainer className={isFlipped ? 'visible' : ''}>
        <PlayerInfo>
          <PlayerInfoKey scale={scale}>백넘버</PlayerInfoKey>
          <PlayerInfoValue scale={scale}>{jerseyNumber}</PlayerInfoValue>
        </PlayerInfo>
        <PlayerInfo>
          <PlayerInfoKey scale={scale}>포지션</PlayerInfoKey>
          <PlayerInfoValue scale={scale}>{position}</PlayerInfoValue>
        </PlayerInfo>
        <PlayerInfo>
          <PlayerInfoKey scale={scale}>학번</PlayerInfoKey>
          <PlayerInfoValue scale={scale}>{year}</PlayerInfoValue>
        </PlayerInfo>
        <PlayerInfo>
          <PlayerInfoKey scale={scale}>신체스펙</PlayerInfoKey>
          <PlayerInfoValue scale={scale}>{heightWeight}</PlayerInfoValue>
        </PlayerInfo>
        <FlipedNameContainer scale={scale}>{name}</FlipedNameContainer>
      </InfoContainer>
    </CardContainer>
  );
}

const CardContainer = styled.div<{ scale: number }>`
  width: ${(props) => 110 * props.scale}px;
  height: ${(props) => 110 * props.scale}px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const NameContainer = styled.div<{ scale: number }>`
  position: absolute;
  top: ${(props) => 86 * props.scale}px;
  left: 0px;
  width: 100%;
  height: 24px;
  border-radius: 0px 0px 4px 4px;
  background: var(--_38, rgba(255, 255, 255, 0.38));
  backdrop-filter: blur(2px);
  flex-shrink: 0;
  color: var(--black_1, #1f1f1f);
  font-family: 'Spoqa Han Sans Neo';
  font-size: ${(props) => 14 * props.scale}px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.56px;
  opacity: 0;
  &.visible {
    opacity: 1;
  }
`;

const NamePosition = styled.div<{ scale: number }>`
  position: absolute;
  top: 2px;
  left: ${(props) => 55 * props.scale}px;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 9px 24px 9px;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s;
  &.visible {
    opacity: 1;
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const PlayerInfoKey = styled.div<{ scale: number }>`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  font-family: 'Spoqa Han Sans Neo';
  font-size: ${(props) => 10 * props.scale}px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 16px */
  letter-spacing: -0.6px;
`;

const PlayerInfoValue = styled.div<{ scale: number }>`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  font-family: 'Spoqa Han Sans Neo';
  font-size: ${(props) => 12 * props.scale}px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 23.2px */
  letter-spacing: -0.87px;
`;

const FlipedNameContainer = styled.div<{ scale: number }>`
  color: var(--white_0, #fff);
  font-family: 'Spoqa Han Sans Neo';
  font-size: ${(props) => 14 * props.scale}px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.56px;
  position: absolute;
  top: ${(props) => 88 * props.scale}px;
  left: ${(props) => 55 * props.scale}px;
`;
