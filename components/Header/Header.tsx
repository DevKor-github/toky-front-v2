'use client';

import styled from 'styled-components';
import { SideBar } from '../SideBar';
import { Icon } from '@/libs/design-system/icons';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  withSideBar?: boolean;
}

export function Header({ title, onBack, withSideBar = false }: HeaderProps) {
  const router = useRouter();
  const onClickBack = onBack || router.back;
  return (
    <HeaderWrapper>
      <SvgButton onClick={onClickBack}>
        <Icon.ArrowLeft />
      </SvgButton>
      <Title>{title}</Title>
      {withSideBar && <SideBar />}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.space.mainTopBarHeight}px;
  background-color: ${({ theme }) => theme.colors.header};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  padding: 10px 20px;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.08px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const SvgButton = styled.button`
  background: transparent;
  border-width: 0;
  padding: 0;
  line-height: 0px;
`;
