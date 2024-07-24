import styled, { CSSProperties } from 'styled-components';

interface FlexProps {
  $align?: CSSProperties['alignItems'];
  $justify?: CSSProperties['justifyContent'];
  $wrap?: CSSProperties['flexWrap'];
  $direction?: CSSProperties['flexDirection'];
  $gap?: CSSProperties['gap'];
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.$direction ?? 'row'};
  align-items: ${(props) => props.$align ?? 'flex-start'};
  justify-content: ${(props) => props.$justify ?? 'flex-start'};
  flex-wrap: ${(props) => props.$wrap ?? 'nowrap'};
  gap: ${(props) => (typeof props.$gap == 'number' ? (`${props.$gap}px` ?? '0') : (props.$gap ?? '0'))};
`;