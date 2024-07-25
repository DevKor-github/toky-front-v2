import styled from 'styled-components';

export const Backdrop = styled.div<{ $isModalOpen: boolean }>`
  z-index: ${(props) => props.theme.zIndex.modalBackdrop};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  backdrop-filter: blur(30px);
  display: ${(props) => (props.$isModalOpen ? 'block' : 'none')};
`;
