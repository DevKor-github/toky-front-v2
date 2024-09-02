import React, { ForwardedRef, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import { usePathname } from 'next/navigation';
import { PAGE_INFO_LIST } from './constants';
import { CopyInviteCode } from '../CopyInviteCode/CopyInviteCode';
import { KakaoLogin } from '../KakaoLogin';
import { useProfileStore } from '@/libs/store/Providers/ProfileStoreProvider';
import { useAuthStore } from '@/libs/store/Providers/AuthStoreProvider';
import { useTicketStore } from '@/libs/store/Providers/TicketStoreProvider';
import { onClickKakaoLogin } from '@/libs/utils/kakaoLogin';

function SideBarBody({ isBarOpen = true }) {
  // TODO: use userInfo from store or context
  const nowPage = usePathname();
  const userInfo = useProfileStore((state) => state.profile);
  const { logout, isLogin } = useAuthStore((state) => state);
  const tickets = useTicketStore((state) => state.tickets);
  const university = userInfo?.university == 0 ? '고려대학교' : '연세대학교';

  function openTokyInstagram() {
    window.open('https://instagram.com/official.toky?igshid=NjIwNzIyMDk2Mg==');
  }

  return (
    <Wrapper className={isBarOpen ? 'open' : ''}>
      <Flex $direction="column" $justify="center" $gap={32}>
        {isLogin ? (
          <Flex $direction="column" $justify="center" $gap={17} style={{ width: '100%' }}>
            <Flex style={{ padding: '0px 8px' }}>
              <Flex $gap={1} $direction="column">
                <UnivName $university={university}>{university}</UnivName>
                <Flex $gap={6} $align="flex-end">
                  <UserName>{userInfo?.name}</UserName>
                  <SetIconWrapper href="/userinfo">
                    <Icon.Setting />
                  </SetIconWrapper>
                </Flex>
              </Flex>
            </Flex>
            <InfoWrapper>
              <Flex $direction="column" $gap={6}>
                <MyTicketCaption>내 응모권</MyTicketCaption>
                <Flex $gap={4}>
                  <Icon.Ticket size={22} /> <MyTicket>{tickets}장</MyTicket>
                </Flex>
              </Flex>
              <CopyInviteCode />
            </InfoWrapper>
          </Flex>
        ) : (
          <LoginWrapper onClick={onClickKakaoLogin}>
            10초만에 로그인하고
            <br />
            승부예측 참여하세요
            <KakaoLogin />
          </LoginWrapper>
        )}

        <NavWrapper>
          <Flex $direction="column" $gap={32}>
            {PAGE_INFO_LIST.map((page) => {
              return (
                <Link key={page.title} href={page.href}>
                  <NavItem $selected={nowPage == page.href}>{page.title}</NavItem>
                </Link>
              );
            })}
            {isLogin && (
              <Link href="/ticket-history">
                <NavItem $selected={nowPage == '/ticket-history'}>응모권 내역</NavItem>
              </Link>
            )}
            {isLogin && (
              <Link href="/userinfo">
                <NavItem $selected={nowPage == '/userinfo'}>회원 정보 관리</NavItem>
              </Link>
            )}
            <NavItem $selected={false} onClick={openTokyInstagram}>
              문의하기
            </NavItem>
            {/* TODO LOGOUT달기 */}
            {isLogin && (
              <NavItem $selected={false} onClick={logout}>
                로그아웃
              </NavItem>
            )}
          </Flex>
        </NavWrapper>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 100%;
  height: 100%;
  width: 331px;
  background-color: #222222;
  padding: 72px 20px 60px 20px;
  overflow-y: scroll;

  transition: 1s ease;
  z-index: ${(props) => props.theme.zIndex.SideBar};
  &.open {
    left: calc(100% - 331px);
    transition: 1s ease;
  }
`;

const UnivName = styled.span<{ $university: string }>`
  color: ${(props) => (props.$university === '고려대학교' ? '#FF8586' : '#5B84FF')};
  ${(props) => props.theme.typography.smallCaptionNormal};
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  ${(props) => props.theme.typography.noticeTextBold};
  color: #ffffff;
`;
const SetIconWrapper = styled(Link)`
  padding-bottom: 2px;
`;
const NavWrapper = styled.div`
  padding-left: 8px;
`;
const NavItem = styled.div<{ $selected: boolean }>`
  ${(props) => props.theme.typography.body1Regular};

  color: ${(props) => (props.$selected ? '#ffffff' : 'rgba(255, 255, 255, 0.87)')};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background: #ffffff;
    position: absolute;
    bottom: -6px;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after,
  ${(props) => props.$selected && `&::after`} {
    opacity: 1;
  }
`;

const InfoDetail = styled.div`
  margin-top: 5px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */
  display: flex;
  align-items: center;
  text-align: center;

  /* 투명도_87 */
  color: rgba(255, 255, 255, 0.87);
`;
const Img = styled(Image)<{ univ: string }>`
  margin-left: auto;
  border-radius: 30px;
  background: ${({ univ }) =>
    univ === '고려대학교'
      ? 'linear-gradient(0deg, #f3233c 0%, #f95B6e 100%)'
      : 'linear-gradient(0deg, #5b84ff 0%, #2948ff 100%)'};
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 21px 16px 21px 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background: var(
    --Background-14,
    linear-gradient(0deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.14) 100%),
    #121212
  );
`;
const MyTicketCaption = styled.p`
  color: var(--_60, rgba(255, 255, 255, 0.6));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.48px;
`;
const MyTicket = styled.p`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const LoginWrapper = styled.div`
  display: flex;
  padding: 18px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 10px;
  background: var(
    --Background-14,
    linear-gradient(0deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.14) 100%),
    #121212
  );
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.64px;
`;

export default SideBarBody;
