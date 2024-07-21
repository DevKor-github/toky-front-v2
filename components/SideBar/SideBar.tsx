import { Icon } from '@/libs/design-system/icons';
import SideBarBody from './SideBarBody';
import { useOverlay } from '@/libs/design-system/overlay';
import { OutsideClick } from '../OutsideClick/OutsideClick';
export function SideBar() {
  const overlay = useOverlay();

  const openSideBar = () => {
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <OutsideClick
          callback={() => {
            resolve(false);
            close();
          }}
        >
          <SideBarBody isBarOpen={isOpen} />
        </OutsideClick>
      ));
    });
  };

  async function openBar() {
    await openSideBar();
  }

  return (
    <>
      <div onClick={openBar}>
        <Icon.MenuIcon />
      </div>
    </>
  );
}
