import React, { useState } from 'react';
import styled from 'styled-components';

interface PlayerCardProps {
  image: string;
  name: string;
  jerseyNumber: string;
  position: string;
  year: string;
  heightWeight: string;
}

export function PlayerCard({ image, name, jerseyNumber, position, year, heightWeight }: PlayerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardContainer onClick={handleToggle}>
      <Image src={image} alt={name} />
      <NameContainer className={isFlipped ? '' : 'visible'}>
        <NamePosition>{name}</NamePosition>
      </NameContainer>
      <InfoContainer className={isFlipped ? 'visible' : ''}>
        <PlayerInfo>
          <PlayerInfoKey>백넘버</PlayerInfoKey>
          <PlayerInfoValue>{jerseyNumber}</PlayerInfoValue>
        </PlayerInfo>
        <PlayerInfo>
          <PlayerInfoKey>포지션</PlayerInfoKey>
          <PlayerInfoValue>{position}</PlayerInfoValue>
        </PlayerInfo>
        <PlayerInfo>
          <PlayerInfoKey>학번</PlayerInfoKey>
          <PlayerInfoValue>{year}</PlayerInfoValue>
        </PlayerInfo>
        <PlayerInfo>
          <PlayerInfoKey>키/몸무게</PlayerInfoKey>
          <PlayerInfoValue>{heightWeight}</PlayerInfoValue>
        </PlayerInfo>
        <FlipedNameContainer>{name}</FlipedNameContainer>
      </InfoContainer>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 110px;
  height: 110px;
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

const NameContainer = styled.div`
  position: absolute;
  top: 86px;
  left: 0px;
  width: 110px;
  height: 24px;
  border-radius: 0px 0px 4px 4px;
  background: var(--_38, rgba(255, 255, 255, 0.38));
  backdrop-filter: blur(2px);
  flex-shrink: 0;
  color: var(--black_1, #1f1f1f);
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.56px;
  opacity: 0;
  &.visible {
    opacity: 1;
  }
`;

const NamePosition = styled.div`
  position: absolute;
  top: 2px;
  left: 55px;
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
  gap: 5px;
`;

const PlayerInfoKey = styled.div`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 16px */
  letter-spacing: -0.6px;
`;

const PlayerInfoValue = styled.div`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 23.2px */
  letter-spacing: -0.87px;
`;

const FlipedNameContainer = styled.div`
  color: var(--white_0, #fff);
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.56px;
  position: absolute;
  top: 88px;
  left: 55px;
`;
