import React, { ForwardedRef, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import { usePathname } from 'next/navigation';
import { PAGE_INFO_LIST } from './constants';

function SideBarBody({ isBarOpen = true }) {
  const inside = useRef<HTMLDivElement>(null);

  // TODO: use userInfo from store or context
  const userInfo = {
    university: '고려대학교',
    nickname: '김토키',
    score: 100,
    remain: 50,
    phoneNumber: '010-1234-5678',
  };
  const nowPage = usePathname();

  return (
    <Wrapper className={isBarOpen ? 'open' : ''}>
      <Flex $direction="column" $justify="center">
        <Flex style={{ padding: '0px 8px' }}>
          <Flex $gap={1} $direction="column">
            <UnivName $university={userInfo.university}>{userInfo.university}</UnivName>
            <Flex $gap={6} $align="flex-end">
              <UserName>{userInfo.nickname}</UserName>
              <SetIconWrapper href="/userInfo">
                <Icon.Setting />
              </SetIconWrapper>
            </Flex>
          </Flex>
        </Flex>

        <NavWrapper>
          <Flex $direction="column" $gap={32}>
            {PAGE_INFO_LIST.map((page) => {
              return (
                <Link key={page.title} href={page.href}>
                  <NavItem selected={nowPage == page.href}>{page.title}</NavItem>
                </Link>
              );
            })}
            <NavItem selected={false}>문의하기</NavItem>
            <NavItem selected={false}>로그아웃</NavItem>
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
  padding: 24px 20px 0 20px;

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
  margin-top: 32px;
`;
const NavItem = styled.div<{ selected: boolean }>`
  ${(props) => props.theme.typography.body1Regular};

  color: ${(props) => (props.selected ? '#ffffff' : 'rgba(255, 255, 255, 0.87)')};
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
  ${(props) => props.selected && `&::after`} {
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

export default SideBarBody;
