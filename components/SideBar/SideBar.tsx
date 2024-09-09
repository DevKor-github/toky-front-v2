import { Icon } from '@/libs/design-system/icons';
import SideBarBody from './SideBarBody';
import { useOverlay } from '@/libs/design-system/overlay';
import { OutsideClick } from '../OutsideClick/OutsideClick';
import styled from 'styled-components';
import { sendGAEvent } from '@next/third-parties/google';

export function SideBar() {
  const overlay = useOverlay();

  const openSideBar = () => {
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <>
          <SideBarBackgroundTouchPrevent $isOpen={isOpen} />
          <OutsideClick
            callback={() => {
              resolve(false);
              close();
            }}
          >
            <SideBarBody isBarOpen={isOpen} />
          </OutsideClick>
        </>
      ));
    });
  };

  async function openBar() {
    await openSideBar();
    sendGAEvent('event', 'open_sidebar');
  }

  return (
    <>
      <div onClick={openBar}>
        <Icon.MenuIcon />
      </div>
    </>
  );
}

const SideBarBackgroundTouchPrevent = styled.div<{ $isOpen: boolean }>`
  background-color: transparent;
  z-index: ${(props) => props.theme.zIndex.SideBar - 1};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
`;
