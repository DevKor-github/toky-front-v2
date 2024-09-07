import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

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

  const skeletonImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' viewBox='0 0 101 101' fill='none'%3E%3Crect width='110' height='110' rx='3.65714' fill='white'/%3E%3Crect x='0.457143' y='0.457143' width='99.6571' height='99.6571' rx='3.2' fill='url(%23paint0_linear_2713_2603)' stroke='url(%23paint1_linear_2713_2603)' stroke-width='0.914286'/%3E%3Cpath d='M0.457143 79.0856H100.114V96.9141C100.114 98.6814 98.6816 100.114 96.9143 100.114H3.65714C1.88983 100.114 0.457143 98.6814 0.457143 96.9141V79.0856Z' fill='url(%23paint2_linear_2713_2603)' stroke='url(%23paint3_linear_2713_2603)' stroke-width='0.914286'/%3E%3Crect x='56.4287' y='79.457' width='32' height='12.25' rx='6.125' fill='url(%23paint4_linear_2713_2603)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_2713_2603' x1='100.571' y1='51.1679' x2='7.75929e-07' y2='51.1679' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23DBDBDB' stop-opacity='0.05'/%3E%3Cstop offset='0.5' stop-color='%23DBDBDB'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_2713_2603' x1='100.571' y1='51.1679' x2='7.75929e-07' y2='51.1679' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23DBDBDB' stop-opacity='0.05'/%3E%3Cstop offset='0.5' stop-color='%23DBDBDB'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_2713_2603' x1='100.571' y1='89.7923' x2='7.7593e-07' y2='89.7923' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23DBDBDB' stop-opacity='0.05'/%3E%3Cstop offset='0.5' stop-color='%23DBDBDB'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear_2713_2603' x1='100.571' y1='89.7923' x2='7.7593e-07' y2='89.7923' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23DBDBDB' stop-opacity='0.05'/%3E%3Cstop offset='0.5' stop-color='%23DBDBDB'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint4_linear_2713_2603' x1='88.4287' y1='85.6895' x2='56.4287' y2='85.6895' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23DBDBDB' stop-opacity='0.05'/%3E%3Cstop offset='0.5' stop-color='%23DBDBDB'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E";

  return (
    // TODO image최적화
    <CardContainer onClick={handleToggle} scale={scale}>
      <Image
        src={image}
        alt={name}
        fill
        sizes="100% 100%"
        style={{ borderRadius: '4px' }}
        placeholder={skeletonImage}
        fetchPriority="low"
      />
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

const NameContainer = styled.div<{ scale: number }>`
  position: absolute;
  top: ${(props) => 86 * props.scale}px;
  left: 0px;
  width: 100%;
  height: ${(props) => 24 * props.scale}px;
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
  right: ${(props) => 7 * props.scale}px;
  white-space: nowrap;
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
  right: ${(props) => 7 * props.scale}px;
`;
