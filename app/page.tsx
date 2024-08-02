'use client';

import React from 'react';
import MainTopBar from '@/components/MainTopBar';
import MainCarousel from '@/components/MainCarousel';
import styled from 'styled-components';
import { Flex } from '@/libs/design-system/flex';
import IconButton from '@/components/IconButton';
import { ICON_INFO_LIST, SCHEDULE_INFO } from './constants';
import FreeModeCarousel from '@/components/FreeModeCarousel';
import ScheduleCard from '@/components/ScheduleCard';
import Baseball from '@/public/baseball.png';

export default function Home() {
  return (
    <div>
      <MainTopBar />
      <Wrapper>
        <MainCarousel />
        <Flex $justify="space-between" style={{ padding: '32px' }}>
          {ICON_INFO_LIST.map((iconInfo) => (
            <IconButton key={`${iconInfo.href}-${iconInfo.icon}`} {...iconInfo} />
          ))}
        </Flex>
        <FreeModeCarousel padding="0px 20px" spaceBetween={0}>
          {Object.entries(SCHEDULE_INFO).map(([date, events]) => (
            <React.Fragment key={date}>
              <Date>{date}</Date>
              <Flex $align="flex-start">
                {events.map((event, index) => (
                  <ScheduleCard
                    key={index}
                    title={event.title}
                    time={event.time}
                    location={event.location}
                    backgroundImage={Baseball.src} //TODO: 서버에서 이미지 파일 가져와서 생성
                  />
                ))}
              </Flex>
            </React.Fragment>
          ))}
        </FreeModeCarousel>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: 66px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Date = styled.div`
  width: 87px;
  height: 29px;
  padding: 4px 16px;
  justify-content: center;
  align-items: flex-end;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.28px;
  margin-bottom: 8px;
`;
