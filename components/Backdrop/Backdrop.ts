import styled from 'styled-components';

export const Backdrop = styled.div<{ $isModalOpen: boolean; $backgroundColor?: string }>`
  z-index: ${(props) => props.theme.zIndex.modalBackdrop};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.$backgroundColor ?? 'rgba(0, 0, 0, 0.3)'};
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  display: ${(props) => (props.$isModalOpen ? 'block' : 'none')};
`;
