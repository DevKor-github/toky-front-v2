'use client';

import React from 'react';
import styled from 'styled-components';
import { useAuthStore } from '@/libs/store/useAuthStore';

import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import MainTopBar from '@/components/MainTopBar';
import MainCarousel from '@/components/MainCarousel';
import ActionCard from '@/components/ActionCard';
import IconButton from '@/components/IconButton';
import FreeModeCarousel from '@/components/FreeModeCarousel';
import ScheduleCard from '@/components/ScheduleCard';
import Baseball from '@/public/baseball.png';
import ActionButton from '@/components/ActionButton';
import { ICON_INFO_LIST, SCHEDULE_INFO, MESSAGE_INFO } from './constants';
import client from '@/libs/client/client';
import { CopyInviteCode } from '@/components/CopyInviteCode/CopyInviteCode';

export default function Home() {
  const isLogin = useAuthStore((state) => state.isLogin);

  const kakaoLogin = async () => {
    window.location.href = process.env.NEXT_PUBLIC_API_URL + '/auth/kakao';
  };

  const kakaoLoginContents = (
    <ActionButton color="#FEE500" fontSize="14px" onClick={kakaoLogin}>
      <Icon.Kakao />
      카카오 로그인
      <Icon.ChevronForward />
    </ActionButton>
  ); // TODO: 간격 설정 필요, 카카오 로그인 링크 연결 필요

  const onClick = async () => {
    try {
      const response = await client.get<boolean>('/auth/need-signup');
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <MainTopBar />
      <Wrapper>
        <MainCarousel />
        <Flex $justify="space-between" style={{ padding: 32 }}>
          {ICON_INFO_LIST.map((iconInfo) => (
            <IconButton key={`${iconInfo.href}-${iconInfo.icon}`} {...iconInfo} />
          ))}
        </Flex>
        <ActionCardWrapper>
          {isLogin ? (
            <ActionCard
              message={MESSAGE_INFO.inviteFriends}
              contents={<CopyInviteCode />}
              padding="16px 16px 16px 20px"
            />
          ) : (
            <ActionCard message={MESSAGE_INFO.kakaoLogin} contents={kakaoLoginContents} padding="16px 8px 16px 20px" />
          )}
        </ActionCardWrapper>
        {/*TODO: 정기전 일정, 자세히 보기 구현 */}
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
        <ActionButton color="white" onClick={onClick}>
          test
        </ActionButton>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${({ theme }) => theme.space.mainTopBarHeight}px;
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

const ActionCardWrapper = styled.div`
  padding: 0px 20px;
`;
