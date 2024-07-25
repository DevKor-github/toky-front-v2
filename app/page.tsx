'use client';

import MainTopBar from '@/components/MainTopBar';
import MainCarousel from '@/components/MainCarousel';
import ActionCard from '@/components/ActionCard';
import styled from 'styled-components';
import { Flex } from '@/libs/design-system/flex';
import IconButton from '@/components/IconButton';
import ActionButton from '@/components/ActionButton';
import { ICON_INFO_LIST, MESSAGE_INFO } from './constants';
import { Icon } from '@/libs/design-system/icons';

export default function Home() {
  const isLogin = true; // TODO: userInfo 정보 가져오기
  const kakaoLoginContents = (
    <ActionButton color="#FEE500" fontSize="14px">
      <Icon.Kakao />
      카카오 로그인
      <Icon.ChevronForward />
    </ActionButton>
  ); // TODO: 간격 설정 필요, 카카오 로그인 링크 연결 필요

  const inviteFriendsContents = (
    <ActionButton
      bgColor="var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87))"
      color="#121212"
      borderRadius="99px"
      padding="8px 16px"
      fontSize="14px"
    >
      <Icon.TablerCopy />내 초대링크
    </ActionButton>
  ); // TODO: 간격 설정 필요, 초대링크 복사 기능 추가 필요

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
              contents={inviteFriendsContents}
              padding="16px 16px 16px 20px"
            />
          ) : (
            <ActionCard message={MESSAGE_INFO.kakaoLogin} contents={kakaoLoginContents} padding="16px 8px 16px 20px" />
          )}
        </ActionCardWrapper>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${({ theme }) => theme.space.mainTopBarHeight}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ActionCardWrapper = styled.div`
  padding: 0px 20px;
`;
