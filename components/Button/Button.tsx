import styled, { css, CSSProperties } from 'styled-components';

interface ButtonProps {
  $width?: CSSProperties['width'];
  $type: 'primary' | 'secondary';
  $rounded?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width, $type }) => $width ?? ($type == 'primary' ? '100%' : 'auto')};
  padding: ${({ $type }) => ($type === 'primary' ? '12px 20px' : '8px 16px')};
  background-color: ${({ $type, theme }) => ($type === 'primary' ? theme.colors.purple : theme.colors.white87)};
  border-radius: ${({ $rounded }) => ($rounded ? '99px' : '8px')};
  color: ${({ $type, theme }) => ($type === 'primary' ? theme.colors.white87 : theme.colors.primary)};
  text-align: center;
  ${(props) => {
    if (props.$type === 'primary') {
      return css`
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: -0.96px;
      `;
    } else {
      css`
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.56px;
      `;
    }
  }}
`;
